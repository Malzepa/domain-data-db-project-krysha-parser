import { Types } from "mongoose";
import { IUser, UserModel } from "../../db/user";

export type SaveUserType = {
  chatId: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type FindOneUserOptionsType =
  | {
      chatId: string;
    }
  | {
      _id: Types.ObjectId;
    };

export type UpdateUserType = {
  firstName?: string;
  lastName?: string;
  username?: string;
};

export class UserData {
  public static async save(data: SaveUserType): Promise<IUser> {
    return new UserModel(data).save();
  }

  public static async findOne(
    findOne: FindOneUserOptionsType
  ): Promise<IUser | null> {
    return UserModel.findOne(findOne);
  }

  public static async updateOne(
    findOne: FindOneUserOptionsType,
    data: UpdateUserType
  ): Promise<void> {
    await UserModel.updateOne(findOne, data);
  }
}

// public static async findOne(chatId: Number): Promise<IUser | null> {
//   console.log("new");

//   const foundUser = await UserModel.findOne({chatId: chatId});

//   return foundUser;
// }
