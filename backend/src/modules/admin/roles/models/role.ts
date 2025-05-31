import { Schema, model, Types } from "mongoose";
import { IRole } from "../../../../constants/types";

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    level: {
      type: Number,
      default: 0,
    },
    access: {
      document: {
        type: Types.ObjectId,
        ref: "Document",
        required: true,
      },
      browse: {
        type: Boolean,
        default: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
      add: {
        type: Boolean,
        default: false,
      },
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export default model<IRole>("Role", roleSchema);
