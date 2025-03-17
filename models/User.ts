import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/sequelize";

export enum UserType {
  USER = "USER",
  BOT = "BOT",
}

export interface IUser {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements IUser
{
  id!: number;
  firstName!: string;
  lastName?: string;
  email!: string;
  userType!: UserType;
  createdAt!: Date;
  updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userType: {
      type: DataTypes.ENUM(UserType.USER, UserType.BOT),
      allowNull: false,
      defaultValue: UserType.USER,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users",
    underscored: true,
    timestamps: true,
  }
);

export default User;
