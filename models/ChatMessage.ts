import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/sequelize";

export enum MessageType {
  AI = 'ai',
  HUMAN = 'human'
}

export interface IChatMessage {
  id: number;
  userChannelId: number;
  content: string;
  role: MessageType;
  createdAt: Date;
  updatedAt: Date;
}

export class ChatMessage
  extends Model<
    InferAttributes<ChatMessage>,
    InferCreationAttributes<ChatMessage>
  >
  implements IChatMessage
{
  id!: number;
  userChannelId!: number;
  content!: string;
  role!: MessageType;
  createdAt!: Date;
  updatedAt!: Date;
}

ChatMessage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userChannelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(MessageType)),
      allowNull: false,
      defaultValue: MessageType.HUMAN,
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
    modelName: "ChatMessage",
    tableName: "chat_messages",
    underscored: true,
    timestamps: true,
  }
);
