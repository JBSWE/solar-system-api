import { Request, Response } from "express";
import Planet from "../planet";

export let allPlanets = (req: Request, res: Response) => {
  Planet.find((err: any, planets: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(planets);
    }
  });
};
