import { DataTypes } from "sequelize";
import { ChatMessage, MessageType } from "./ChatMessage";
import { sequelize } from "../config/sequelize";

export class HumanMessage extends ChatMessage {
  constructor(values?: any, options?: any) {
    super(values, options);
    this.role = MessageType.HUMAN;
  }
}

HumanMessage.init(
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
    modelName: "HumanMessage",
    tableName: "chat_messages",
    underscored: true,
    timestamps: true,
  }
);
