import { Request, Response } from "express";
import Planet, { IPlanet } from "../planet";

export let allPlanets = (req: Request, res: Response) => {
  Planet.find((err: any, planets: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(planets);
    }
  });
};

export let getPlanet = (req: Request, res: Response) => {
  Planet.findById(req.params.name, (err: any, planet: IPlanet) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (planet != null) res.status(200).send(planet);
      else res.status(400).send("Planet doesn't exist");
    }
  });
};
