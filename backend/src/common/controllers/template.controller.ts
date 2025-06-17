import { CrudService } from "../service/crud.service";
import { Model, Document } from "mongoose";
import { Request, Response } from "express";
import { ResponseBuilder } from "../../utils/response.builder";
import { parseRequestQuery } from "../../utils/request.parser";

export class Controller<T extends Document> {
  public service: CrudService<T>;
  constructor(public model: Model<T>) {
    this.service = new CrudService<T>(model);
  }

  async create(req: Request, res: Response) {
    const data: Partial<T> = req.body;
    const errors = await this.service.validate(data);
    if (errors) {
      res.status(400);
      throw new Error(errors.message);
    }
    const object = await this.service.create(data);
    const response = new ResponseBuilder().setData(object).build();
    res.status(201).json(response);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data: Partial<T> = req.body;
    const error = await this.service.validate(data);
    if (error) {
      res.status(400);
      throw new Error(error.message);
    }
    const object = await this.service.update(id, data);
    const response = new ResponseBuilder().setData(object).build();
    res.status(200).json(response);
  }

  async updateMany(req: Request, res: Response) {
    const { ids, data } = req.body;
    if (!ids || ids.length === 0) {
      res.status(400);
      throw new Error("Ids not found");
    }

    for (let i = 0; i < data.length; i++) {
      const error = await this.service.validate(data[i]);
      if (error) {
        res.status(400);
        throw new Error(`Validation error at index ${i}: ${error.message}`);
      }
    }

    await this.service.updateMany(ids, data);
    const objects = await this.service.findAll({
      where: { _id: { $in: ids } },
    });
    const response = new ResponseBuilder().setData(objects).build();
    res.status(200).json(response);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const object = await this.service.delete(id);
    if (!object) {
      res.status(404);
      throw new Error("Object not found");
    }
    const response = new ResponseBuilder().setData(object).build();
    res.status(200).json(response);
  }

  async deleteMany(req: Request, res: Response) {
    const { ids } = req.body;
    if (!ids || ids.length === 0) {
      res.status(400);
      throw new Error("Ids not found");
    }
    const object = await this.service.deleteMany(ids);
    const response = new ResponseBuilder().setData(object).build();
    res.status(200).json(response);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const { populate } = parseRequestQuery(req.query);
    const object = await this.service.findOne({ where: { _id: id }, populate });
    if (!object) {
      res.status(404);
      throw new Error("Object not found");
    }
    const response = new ResponseBuilder().setData(object).build();
    res.status(200).json(response);
  }

  async findMany(req: Request, res: Response) {
    const { limit, skip, sort, populate, where } = parseRequestQuery(req.query);
    const objects = await this.service.findAll({
      limit,
      skip,
      sort,
      populate,
      where,
    });
    const response = new ResponseBuilder().setData(objects).build();
    res.status(200).json(response);
  }
}
