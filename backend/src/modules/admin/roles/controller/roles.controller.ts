import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { roleService } from "../services/role.service";
import { ResponseBuilder } from "../../../../utils/response.builder";
import { GetQuery } from "../../../../constants/types.request";

export const createRole = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, level, access } = req.body;
  const role = await roleService.create({ name, description, level, access });
  const response = new ResponseBuilder().setData(role).build();
  res.status(201).json(response);
});

export const getRoles = asyncHandler(async (req: Request, res: Response) => {
  const { limit, sort, skip, populate, where }: GetQuery = req.query;
  const roles = await roleService.findAll({
    limit,
    sort,
    skip,
    populate,
    where,
  });

  const response = new ResponseBuilder().setData(roles).build();
  res.status(200).json(response);
});

export const getRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { populate, where }: GetQuery = req.query;
  const role = await roleService.findOne({
    where: {
      _id: id,
    },
    populate,
  });
  if (!role) {
    res.status(404);
    throw new Error("Role not found!");
  }
  const response = new ResponseBuilder().setData(role).build();
  res.status(200).json(role);
});

export const updateRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, level, access } = req.body;
  const role = await roleService.update(id, {
    name,
    description,
    level,
    access,
  });
  if (!role) {
    res.status(404);
    throw new Error("Role not found!");
  }
  const response = new ResponseBuilder().setData(role).build();
  res.status(200).json(response);
});

export const deleteRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const role = await roleService.delete(id);
  if (!role) {
    res.status(404);
    throw new Error("Role not found!");
  }
  const response = new ResponseBuilder().setData(role).build();
  res.status(200).json(response);
});
