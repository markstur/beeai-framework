/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseMemory } from "@/memory/base.js";
import { Message } from "@/backend/message.js";
import { Callback } from "@/emitter/types.js";
import { AnyTool, BaseToolRunOptions, ToolError, ToolOutput } from "@/tools/base.js";
import {
  ReActAgentAssistantPrompt,
  ReActAgentSchemaErrorPrompt,
  ReActAgentSystemPrompt,
  ReActAgentToolErrorPrompt,
  ReActAgentToolInputErrorPrompt,
  ReActAgentToolNoResultsPrompt,
  ReActAgentToolNotFoundPrompt,
  ReActAgentUserEmptyPrompt,
  ReActAgentUserPrompt,
} from "@/agents/react/prompts.js";
import { LinePrefixParser } from "@/parsers/linePrefix.js";
import { JSONParserField, ZodParserField } from "@/parsers/field.js";
import { NonUndefined } from "@/internals/types.js";
import { ChatModelOutput } from "@/backend/chat.js";

export interface ReActAgentRunInput {
  prompt: string | null;
}

export interface ReActAgentRunOutput {
  result: Message;
  iterations: ReActAgentRunIteration[];
  memory: BaseMemory;
}

export interface ReActAgentRunIteration {
  raw: ChatModelOutput;
  state: ReActIterationResult;
}

export interface ReActAgentExecutionConfig {
  totalMaxRetries?: number;
  maxRetriesPerStep?: number;
  maxIterations?: number;
}

export interface ReActAgentRunOptions {
  signal?: AbortSignal;
  execution?: ReActAgentExecutionConfig;
}

export interface ReActAgentMeta {
  iteration: number;
}

export interface ReActAgentUpdateMeta extends ReActAgentMeta {
  success: boolean;
}

export interface ReActAgentCallbacks {
  start?: Callback<{ meta: ReActAgentMeta; tools: AnyTool[]; memory: BaseMemory }>;
  error?: Callback<{ error: Error; meta: ReActAgentMeta }>;
  retry?: Callback<{ meta: ReActAgentMeta }>;
  success?: Callback<{
    data: Message;
    iterations: ReActAgentRunIteration[];
    memory: BaseMemory;
    meta: ReActAgentMeta;
  }>;
  update?: Callback<{
    data: ReActIterationResult;
    update: { key: keyof ReActIterationResult; value: string; parsedValue: unknown };
    meta: ReActAgentUpdateMeta;
    memory: BaseMemory;
  }>;
  partialUpdate?: Callback<{
    data: ReActAgentIterationResultPartial;
    update: { key: keyof ReActIterationResult; value: string; parsedValue: unknown };
    meta: ReActAgentUpdateMeta;
  }>;
  toolStart?: Callback<{
    data: {
      tool: AnyTool;
      input: unknown;
      options: BaseToolRunOptions;
      iteration: ReActAgentIterationToolResult;
    };
    meta: ReActAgentMeta;
  }>;
  toolSuccess?: Callback<{
    data: {
      tool: AnyTool;
      input: unknown;
      options: BaseToolRunOptions;
      result: ToolOutput;
      iteration: ReActAgentIterationToolResult;
    };
    meta: ReActAgentMeta;
  }>;
  toolError?: Callback<{
    data: {
      tool: AnyTool;
      input: unknown;
      options: BaseToolRunOptions;
      error: ToolError;
      iteration: ReActAgentIterationToolResult;
    };
    meta: ReActAgentMeta;
  }>;
}

export interface ReActAgentTemplates {
  system: typeof ReActAgentSystemPrompt;
  assistant: typeof ReActAgentAssistantPrompt;
  user: typeof ReActAgentUserPrompt;
  userEmpty: typeof ReActAgentUserEmptyPrompt;
  toolError: typeof ReActAgentToolErrorPrompt;
  toolInputError: typeof ReActAgentToolInputErrorPrompt;
  toolNoResultError: typeof ReActAgentToolNoResultsPrompt;
  toolNotFoundError: typeof ReActAgentToolNotFoundPrompt;
  schemaError: typeof ReActAgentSchemaErrorPrompt;
}

export type ReActAgentParserInput = LinePrefixParser.define<{
  thought: ZodParserField<string>;
  tool_name: ZodParserField<string>;
  tool_input: JSONParserField<Record<string, any>>;
  tool_output: ZodParserField<string>;
  final_answer: ZodParserField<string>;
}>;

type ReActAgentParser = LinePrefixParser<ReActAgentParserInput>;
export type ReActIterationResult = LinePrefixParser.inferOutput<ReActAgentParser>;
export type ReActAgentIterationResultPartial =
  LinePrefixParser.inferPartialOutput<ReActAgentParser>;
export type ReActAgentIterationToolResult = NonUndefined<
  ReActIterationResult,
  "tool_input" | "tool_name"
>;
