import express from "express";
import * as PlanetController from "./controllers/planetController";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

// Our Express APP config
const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 3000);

// API Endpoints
app.get("/planets", PlanetController.allPlanets);
app.get("/planet/:name", PlanetController.getPlanet);
app.post("/planet", PlanetController.addPlanet);
app.put("/planet/:name", PlanetController.updatePlanet);
app.delete("/planet/:name", PlanetController.deletePlanet);
app.get(
  "/planets/distance/:initial_planet/:following_planet",
  PlanetController.getPlanetsDistance
);

// API Endpoints documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});

export default app;
