import { Schema, model } from "mongoose";

const accountGroupSchema = new Schema<IAccount_Group>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model<IAccount_Group>("AccountGroup", accountGroupSchema);
