import { DataTypes } from "sequelize";
import { ChatMessage } from "../../src/models";

describe("ChatMessage Model", () => {
  it("should have correct attributes and types", () => {
    const attributes = ChatMessage.getAttributes();
    expect(attributes.id.type).toEqual(DataTypes.INTEGER());
    expect(attributes.userChannelId.type).toEqual(DataTypes.STRING());
    expect(attributes.message.type).toEqual(DataTypes.TEXT());
    expect(attributes.createdAt.type).toEqual(DataTypes.DATE());
    expect(attributes.updatedAt.type).toEqual(DataTypes.DATE());
  });
});
