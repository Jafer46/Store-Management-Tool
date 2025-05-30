import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import taxService from "../services/tax.service";

export const createTax = asyncHandler(async (req: Request, res: Response) => {
  const tax = await taxService.create(req.body);
  res.status(201).json(tax);
});
