import { DataTypes } from "sequelize";
import { User, UserType } from "../../src/models";

describe("User Model", () => {
  it("should have correct attributes and types", () => {
    const attributes = User.getAttributes();
    expect(attributes.id.type).toEqual(DataTypes.INTEGER());
    expect(attributes.firstName.type).toEqual(DataTypes.STRING());
    expect(attributes.lastName.type).toEqual(DataTypes.STRING());
    expect(attributes.email.type).toEqual(DataTypes.STRING());
    expect(attributes.type.type).toEqual(
      DataTypes.ENUM(UserType.USER, UserType.BOT)
    );
    expect(attributes.externalApp.type).toEqual(DataTypes.STRING());
    expect(attributes.externalDomain.type).toEqual(DataTypes.STRING());
    expect(attributes.externalUserId.type).toEqual(DataTypes.STRING());
    expect(attributes.createdAt.type).toEqual(DataTypes.DATE());
    expect(attributes.updatedAt.type).toEqual(DataTypes.DATE());
  });
});
