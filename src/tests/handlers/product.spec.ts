import request from "request";
import { getToken } from "../../middleware/authorization";
const endpoint = "http://localhost:3000/products";

describe("Products API", () => {
      const user = {
            firstname: "test",
            lastname: "test",
            username: "admin",
            password_digest: "123",
      };
      const p = {
            name: "book",
            price: "1000",
            description: "book book book",
      };

      const token = getToken(user);
      it("should return list product", (done) => {
            request.get(endpoint, (err, res) => {
                  expect(res.statusCode).toEqual(200);
                  done();
            });
      });
      it("should return product by id", (done) => {
            request.get(`${endpoint}/1`, (err, res) => {
                  expect(res.statusCode).toEqual(200);
                  done();
            });
      });
      it("should create product", (done) => {
            request.post(
                  endpoint,
                  {
                        json: true,
                        auth: { bearer: token },
                        body: p,
                  },
                  (err, res) => {
                        expect(res.statusCode).toEqual(201);
                        done();
                  }
            );
      });
      it("should update product", (done) => {
            request.put(
                  `${endpoint}/3`,
                  {
                        json: true,
                        auth: { bearer: token },
                        body: {
                              name: "pen",
                              price: "1000",
                              description: "ok",
                        },
                  },
                  (err, res) => {
                        expect(res.statusCode).toEqual(200);
                        done();
                  }
            );
      });
      it("should delete user", (done) => {
            request.delete(
                  `${endpoint}/4`,
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
