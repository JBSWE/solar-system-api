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

describe("GET request for a particular planet", () => {
  it("should return the planet input as a parameter", async () => {
    return chai
      .request(app)
      .get("/planet/earth")
      .then((res: any) => {
        chai
          .expect(res.text)
          .to.eql('{"_id":"earth","size":10,"distanceFromSun":40}');
        chai.expect(res.statusCode).to.equal(200);
      });
  });

  it("should return 400 'Planet doesn't exist' string if planet isn't present", async () => {
    return chai
      .request(app)
      .get("/planet/pluto")
      .then((res: any) => {
        chai.expect(res.text).to.eql("Planet doesn't exist");
        chai.expect(res.statusCode).to.equal(400);
      });
  });
});

describe("POST request to add planets", () => {
  it("should return the planet mercury", async () => {
    const mercury = {
      _id: "mercury",
      size: "90",
      distanceFromSun: 90,
    };

    return chai
      .request(app)
      .post("/planet")
      .send(mercury)
      .then((res: any) => {
        chai
          .expect(res.text)
          .to.eql('{"_id":"mercury","size":90,"distanceFromSun":90}');
        chai.expect(res.statusCode).to.equal(200);
      });
  });

  it("should return error", async () => {
    const mercury = {
      _id: "mercury",
      size: "90",
    };

    return chai
      .request(app)
      .post("/planet")
      .send(mercury)
      .then((res: any) => {
        chai.expect(res.text).to.contain("errors");
        chai.expect(res.statusCode).to.equal(500);
      });
  });
});
