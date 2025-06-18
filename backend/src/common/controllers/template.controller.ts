import { CrudService } from "../service/crud.service";
import { Model, Document, Error, RootFilterQuery } from "mongoose";
import { Request, Response } from "express";
import { ResponseBuilder } from "../../utils/response.builder";
import { parseRequestQuery } from "../../utils/request.parser";

export class Controller<T extends Document> {
  constructor(private model: Model<T>) {}

  validate = async (
    data: Partial<T>
  ): Promise<Error.ValidationError | null> => {
    const doc = new this.model(data);
    try {
      await doc.validate();
      return null; // valid
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return err; // invalid
      }
      throw err; // some other error
    }
  };

  create = async (req: Request, res: Response) => {
    const data: Partial<T> = req.body;
    const errors = await this.validate(data);
    if (errors) {
      res.status(400);
      throw new Error(errors.message);
    }
    const doc = new this.model(data);
    const object = await doc.save();
    const response = new ResponseBuilder().setData(object).build();
    res.status(201).json(response);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: Partial<T> = req.body;
    const error = await this.validate(data);
    if (error) {
      res.status(400);
      throw new Error(error.message);
    }

    const object = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    const response = new ResponseBuilder().setData(object).build();
    res.status(200).json(response);
  };

  updateMany = async (req: Request, res: Response) => {
    const { ids, data } = req.body;
    if (!ids || ids.length === 0) {
      res.status(400);
      throw new Error("Ids not found");
    }

    for (let i = 0; i < data.length; i++) {
      const error = await this.validate(data[i]);
      if (error) {
        res.status(400);
        throw new Error(`Validation error at index ${i}: ${error.message}`);
      }
    }

    await this.model.updateMany({ _id: { $in: ids } }, data).exec();
    const objects = await this.model.find({
      where: { _id: { $in: ids } },
    });
    const response = new ResponseBuilder().setData(objects).build();
    res.status(200).json(response);
  };

  deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const object = await this.model.findByIdAndDelete(id).exec();
    if (!object) {
      res.status(404);
      throw new Error("Object not found");
    }
    const response = new ResponseBuilder().setData(object).build();
    res.status(200).json(response);
  };

  deleteMany = async (req: Request, res: Response) => {
    const { ids } = req.body;
    if (!ids || ids.length === 0) {
      res.status(400);
      throw new Error("Ids not found");
    }
    const object = await this.model.deleteMany({ _id: { $in: ids } }).exec();
    const response = new ResponseBuilder().setData(object).build();
    res.status(200).json(response);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { populate } = parseRequestQuery(req.query);

    const object = await this.model
      .findOne({ _id: id })
      .populate(populate!)
      .exec();
    if (!object) {
      res.status(404);
      throw new Error("Object not found");
    }
    const response = new ResponseBuilder().setData(object).build();
    res.status(200).json(response);
  };

  findMany = async (req: Request, res: Response) => {
    let { limit, skip, sort, populate, where } = parseRequestQuery(req.query);

    const objects = await this.model
      .where(where)
      .limit(limit!)
      .skip(skip!)
      .sort(sort!)
      .populate(populate!)
      .exec();

    const response = new ResponseBuilder().setData(objects).build();
    res.status(200).json(response);
  };
}
