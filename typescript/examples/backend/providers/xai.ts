/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "dotenv/config";
import { XAIChatModel } from "beeai-framework/adapters/xai/backend/chat";
import "dotenv/config.js";
import { ToolMessage, UserMessage } from "beeai-framework/backend/message";
import { ChatModel } from "beeai-framework/backend/chat";
import { AbortError } from "beeai-framework/errors";
import { z } from "zod";
import { OpenMeteoTool } from "beeai-framework/tools/weather/openMeteo";

const llm = new XAIChatModel(
  "grok-3-mini",
  // {},
  // {
  //   apiKey: "XAI_API_KEY",
  //   baseURL: "XAI_API_BASE_URL",
  // },
);

llm.config({
  parameters: {
    temperature: 0.7,
    maxTokens: 1024,
    topP: 1,
  },
});

async function xaiFromName() {
  const xaiLLM = await ChatModel.fromName("xai:grok-3-mini");
  const response = await xaiLLM.create({
    messages: [new UserMessage("what states are part of New England?")],
  });
  console.info(response.getTextContent());
}

async function xaiSync() {
  const response = await llm.create({
    messages: [new UserMessage("what is the capital of Massachusetts?")],
  });
  console.info(response.getTextContent());
}

async function xaiStream() {
  const response = await llm.create({
    messages: [new UserMessage("How many islands make up the country of Cape Verde?")],
    stream: true,
  });
  console.info(response.getTextContent());
}

async function xaiAbort() {
  try {
    const response = await llm.create({
      messages: [new UserMessage("What is the smallest of the Cape Verde islands?")],
      stream: true,
      abortSignal: AbortSignal.timeout(5 * 1000),
    });
    console.info(response.getTextContent());
  } catch (err) {
    if (err instanceof AbortError) {
      console.error("Aborted", { err });
    }
  }
}

async function xaiStructure() {
  const response = await llm.createStructure({
    schema: z.object({
      answer: z.string({ description: "your final answer" }),
    }),
    messages: [new UserMessage("How many islands make up the country of Cape Verde?")],
  });
  console.info(response.object);
}

async function xaiToolCalling() {
  const userMessage = new UserMessage("What is the weather in Boston?");
  const weatherTool = new OpenMeteoTool({ retryOptions: { maxRetries: 3 } });
  const response = await llm.create({
    messages: [userMessage],
    tools: [weatherTool],
  });
  const toolCallMsg = response.getToolCalls()[0];
  console.debug(JSON.stringify(toolCallMsg));
  const toolResponse = await weatherTool.run(toolCallMsg.args as any);
  const toolResponseMsg = new ToolMessage({
    type: "tool-result",
    result: toolResponse.getTextContent(),
    toolName: toolCallMsg.toolName,
    toolCallId: toolCallMsg.toolCallId,
  });
  console.info(toolResponseMsg.toPlain());
  const finalResponse = await llm.create({
    messages: [userMessage, ...response.messages, toolResponseMsg],
    tools: [],
  });
  console.info(finalResponse.getTextContent());
}

async function xaiDebug() {
  // Log every request
  llm.emitter.match("*", (value, event) =>
    console.debug(
      `Time: ${event.createdAt.toISOString()}`,
      `Event: ${event.name}`,
      `Data: ${JSON.stringify(value)}`,
    ),
  );

  const response = await llm.create({
    messages: [new UserMessage("Hello world!")],
  });
  console.info(response.messages[0].toPlain());
}

console.info("xaiFromName".padStart(25, "*"));
await xaiFromName();
console.info("xaiSync".padStart(25, "*"));
await xaiSync();
console.info("xaiStream".padStart(25, "*"));
await xaiStream();
console.info("xaiAbort".padStart(25, "*"));
await xaiAbort();
console.info("xaiStructure".padStart(25, "*"));
await xaiStructure();
console.info("xaiToolCalling".padStart(25, "*"));
await xaiToolCalling();
console.info("xaiDebug".padStart(25, "*"));
await xaiDebug();
