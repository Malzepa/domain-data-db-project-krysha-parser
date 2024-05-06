import { Document, Schema } from "mongoose";
import { MongoDataBase } from "..";

const COLLECTION_NAME = "User";

export interface IUser extends Document {
  chatId: string;
  firstName: string;
  lastName: string;
  username: string;
}

const UserSchema = new Schema<IUser>(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

UserSchema.index({ firstName: 1 });
UserSchema.index({ username: 1 });

export const UserModel = MongoDataBase.mainDataBaseConnection.model<IUser>(
  COLLECTION_NAME,
  UserSchema,
  COLLECTION_NAME
);
