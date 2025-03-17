import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/sequelize";
import { ChatMessage } from "./ChatMessage";

export interface IUserChannel {
  id: number;
  userId: number;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
  messages?: ChatMessage[];
}

export class UserChannel
  extends Model<
    InferAttributes<UserChannel>,
    InferCreationAttributes<UserChannel>
  >
  implements IUserChannel
{
  id!: number;
  userId!: number;
  channelId!: string;
  createdAt!: Date;
  updatedAt!: Date;
  messages?: ChatMessage[];
}

UserChannel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserChannel",
    tableName: "user_channels",
    underscored: true,
    timestamps: true,
  }
);
