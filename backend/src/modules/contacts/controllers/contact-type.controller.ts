import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { contactTypeService } from "../services/contact-type.service";
import { ResponseBuilder } from "../../../utils/response.builder";
import { GetQuery } from "../../../constants/types.request";
import { parseRequestQuery } from "../../../utils/request.parser";

export const createContactType = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const contactType = await contactTypeService.create({ name, description });
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(contactType)
      .build();
    res.status(201).json(response);
  }
);

export const getContactTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const { limit, skip, sort, populate, where }: GetQuery = parseRequestQuery(
      req.query
    );
    const contactTypes = await contactTypeService.findAll({
      limit,
      skip,
      sort,
      populate,
      where,
    });
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(contactTypes)
      .build();
    res.status(200).json(response);
  }
);

export const getContactType = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const { populate }: { populate?: string[] } = req.query;
    const contactType = await contactTypeService.findOne({
      where: { $or: [{ _id: id }] },
      populate,
    });
    if (!contactType) {
      res.status(404);
      throw new Error("Contact Type not found");
    }
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(contactType)
      .build();
    res.status(200).json(response);
  }
);

export const updateContactType = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const { name, description } = req.body;
    const contactType = await contactTypeService.update(id, {
      name,
      description,
    });
    if (!contactType) {
      res.status(404);
      throw new Error("Contact Type not found");
    }
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(contactType)
      .build();
    res.status(200).json(response);
  }
);

export const deleteContactType = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const contactType = await contactTypeService.delete(id);
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(contactType)
      .build();
    res.status(200).json(response);
  }
);

export const deleteManyContactTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body;
    if (!ids || ids.length === 0) {
      res.status(400);
      throw new Error("Ids not found");
    }
    const contactTypes = await contactTypeService.deleteMany(ids);
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(contactTypes)
      .build();
    res.status(200).json(response);
  }
);
