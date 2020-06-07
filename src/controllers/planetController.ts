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

export const deletePlanet = (req: Request, res: Response) => {
  Planet.deleteOne({ _id: req.params.name }, (err: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Successfully Deleted Planet if exists");
    }
  });
};

export const getPlanetsDistance = (req: Request, res: Response) => {
  Planet.find()
    .where("_id")
    .in([req.params.initial_planet, req.params.following_planet])
    .exec(function (err, records) {
      if (err) {
        res.status(500).send(err);
      }
      try {
        let initial_planet: number = records[0]["distanceFromSun"];
        let following_planet: number = records[1]["distanceFromSun"];

        if (initial_planet >= following_planet) {
          res.status(200).send({ distance: initial_planet - following_planet });
        } else {
          res.status(200).send({ distance: following_planet - initial_planet });
        }
      } catch (TypeError) {
        res.status(404).send("One or more of the inputs are not planets");
      }
    });
};
