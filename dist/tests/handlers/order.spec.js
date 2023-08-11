"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var endpoint = "http://localhost:3000/order";
var authorization_1 = require("../../middleware/authorization");
var SERECT = process.env.SECRET_KEY;
describe("Order API", function () {
    var user = {
        firstname: "test",
        lastname: "test",
        username: "admin",
        password_digest: "123",
    };
    var o = {
        order_id: 1,
        product_id: 1,
        quantity: 2,
    };
    var token = (0, authorization_1.getToken)(user);
    it("should get order", function (done) {
        request_1.default.get(endpoint, {
            json: true,
            auth: { bearer: token },
        }, function (err, res) {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it("should get order by id", function (done) {
        request_1.default.get("".concat(endpoint, "/1"), {
            json: true,
            auth: { bearer: token },
        }, function (err, res) {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it("should current order", function (done) {
        request_1.default.get("".concat(endpoint, "/current-order/1"), {
            json: true,
            auth: { bearer: token },
        }, function (err, res) {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    // it("should add product to order", (done) => {
    //       request.post(
    //             `${endpoint}/add-to-order/1`,
    //             {
    //                   json: true,
    //                   auth: { bearer: token(user) },
    //                   body: {
    //                           "order_id":1,
    //                           "product_id":1,
    //                           "quantity":4
    //                       },
    //             },
    //             (err, res) => {
    //                   expect(res.statusCode).toEqual(200);
    //                   done();
    //             }
    //       );
    // });
    it("should edit order", function (done) {
        request_1.default.put("".concat(endpoint, "/1"), {
            json: true,
            auth: { bearer: token },
            body: {
                user_id: "5",
                status: "oke",
            },
        }, function (err, res) {
            expect(res.statusCode).toEqual(201);
            done();
        });
    });
    it("should delete order", function (done) {
        request_1.default.delete("".concat(endpoint, "/1"), {
            json: true,
            auth: { bearer: token },
        }, function (err, res) {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
});
