## python_v0.1.29 (2025-07-02)

### Bug Fixes

- acp-sdk import

## python_v0.1.28 (2025-07-02)

### Bug Fixes

- **adapters**: handle result of the RequirementAgent

## python_v0.1.27 (2025-07-01)

### Bug Fixes

- put back accidental changes
- resolve CI failures for PR
- **adapters**: agent's return type in the A2AServer
- **adapters**: agent's return type in the ACPServer
- **agents**: add 'result' field to RequirementAgent's output for backward compatibility

### Features

- **adapters**: add IBM watsonx Orchestrate integration (#897)
- add support for oneOf/anyOf modifiers in the JSONSchemaModel (#896)

## python_v0.1.26 (2025-06-26)

### Bug Fixes

- **agents**: remove extra new lines in the system prompt (RequirementAgent)
- **backend**: remove non-supported tool choice for strict environments
- set value for aliases in embedding model (#888)

### Features

- **adapters**: add Mistral AI backend provider
- **tools**: switch to httpx from requests in OpenMeteoTool, add proxy support
- **tools**: update description of the ThinkTool
- **tools**: ignore case sensitivity for OpenMeteoTool's temperature_unit parameter
- **tools**: update description of the WikipediaTool
- **agents**: update cycle prevention mechanism
- **adapters**: update ACP
- **backend**: allow to set headers for Ollama via ENV
- update logging in TrajectoryMiddleware

## python_v0.1.25 (2025-06-13)

### Bug Fixes

- **internals**: correctly abort tasks
- **agents**: correctly handle the 'force_at_step' argument in ConditionalRequirement
- properly invoke sync and async callbacks in runs (#883)

### Features

- add context dependent IO support (#886)
- **agents**: update RequirementAgent system prompt
- **internals**: execute sync callbacks in threads
- **agents**: add 'force_prevent_stop' attribute to ConditionalRequirement
- **agents**: update the behaviour of 'forced' attribute in RequirementAgent
- **tools**: simplify the Wikipedia tool
- **backend**: add text completion support for OpenAI (#871)
- add middleware arg to the core modules (#880)

## python_v0.1.24 (2025-06-08)

### Features

- **agents**: improve RequirementAgent interfaces, examples, docs (#878)
- expose watsonx embedding model (#877)
- **backend**: Support OpenAI embedding models (#873)
- **agents**: allow RequirementAgent to be exposed via ACP,BeeAIPlatform and A2A

## python_v0.1.23 (2025-06-03)

### Bug Fixes

- update import in GlobalTrajectoryMiddleware

## python_v0.1.22 (2025-06-03)

### Bug Fixes

- **agent**: Enable parser options in python like they are enabled in typescript (#856)

### Features

- **agents**: add experimental RequirementAgent (#852)
- **providers**: add session support for ACP (#854)
- **adapters**: add A2A remote agent (#845)
- **adapters**: Add initial EmbeddingModel adapters (#814)

## python_v0.1.21 (2025-05-15)

### Features

- **adapters**: add validation checks for ACP and BeeAI Platform (#838)
- **adapters**: introduce ACP and BeeAIPlatform serve integrations (#833)
- **adapters**: add MCP server adapter (#830)
- **agents**: prevent cycles in ToolCallingAgent (#832)
- **adapters**: add support for ACP servers (#808)

## python_v0.1.20 (2025-05-06)

### Bug Fixes

- **backend**: update types for chat model parameters (#806)

### Features

- **workflows**: extend AgentWorkflow state
- **backend**: detect invalid tool calls due to the max token constraint (#820)
- **tools**: improve schema parsing in OpenAPITool (#815)
- **agents**: add save_intermediate_steps to AgentWorkflow

## python_v0.1.19 (2025-04-29)

### Features

- **agent**: migrate to newer ACP SDK in RemoteAgent (#794)
- **backend**: Add EmbeddingModel (#787)
- **backend**: add the ability to change the strictness of a tool input and response format schema (#795)

## python_v0.1.18 (2025-04-23)

### Bug Fixes

- **backend**: make ChatModel temperature a float instead of int (#784)

### Features

- **backend**: improve settings propagation and env loading (#790)
- **tools**: improve type hints for JSONToolOutput (#785)

## python_v0.1.17 (2025-04-18)

### Bug Fixes

- context var storage cleanup (#775)
- update event meta context type

### Features

- allow consuming Run instance as an async generator (#778)

## python_v0.1.16 (2025-04-16)

### Bug Fixes

- **adapters**: use text content for system messages to satisfy Groq (#768)
- prevent type error when cloning ChatModel (#760)

### Features

- **tools**: Add OpenAPITool (#747)

## python_v0.1.15 (2025-04-14)

### Bug Fixes

- **adapters**: update tool_choice list in Watsonx (#759)
- **adapters**: handle tool structured fallback in Watsonx

## python_v0.1.14 (2025-04-04)

### Bug Fixes

- **agents**: avoid message duplication in ToolCallingAgent (#728)
- **agents**: remove extra ` in the group_id (#726)

### Features

- add cloneable protocol and implement clone method (#705)

## python_v0.1.13 (2025-04-03)

### Bug Fixes

- **adapter**: use api_base instead of url in WatsonxChatModel (#720)

### Features

- **agents**: enforce tool usage in ToolCallingAgent (#721)
- **backend**: disable loading of external cost map in LiteLLM by default (#723)

## python_v0.1.12 (2025-04-01)

### BREAKING CHANGE

- - Removed ability to import classes from beeai_framework without a path
- Moved AbortSignal from beeai_framework.cancellation to beeai_framework.utils
- Moved MCPTool from beeai_framework.tools.mcp_tools to beeai_framework.tools.mcp

### Refactor

- clarify public API (#711)

## python_v0.1.11 (2025-03-28)

### Refactor

- **examples**: improve python_tool.py example readability (#696)
- **agents**: rework agent templates API (#681)

### Bug Fixes

- **templates**: resolve Pydantic deprecation warning (#698)
- **tools**: SandboxTool fails when run by an agent (#684)

### Features

- **backend**: add fallback to structured decoding for environments lacking tool calling support

## python_v0.1.10 (2025-03-26)

### Bug Fixes

- **agents**: respect the stream parameter in the ReActAgent (#666)

### Features

- **tools**: add SandboxTool (#669)
- adding cache to ChatModel and Tool (#627)
- **adapters**: Add support for extra headers to more backend providers (#661)
- **backend**: add support for images (#664)
- **agents**: Granite sample now loops for chat (#663)
- **tools**: Add code interpreter (#583)

## python_v0.1.9 (2025-03-24)

### Bug Fixes

- **backend**: handle empty tool calls for vLLM (#644)

### Features

- **workflows**: add ability to pass agent instance to AgentWorkflow (#641)
- **backend**: add tool_choice parameter (#645)
- **instrumentation**: remove instrumentation module and switch to openinference (#628) (#642)

## python_v0.1.8 (2025-03-19)

### Bug Fixes

- **adapters**: actually return usage in ChatModelOutput (#613)
- **emitter**: propagate errors from user callbacks (#608)
- **tools**: update events definition to pass Pydantic validation (#606)

### Features

- **backend**: simplify chat model configuration (#623)
- cache implemenation & test (#602)
- **agents**: improve ToolCallingAgent (#619)
- **tools**: improve OpenMeteo input schema (#620)
- improve error output with context (#601)
- **backend**: align backend environment variable usage with typescript (#594)

## python_v0.1.7 (2025-03-17)

### Bug Fixes

- **agents**: retry if tool does not exist in ToolCallingAgent (#600)
- **backend**: do not use OpenAI strict response format for Ollama (#598)
- handle compositional schemas in JSONSchemaModel (#599)
- **backend**: do not pass empty tool calls to Watsonx (#597)

## python_v0.1.6 (2025-03-14)

### Bug Fixes

- **tools**: avoid session management in MCPTool (#589)

### Features

- **agents**: improve ToolCallingAgent performance (#593)

## python_v0.1.5 (2025-03-13)

## Features

- **agents** Added Tool Calling Agent (#551)
- **workflows** Rework Agent Workflow (#554)
- **agents** Added **Run.on()** for event callbacks (#516)
- **adapters** Support for Azure OpenAI (#514)
- **adapters** Support for Anthropic (#522)
- **adapters** Support additional headers for OpenAI (#533)

## Bug Fixes

- **emitter** `*.*` matcher to correctly match all events and nested events (#515)
- **tools** handle non-existing locations in OpenMeteo tool (#513)
- **backend** LiteLLM Event Loop Closed Error (#523)
- **tools** MCP tool error (#570)

## Code Quality

- Added types for emitter events (#581)
- Added static type checking with `mypy` (#565)
- Improved error messages across the framework (#519)
- Reworked base agent run and run context (#562)
- Cleaned up dependencies (#526)

## Documentation

- Added MCP tool tutorial (#555)
- Fixed numerous broken links (#544, #560)
- Added multiple examples (e.g., observability) (#560, #535)

## Testing & CI

- Added link checker to verify documentation links (#542, #568)
- Addressed failing end-to-end tests (#508)

## Migration Guide

This guide will help you update your codebase to the latest version. It outlines breaking changes and new features which may require updates to your application.

### Type Checking

Static type checking with `mypy` was added to improve code quality and catch errors earlier. If you plan contributing to the project please be aware of these changes:

- Mypy validation is now part of CI and will check type correctness
- Consider running `poe type-check` locally before submitting PRs

### Agent Framework Changes

#### BaseAgent Generics

The `BaseAgent` class now uses generics for improved type safety. If you've created custom agents that extend `BaseAgent`, you'll need to update your class definitions to specify the appropriate types:

```python
# Before
class MyCustomAgent(BaseAgent):
    ...

# After
class MyCustomAgent(BaseAgent[MyCustomAgentRunOutput]):
    ...
```

> **NOTE**: See a complete example here: https://github.com/i-am-bee/beeai-framework/blob/main/python/examples/agents/custom_agent.py

#### Agent Run and RunContext

Agent `Run` and `RunContext` have been refactored. Take note of the changes and update that may be required:

1. Check for changes in the RunContext API if you access it directly
2. Review any custom agent implementations that override run-related methods

#### Tool Calling Agent

A new tool calling agent has been added. If you were calling tools, consider migrating to `ToolCallingAgent` which provides:

- Standardized tool calling patterns
- Better integration with the framework
- Improved error handling for tool operations

### Run.on Event API

The new `Run.on` API provides a simpler way to listen to emitted events:

```python
# Before
def print_events(data, event):
    print(data)

def observer(emitter: Emitter):
    emitter.on("*", print_events)

agent = ReActAgent(...)
resppnse = agent.run(...).observe(observer)

# After
def print_events(data, event):
    print(data)

agent = ReActAgent(...)
resppnse = agent.run(...).on("*", print_events)
```

This new API supplements the `Run.observe`. The `Run.observe` continues to be available and can be used, but you may consider migrating any existing event observers to use this more direct approach.

### New Adapter Support

#### Anthropic Support

If you've been waiting for Anthropic model support, you can now use it in the Python framework:

```python
from beeai_framework.adapters.anthropic.backend.chat import AnthropicChatModel
from beeai_framework.backend.message import UserMessage

async def anthropic_from_name() -> None:
    llm = AnthropicChatModel("claude-3-haiku-20240307")
    user_message = UserMessage("what states are part of New England?")
    response = await llm.create(messages=[user_message])
    print(response.get_text_content())
```

#### Azure OpenAI Support

Similarly, the Python framework now supports Azure OpenAI:

```python
from beeai_framework.adapters.azure_openai.backend.chat import AzureOpenAIChatModel
from beeai_framework.backend.message import UserMessage

async def azure_openai_sync() -> None:
    llm = AzureOpenAIChatModel("gpt-4o-mini")
    user_message = UserMessage("what is the capital of Massachusetts?")
    response = await llm.create(messages=[user_message])
    print(response.get_text_content())
```

### Emitter Changes

The "match all nested" matcher (i.e., `*.*`) behavior has been fixed. If you were relying on this specific matching patterns, verify that your event handling still works as expected.

### OpenMeteo Tool

If you're using the `OpenMeteo` tool, it now handles non-existing locations more gracefully. Please revisit any error handling around location lookups in your code.

### Workflow Arguments

The workflow `add_agent()` method has been improved to accept keyword arguments.. Review any `workflow.add_agent(..)` you may be using to take advantage of these improvements:

```python
# Before
workflow.add_agent(agent=AgentFactoryInput(name="Agent name", tools=[], llm=chat_model))

# After
workflow.add_agent(name="Agent name", tools=[], llm=chat_model)
```

## python_v0.1.4 (2025-03-06)

### Refactor

- rename Bee agent to ReAct agent (#505)
- move logger to the root (#504)
- update user-facing event data to all be dict and add docs (#431)
- **agents**: remove Bee branding from BaseAgent (#440)

### Bug Fixes

- improve decorated tool output (#499)
- **backend**: correctly merge inference parameters (#496)
- **backend**: tool calling, unify message content (#475)
- **backend**: correctly merge inference parameters (#486)
- **tools**: make emitter required (#461)
- **workflows**: handle relative steps (#463)

### Features

- **adapters**: add Amazon Bedrock support (#466)
- **examples**: adds logger examples and updates docs (#494)
- **internals**: construct Pydantic model from JSON Schema (#502)
- **adapters**: Add Google VertexAI support (#469)
- **tools**: add MCP tool (#481)
- langchain tool (#474)
- **examples**: templates examples ts parity (#480)
- **examples**: adds error examples and updates error docs (#490)
- **agents**: simplify variable usage in prompt templates (#484)
- improve PromptTemplate.render API (#476)
- **examples**: Add custom_agent and bee_advanced examples (#462)
- **agents**: handle message formatting (#470)
- **adapters**: Add xAI backend (#445) (#446)

## python_v0.1.3 (2025-03-03)

### Features

- **adapters** add Groq backend support (#450)

### Bug Fixes

- **agents**: handle native tool calling and retries (#456)
- disregard unset params (#459)
- chatmodel params None (#458)
- pass chatmodel config parameters (#457)
- **tools**: async _run (#452)

## python_v0.1.2 (2025-02-28)

### Refactor

- update public facing APIs to be more pythonic (#397)

### Bug Fixes

- missed review from #397 (#430)
- **agents**: state transitions
- **agents**: propagate tool output to the state
- env var access
- corrections in error class (#409)
- **backend**: watsonx tools (#405)
- ability to specify external Ollama server (#389)
- update some type hints (#381)
- pass through chatmodel params (#382)

### Features

- add runcontext + retryable + emitter to tool (#429)
- add runcontext and emitter to workflow (#416)
- **tools**: wikipedia handle empty results
- **agents**: add granite runner
- **backend**: add tool calling support
- improve error handling (#418)
- **templates**: add fork method for templates (#380)
- improve pre-commit hooks (#404)
- OpenAI chat model (#395)
- retryable implementation (#363)
- typings and error propagating (#383)

## python_v0.1.1 (2025-02-21)

### Refactor

- **examples**: bring agent examples to ts parity (#343)

### Bug Fixes

- apply suggestions from mypy (#369)
- various bug fixes (#361)
- emit parsed react elements (#360)
- debugging pass over example notebooks (#342)

### Features

- **parsers**: add line prefix parser (#359)

## python_v0.1.0 (2025-02-19)

### Features

- init python package
