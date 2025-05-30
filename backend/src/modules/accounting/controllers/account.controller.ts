import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import { IAccount } from "../../../constants/types";

export const createAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, number, type, group, default_tax } = req.body;
  }
);
