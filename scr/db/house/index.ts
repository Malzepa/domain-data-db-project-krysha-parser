import { Document, Schema } from "mongoose";
import { MongoDataBase } from "..";

const COLLECTION_NAME = "House";

export interface IHouse extends Document {
  adId: string;
  title: string;
  price: number;
  buildingType: string;
  yearBuilt: number;
  area: number;
  bathroom: string;
  floor: number;
  totalFloors: number;
}

const HouseSchema = new Schema<IHouse>(
  {
    adId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    buildingType: {
      type: String,
      default: "",
    },
    yearBuilt: {
      type: Number,
      default: 0,
    },
    area: {
      type: Number,
      default: 0,
    },
    bathroom: {
      type: String,
      default: "",
    },
    floor: {
      type: Number,
      default: 0,
    },
    totalFloors: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

HouseSchema.index({ title: 1 });

export const HouseModel = MongoDataBase.mainDataBaseConnection.model<IHouse>(
  COLLECTION_NAME,
  HouseSchema,
  COLLECTION_NAME
);
