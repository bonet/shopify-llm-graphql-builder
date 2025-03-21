import { DataTypes } from "sequelize";
import { Channel } from "../../src/models";

describe("Channel Model", () => {
  it("should have correct attributes and types", () => {
    const attributes = Channel.getAttributes();
    expect(attributes.id.type).toEqual(DataTypes.UUID());
    expect(attributes.name.type).toEqual(DataTypes.STRING());
    expect(attributes.createdAt.type).toEqual(DataTypes.DATE());
    expect(attributes.updatedAt.type).toEqual(DataTypes.DATE());
  });
});
