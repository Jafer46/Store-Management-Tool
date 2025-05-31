import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import taxService from "../services/tax.service";
import { ResponseBuilder } from "../../../utils/response.builder";

export const createTax = asyncHandler(async (req: Request, res: Response) => {
  const { name, type, rate } = req.body;
  const tax = await taxService.create({ name, type, rate });
  const response = new ResponseBuilder().setSuccess(true).setData(tax).build();
  res.status(201).json(response);
});

export const getTaxes = asyncHandler(async (req: Request, res: Response) => {
  const taxes = await taxService.findAll({});
  if (!taxes) {
    res.status(404);
    throw new Error("Taxes not found");
  }
  const response = new ResponseBuilder()
    .setSuccess(true)
    .setData(taxes)
    .build();
  res.status(200).json(response);
});

export const getTax = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const tax = await taxService.findOne({ where: { _id: id } });
  if (!tax) {
    res.status(404);
    throw new Error("Tax not found");
  }
  const response = new ResponseBuilder().setSuccess(true).setData(tax).build();
  res.status(200).json(response);
});

export const updateTax = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type, rate } = req.body;
  const tax = await taxService.update(id, { name, type, rate });
  if (!tax) {
    res.status(404);
    throw new Error("Tax not found");
  }
  const response = new ResponseBuilder().setSuccess(true).setData(tax).build();
  res.status(200).json(response);
});

export const deleteTax = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const tax = await taxService.delete(id);
  if (!tax) {
    res.status(404);
    throw new Error("Tax not found");
  }
  const response = new ResponseBuilder().setSuccess(true).setData(tax).build();
  res.status(200).json(response);
});

export const deleteManyTaxes = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;
    if (!ids || ids.length === 0) {
      res.status(400);
      throw new Error("Ids not found");
    }
    const taxes = await taxService.deleteMany(ids);
    if (!taxes) {
      res.status(404);
      throw new Error("Taxes not found");
    }
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(taxes)
      .build();
    res.status(200).json(response);
  }
);
