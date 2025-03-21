import { DataTypes } from "sequelize";
import { UserChannel } from "../../src/models";

describe("UserChannel Model", () => {
  it("should have correct attributes and types", () => {
    const attributes = UserChannel.getAttributes();
    expect(attributes.id.type).toEqual(DataTypes.INTEGER());
    expect(attributes.userId.type).toEqual(DataTypes.INTEGER());
    expect(attributes.channelId.type).toEqual(DataTypes.UUID());
    expect(attributes.createdAt.type).toEqual(DataTypes.DATE());
    expect(attributes.updatedAt.type).toEqual(DataTypes.DATE());
  });
});
