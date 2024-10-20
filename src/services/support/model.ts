import { Schema, model } from "mongoose";
import { ISupport } from "../../../types";

const schema = new Schema<ISupport>(
  {
    userID: { type: String, required: true },
    queryText: { type: String, required: true },
    deviceID: { type: String, required: true },
    date: {
      type: Date,
      default: () => new Date(),

    },
  },
  { timestamps: true }
);

schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  return JSON.parse(JSON.stringify(obj).replace(/_id/g, "id"));
};

const Support = model<ISupport>("Support", schema);

export default Support;