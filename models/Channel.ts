import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/sequelize";

export interface IChannel {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Channel
  extends Model<InferAttributes<Channel>, InferCreationAttributes<Channel>>
  implements IChannel
{
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

Channel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
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
    modelName: "Channel",
    tableName: "channels",
    underscored: true,
    timestamps: true,
  }
);
