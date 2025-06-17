import { CrudService } from "../../../common/service/crud.service";
import { IProductCategory } from "../../../constants/types";
import productCategory from "../models/product-category";

export const productCategoryService = new CrudService<IProductCategory>(
  productCategory
);
