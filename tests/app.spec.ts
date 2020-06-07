import app from "../src/app";
import Planet, { IPlanet } from "../src/planet";
import "mocha";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);

let mongoServer = new MongoMemoryServer();

before(async () => {
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);

  const earth: IPlanet = new Planet({
    _id: "earth",
    size: 10,
    distanceFromSun: 40,
  });
  await earth.save();

  const mars: IPlanet = new Planet({
    _id: "mars",
    size: 15,
    distanceFromSun: 50,
  });
  await mars.save();
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("GET request for planets", () => {
  it("should return all planets in the database", async () => {
    return chai
      .request(app)
      .get("/planets")
      .then((res: any) => {
        chai
          .expect(res.text)
          .to.eql(
            '[{"_id":"earth","size":10,"distanceFromSun":40},{"_id":"mars","size":15,"distanceFromSun":50}]'
          );
        chai.expect(res.statusCode).to.equal(200);
      });
  });
});
