import { Model, Document, RootFilterQuery, Error } from "mongoose";

interface FindProps<T> {
  where?: RootFilterQuery<T>;
  limit?: number;
  skip?: number;
  sort?: string;
  populate?: string[];
}

export class CrudService<T extends Document> {
  constructor(private model: Model<T>) {}

  async validate(data: Partial<T>): Promise<Error.ValidationError | null> {
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
  }
  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    return await doc.save();
  }

  async findAll({
    limit,
    skip,
    sort,
    populate,
    where,
  }: FindProps<T>): Promise<T[]> {
    let query = this.model.find();
    if (!where) {
      query = this.model.find({ where });
    }

    // Populate if provided
    if (Array.isArray(populate) && populate.length > 0) {
      query.populate(populate);
    }

    // Sort if valid
    if (typeof sort === "string" && sort.includes(":")) {
      const [field, order] = sort.split(":");
      if (order === "asc" || order === "desc") {
        query.sort({ [field]: order });
      }
    }

    // Skip if valid
    if (typeof skip === "number" && skip >= 0) {
      query.skip(skip);
    }

    // Limit if valid
    if (typeof limit === "number" && limit > 0) {
      query.limit(limit);
    }

    return await query.exec();
  }

  async findOne({ where, populate }: FindProps<T>): Promise<T | null> {
    let query = this.model.findOne({ where });

    // Populate if provided
    if (Array.isArray(populate) && populate.length > 0) {
      query.populate(populate);
    }

    return await query.exec();
  }

  async findById(id: string, populate?: string[]): Promise<T | null> {
    let query = this.model.findById(id);

    // Populate if provided
    if (Array.isArray(populate) && populate.length > 0) {
      query.populate(populate);
    }

    return await query.exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async updateMany(ids: string[], data: Partial<T>) {
    return await this.model.updateMany({ _id: { $in: ids } }, data).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async deleteMany(ids: string[]) {
    return await this.model.deleteMany({ _id: { $in: ids } }).exec();
  }
}
