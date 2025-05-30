import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import accountGroupService from "../services/account-group.service";
import { ResponseBuilder } from "../../../utils/response.builder";
import { GetQuery } from "../../../constants/types.request";

export const createAccountGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const accountGroup = await accountGroupService.create({ name });
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(accountGroup)
      .build();
    res.status(201).json(response);
  }
);

export const getAccountGroups = asyncHandler(
  async (req: Request, res: Response) => {
    const { limit, skip, sort, populate, where }: GetQuery = req.query;

    const accountGroups = await accountGroupService.findAll({
      limit,
      skip,
      sort,
      populate,
      where,
    });
    if (!accountGroups) {
      res.status(404);
      throw new Error("Account Groups not found");
    }
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(accountGroups)
      .build();
    res.status(200).json(response);
  }
);

export const getAccountGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { populate }: { populate?: string[] } = req.query;
    const accountGroup = await accountGroupService.findOne({
      where: { _id: id },
      populate,
    });
    if (!accountGroup) {
      res.status(404);
      throw new Error("Account Group not found");
    }
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(accountGroup)
      .build();
    res.status(200).json(response);
  }
);

export const updateAccountGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const accountGroup = await accountGroupService.update(id, { name });
    if (!accountGroup) {
      res.status(404);
      throw new Error("Account Group not found");
    }
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(accountGroup)
      .build();
    res.status(200).json(response);
  }
);

export const deleteAccountGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const accountGroup = await accountGroupService.delete(id);
    if (!accountGroup) {
      res.status(404);
      throw new Error("Account Group not found");
    }
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(accountGroup)
      .build();
    res.status(200).json(response);
  }
);
