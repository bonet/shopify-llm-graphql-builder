import {
  StateGraph,
  Annotation,
  START,
  END,
} from "@langchain/langgraph";
import { RunnableConfig } from "@langchain/core/runnables";
import { InferCreationAttributes } from "sequelize";
import {
  ChatMessage,
  HumanMessage,
  UserChannel,
} from "../models";
import { callConversationTier1 } from "./openai";

const OverallState = Annotation.Root({
  errors: Annotation<string[]>,
  tier1Responses: Annotation<any[]>,
  userChannel: Annotation<UserChannel>,
  inputMessage: Annotation<string>,
  outputMessage: Annotation<string>,
  messages: Annotation<ChatMessage[]>({
    // Different types are allowed for updates
    reducer: (left: ChatMessage[], right: ChatMessage | ChatMessage[]) => {
      if (Array.isArray(right)) {
        return left.concat(right);
      }
      return left.concat([right]);
    },
    default: () => [],
  }),
});

const createHumanMessage = async (
  state: typeof OverallState.State,
  config?: RunnableConfig
): Promise<Partial<typeof OverallState.State>> => {
  const humanMessage = await HumanMessage.create({
    userChannelId: config?.configurable?.userChannel.id,
    content: state.inputMessage,
    createdAt: new Date(),
  } as InferCreationAttributes<ChatMessage>);

  return {
    messages: [humanMessage],
  };
};

const createTier1Message = async (
  _: typeof OverallState.State,
  config?: RunnableConfig
): Promise<any> => {
  console.log("in createTier1Message");
  const botTier1Response = await callConversationTier1(
    config?.configurable?.userChannel.messages || []
  );

  return {
    tier1Responses: botTier1Response.queries,
  };
};

const workflow = new StateGraph(OverallState)
  .addNode("createHumanMessage", createHumanMessage)
  .addNode("createTier1Message", createTier1Message)
  .addEdge(START, "createHumanMessage")
  .addEdge("createHumanMessage", "createTier1Message")
  .addEdge("createTier1Message", END);

export const chatApp = workflow.compile();
