import request from "request";
const endpoint = "http://localhost:3000/order";
import jwt, { Secret } from "jsonwebtoken";
import { getToken } from "../../middleware/authorization";
const SERECT = process.env.SECRET_KEY as Secret;

describe("Order API", () => {
      const user = {
            firstname: "test",
            lastname: "test",
            username: "admin",
            password_digest: "123",
      };
      const o = {
            order_id: 1,
            product_id: 1,
            quantity: 2,
      };

      const token = getToken(user);

      it("should get order", (done) => {
            request.get(
                  endpoint,
                  {
                        json: true,
                        auth: { bearer: token },
                  },
                  (err, res) => {
                        expect(res.statusCode).toEqual(200);
                        done();
                  }
            );
      });
      it("should get order by id", (done) => {
            request.get(
                  `${endpoint}/1`,
                  {
                        json: true,
                        auth: { bearer: token },
                  },
                  (err, res) => {
                        expect(res.statusCode).toEqual(200);
                        done();
                  }
            );
      });
      it("should current order", (done) => {
            request.get(
                  `${endpoint}/current-order/1`,
                  {
                        json: true,
                        auth: { bearer: token },
                  },
                  (err, res) => {
                        expect(res.statusCode).toEqual(200);
                        done();
                  }
            );
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
      it("should edit order", (done) => {
            request.put(
                  `${endpoint}/1`,
                  {
                        json: true,
                        auth: { bearer: token },
                        body: {
                              user_id: "5",
                              status: "oke",
                        },
                  },
                  (err, res) => {
                        expect(res.statusCode).toEqual(201);
                        done();
                  }
            );
      });
      it("should delete order", (done) => {
            request.delete(
                  `${endpoint}/1`,
                  {
                        json: true,
                        auth: { bearer: token },
                  },
                  (err, res) => {
                        expect(res.statusCode).toEqual(200);
                        done();
                  }
            );
      });
});
