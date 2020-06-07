import express from "express";
import * as PlanetController from "./controllers/planetController";

// Our Express APP config
const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 3000);

// API Endpoints
app.get("/planets", PlanetController.allPlanets);

app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});

export default app;
