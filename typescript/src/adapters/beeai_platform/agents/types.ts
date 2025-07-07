/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Message } from "@/backend/message.js";
import { BaseMemory } from "@/memory/base.js";

export interface BeeAIPlatformAgentRunInput {
  input: Message | string | Message[] | string[];
}

export interface BeeAIPlatformAgentRunOutput {
  result: Message;
  event: Record<string, any>;
}

export interface BeeAIPlatformAgentInput {
  url: string;
  agentName: string;
  memory: BaseMemory;
}
