import { Document, Schema } from "mongoose";
import { MongoDataBase } from "..";

const COLLECTION_NAME = "Proxy";

export interface IProxy extends Document {
  name: String;
  login: String;
  password: String;
  proxy: String;
  host: String;
  port: Number;
}

const ProxySchema = new Schema<IProxy>(
  {
    name: {
      type: String,
      default: "",
    },
    login: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    proxy: {
      type: String,
      default: "",
    },
    host: {
      type: String,
      default: "",
    },
    port: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

ProxySchema.index({ port: 1 });

export const ProxyModel = MongoDataBase.mainDataBaseConnection.model<IProxy>(
  COLLECTION_NAME,
  ProxySchema,
  COLLECTION_NAME
);
