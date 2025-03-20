import { InferCreationAttributes } from "sequelize";
import { User, Channel, UserChannel, UserType } from "../models"

async function main() {
  let user = await User.findOne({
    where: {
      email: "john.doe@example.com",
    },
  });

  if (user) {
    console.log("User found");
  } else {
    console.log("Creating user");
    user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      userType: UserType.USER,
    } as InferCreationAttributes<User>);
  }

  let channel = await Channel.findOne({
    where: {
      name: "Test Channel",
    },
  });

  if (channel) {
    console.log("Channel found");
  } else {
    console.log("Creating channel");
    channel = await Channel.create({
      name: "Test Channel",
    } as InferCreationAttributes<Channel>);
  }

  let userChannel = await UserChannel.findOne({
    where: {
      userId: user.id,
      channelId: channel.id,
    },
  });

  if (userChannel)  {
    console.log("userChannel found");
  } else {
    console.log("Creating userChannel");
    userChannel = await UserChannel.create({
      userId: user.id,
      channelId: channel.id,
    } as InferCreationAttributes<UserChannel>);
  }
}


main();
