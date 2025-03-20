import { DataTypes } from "sequelize";
import { ChatMessage, MessageType } from "./ChatMessage";
import { sequelize } from "../config/sequelize";

export class AIMessage extends ChatMessage {
  constructor(values?: any, options?: any) {
    super(values, options);
    this.role = MessageType.AI;
  }
}

AIMessage.init(
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
      defaultValue: MessageType.AI,
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
    modelName: "AIMessage",
    tableName: "chat_messages",
    underscored: true,
    timestamps: true,
  }
);
