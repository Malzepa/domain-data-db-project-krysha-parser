import { Document, Schema } from "mongoose";
import { MongoDataBase } from "..";

const COLLECTION_NAME = "House";

export interface IHouse extends Document {
  adId: string;
  title: string;
  price: {
    priceValue: number;
    priceUnit: string;
  };
  buildingType: string;
  yearBuilt: number;
  area: {
    areaValue: number;
    areaUnit: string;
  };
  sectorArea: {
    sectorAreaValue: number;
    sectorAreaUnit: string;
  };
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
      priceValue: {
        type: Number,
        default: 0,
      },
      priceUnit: {
        type: String,
        default: "",
      },
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
      areaValue: {
        type: Number,
        default: 0,
      },
      areaUnit: {
        type: String,
        default: "",
      },
    },
    sectorArea: {
      sectorAreaValue: {
        type: Number,
        default: 0,
      },
      sectorAreaUnit: {
        type: String,
        default: "",
      },
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
