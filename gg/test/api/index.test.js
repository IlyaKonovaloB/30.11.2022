const request = require("supertest");
const { server } = require("../../index");
const chaiHttp = require("chai-http");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const expect = require("expect").default;

let jsonfile = require("jsonfile");
let file = jsonfile.readFileSync("data.json");

describe("/GET book", () => {
  it("Тест работает", (done) => {
    request(server)
      .get("/book")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });
});

describe("/GET book:id", () => {
  it("Тест работает", (done) => {
    request(server)
      .get("/book/0")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
describe("/POST book", () => {
  it("Тест работает", (done) => {
    const book = {
      id: file.length,
      name: "Name-of-book",
      client: "client",
      data: "data",
      data_back: "data_back",
      year: "2011",
      teg: [],
    };
    request(server)
      .post("/book")
      .send(book)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toStrictEqual(file.length + 1);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
describe("/PUT book :id", () => {
  const book = {
    name: "liu",
    client: "Rick",
    data: "12.05.2020",
  };
  it("Тест работает", (done) => {
    request(server).put("/book/1").send(book);
    done();
  });
});

describe("/DELETE book:id", () => {
  it("Тест работает", (done) => {
    request(server)
      .delete("/book/2")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
