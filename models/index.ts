import { User, UserType } from "./User";
import { UserChannel } from "./UserChannel";
import { Channel } from "./Channel";
import { ChatMessage } from "./ChatMessage";

User.hasMany(UserChannel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "channels",
});

Channel.hasMany(UserChannel, {
  foreignKey: "channelId",
  onDelete: "CASCADE",
  as: "users",
});

UserChannel.belongsTo(User, { foreignKey: "userId", as: "user" });
UserChannel.belongsTo(Channel, { foreignKey: "channelId", as: "channel" });
UserChannel.hasMany(ChatMessage, {
  foreignKey: "userChannelId",
  onDelete: "CASCADE",
  as: "messages",
});

ChatMessage.belongsTo(UserChannel, {
  foreignKey: "userChannelId",
  as: "userChannel",
});

export { User, UserType, UserChannel, Channel, ChatMessage };
