import { Request, Response } from "express";
import { distribute } from "../services/roomAssignments.js";

export const getHome = (req: Request, res: Response) => {
  res.render("index", { result: null });
};

export const postDistribute = (req: Request, res: Response) => {
  const rooms = Number(req.body.rooms || 2);
  const adults = Number(req.body.adults || 2);
  const seniors = Number(req.body.seniors || 2);
  const children = Number(req.body.children || 1);

  const result = distribute(rooms, adults, seniors, children);
  res.render("index", { result });
};
