import { AIController } from "./controllers/AIController.ts"

export const OpenAIController = new AIController();

const assistantId = Deno.env.get("ASSISTANT_ID");

if (assistantId)
  OpenAIController.loadAssistant(assistantId);
else
  OpenAIController.createAssistant();
