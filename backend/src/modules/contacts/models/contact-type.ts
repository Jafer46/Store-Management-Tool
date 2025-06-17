import { Schema, model } from "mongoose";
import { IContact_Type } from "../../../constants/types";

const contactTypeSchema = new Schema<IContact_Type>(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model("ContactType", contactTypeSchema);
