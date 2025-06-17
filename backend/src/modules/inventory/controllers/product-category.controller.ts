import { productCategoryService } from "../services/product-category.service";
import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import { ResponseBuilder } from "../../../utils/response.builder";

export const createProductCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, account } = req.body;
    const productCategory = await productCategoryService.create({
      name,
      description,
      account,
    });
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(productCategory)
      .build();
    res.status(201).json(response);
  }
);

export const getProductCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const productCategories = await productCategoryService.findAll({});
    const response = new ResponseBuilder()
      .setSuccess(true)
      .setData(productCategories)
      .build();
    res.status(200).json(response);
  }
);
