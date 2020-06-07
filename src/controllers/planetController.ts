import { Request, Response } from "express";
import Planet, { IPlanet } from "../planet";

export const allPlanets = (req: Request, res: Response) => {
  Planet.find((err: any, planets: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(planets);
    }
  });
};

export const getPlanet = (req: Request, res: Response) => {
  Planet.findById(req.params.name, (err: any, planet: IPlanet) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (planet != null) res.status(200).send(planet);
      else res.status(400).send("Planet doesn't exist");
    }
  });
};

export const addPlanet = (req: Request, res: Response) => {
  const planet: IPlanet = new Planet(req.body);
  planet.save((err: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(planet);
    }
  });
};

export const updatePlanet = (req: Request, res: Response) => {
  Planet.findByIdAndUpdate(req.body._id, req.body, (err: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Successfully updated Planet if it exists!");
    }
  });
};
