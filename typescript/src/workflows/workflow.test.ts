/**
 * Copyright 2025 © BeeAI a Series of LF Projects, LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Workflow } from "@/workflows/workflow.js";
import { z } from "zod";

describe("Workflow", () => {
  it("runs the next step when a synchronous step does not return a value", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(() => {}),
      b: vi.fn(() => {}),
    };

    const workflow = new Workflow({ schema }).addStep("a", step.a).addStep("b", step.b);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(1);
    expect(step.a).toHaveReturnedWith(undefined);
    expect(step.b).toHaveBeenCalledTimes(1);
  });

  it("runs the next step when an asynchronous step does not return a value", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(async () => {}),
      b: vi.fn(async () => {}),
    };

    const workflow = new Workflow({ schema }).addStep("a", step.a).addStep("b", step.b);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(1);
    expect(step.a.mock.settledResults[0].value).toBeUndefined();
    expect(step.b).toHaveBeenCalledTimes(1);
  });

  it("runs the next step when a synchronous step returns 'next'", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(() => {
        return Workflow.NEXT;
      }),
      b: vi.fn(() => {}),
    };

    const workflow = new Workflow({ schema }).addStep("a", step.a).addStep("b", step.b);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(1);
    expect(step.a).toHaveReturnedWith(Workflow.NEXT);
    expect(step.b).toHaveBeenCalledTimes(1);
  });

  it("runs the next step when an asynchronous step returns 'next'", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(async () => {
        return Workflow.NEXT;
      }),
      b: vi.fn(async () => {}),
    };

    const workflow = new Workflow({ schema }).addStep("a", step.a).addStep("b", step.b);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(1);
    expect(step.a.mock.settledResults[0].value).toBe(Workflow.NEXT);
    expect(step.b).toHaveBeenCalledTimes(1);
  });

  it("runs no subsequent steps when a synchronous step returns 'end'", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(() => {
        return Workflow.END;
      }),
      b: vi.fn(() => {}),
    };

    const workflow = new Workflow({ schema }).addStep("a", step.a).addStep("b", step.b);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(1);
    expect(step.b).not.toHaveBeenCalled();
  });
  it("runs no subsequent steps when an asynchronous step returns 'end'", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(async () => {
        return Workflow.END;
      }),
      b: vi.fn(async () => {}),
    };

    const workflow = new Workflow({ schema }).addStep("a", step.a).addStep("b", step.b);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(1);
    expect(step.b).not.toHaveBeenCalled();
  });

  it("reruns the first step when a synchrounous step returns 'start'", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(() => {}),
      b: vi.fn(() => {}),
      c: vi.fn(() => {
        if (step.b.mock.calls.length === 1) {
          return Workflow.START;
        }
      }),
      d: vi.fn(() => {}),
    };

    const workflow = new Workflow({ schema })
      .addStep("a", step.a)
      .addStep("b", step.b)
      .addStep("c", step.c)
      .addStep("d", step.d);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(2);
    expect(step.b).toHaveBeenCalledTimes(2);
    expect(step.c).toHaveBeenCalledTimes(2);
    expect(step.d).toHaveBeenCalledTimes(1);
  });

  it("reruns the first step when an asynchrounous step returns 'start'", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(async () => {}),
      b: vi.fn(async () => {}),
      c: vi.fn(async () => {
        if (step.b.mock.calls.length === 1) {
          return Workflow.START;
        }
      }),
      d: vi.fn(async () => {}),
    };

    const workflow = new Workflow({ schema })
      .addStep("a", step.a)
      .addStep("b", step.b)
      .addStep("c", step.c)
      .addStep("d", step.d);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(2);
    expect(step.b).toHaveBeenCalledTimes(2);
    expect(step.c).toHaveBeenCalledTimes(2);
    expect(step.d).toHaveBeenCalledTimes(1);
  });

  it("reruns the current step when a synchrounous step returns 'self'", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(() => {}),
      b: vi.fn(() => {
        if (step.b.mock.calls.length === 1) {
          return Workflow.SELF;
        }
      }),
      c: vi.fn(() => {}),
    };

    const workflow = new Workflow({ schema })
      .addStep("a", step.a)
      .addStep("b", step.b)
      .addStep("c", step.c);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(1);
    expect(step.b).toHaveBeenCalledTimes(2);
    expect(step.c).toHaveBeenCalledTimes(1);
  });
  it("reruns the current step when an asynchrounous step returns 'self'", async () => {
    const schema = z.object({});

    const step = {
      a: vi.fn(async () => {}),
      b: vi.fn(async () => {
        if (step.b.mock.calls.length === 1) {
          return Workflow.SELF;
        }
      }),
      c: vi.fn(async () => {}),
    };

    const workflow = new Workflow({ schema })
      .addStep("a", step.a)
      .addStep("b", step.b)
      .addStep("c", step.c);

    await workflow.run({});
    expect(step.a).toHaveBeenCalledTimes(1);
    expect(step.b).toHaveBeenCalledTimes(2);
    expect(step.c).toHaveBeenCalledTimes(1);
  });
});
