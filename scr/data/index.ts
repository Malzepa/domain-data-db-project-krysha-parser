import { Types } from "mongoose";
import { IHouse, HouseModel } from "../db/house";

export type SaveHouseType = {
  adId: string;
  title: string;
  price: number;
  buildingType: string;
  yearBuilt: number;
  area: number;
  bathroom: string;
  floor: number;
  totalFloors: number;
};

export type FindOneHouseOptionsType =
  | {
      adId: string;
    }
  | {
      _id: Types.ObjectId;
    };

export type UpdateUserType = {
  title?: string;
  price?: number;
  buildingType?: string;
  yearBuilt?: number;
  area?: number;
  bathroom?: string;
  floor?: number;
  totalFloors?: number;
};

export class HouseData {
  public static async save(data: SaveHouseType): Promise<IHouse> {
    return new HouseModel(data).save();
  }

  public static async findOne(
    findOne: FindOneHouseOptionsType
  ): Promise<IHouse | null> {
    return HouseModel.findOne(findOne);
  }

  public static async updateOne(
    findOne: FindOneHouseOptionsType,
    data: UpdateUserType
  ): Promise<void> {
    await HouseModel.updateOne(findOne, data);
  }
}
