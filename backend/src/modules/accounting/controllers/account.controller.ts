import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
//import { IAccount } from "../../../constants/types";
import { accountService } from "../services/account.service";
import { ResponseBuilder } from "../../../utils/response.builder";
import { GetQuery } from "../../../constants/types.request";
//import { defaultLimit } from "../../../constants/values";
import { parseRequestQuery } from "../../../utils/request.parser";

export const createAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, number, type, group, default_tax } = req.body;
    const account = await accountService.create({
      name,
      number,
      type,
      group,
      default_tax,
    });

    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(account)
      .build();

    res.status(201).json(response);
  }
);

export const getAccounts = asyncHandler(async (req: Request, res: Response) => {
  let { limit, skip, sort, populate, where, page }: GetQuery =
    parseRequestQuery(req.query);
  const accounts = await accountService.findAll({
    limit,
    skip,
    sort,
    populate,
    where,
  });
  const response = new ResponseBuilder()
    .setSuccess(true)
    .setData(accounts)
    .setPage(page as number)
    .build();
  res.status(200).json(response);
});

export const getAccount = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { populate }: { populate?: string[] } = parseRequestQuery(req.query);

  const account = await accountService.findOne({
    where: { _id: id },
    populate,
  });

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }
  const response = new ResponseBuilder().setData(account).build();
  res.status(200).json(response);
});

export const updateAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, number, type, group, default_tax } = req.body;
    const account = await accountService.update(id, {
      name,
      number,
      type,
      group,
      default_tax,
    });
    if (!account) {
      res.status(404);
      throw new Error("Account not found");
    }
    const response = new ResponseBuilder().setData(account).build();
    res.status(200).json(response);
  }
);

export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const account = await accountService.delete(id);
    if (!account) {
      res.status(404);
      throw new Error("Account not found");
    }
    const response = new ResponseBuilder().setData(account).build();
    res.status(200).json(response);
  }
);
