import { AIController } from "./controllers/AIController.ts"

export const OpenAIController = new AIController();

const assistantId = Deno.env.get("ASSISTANT_ID");

if (assistantId)
  OpenAIController.setAssistant(assistantId);
else if (Deno.env.get("MOCK_API") === "false")
  OpenAIController.createAssistant();
