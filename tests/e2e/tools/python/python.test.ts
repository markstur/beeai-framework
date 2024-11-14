/**
 * Copyright 2024 IBM Corp.
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

import { expect } from "vitest";
import { PythonTool } from "@/tools/python/python.js";
import { LocalPythonStorage } from "@/tools/python/storage.js";

import fs from "fs";
import os from "os";
import path from "path";

const codeInterpreterUrl = process.env.CODE_INTERPRETER_URL || "http://localhost:50051";

const getTmpDir = () => fs.mkdtempSync(`${os.tmpdir()}${path.sep}code_interpreter_test_`);
const getPythonTool = () => new PythonTool({
  codeInterpreter: { url: codeInterpreterUrl },
  storage: new LocalPythonStorage({
    interpreterWorkingDir: getTmpDir(),
    localWorkingDir: "./test_dir/"
  }),
});

describe("PythonTool", () => {

  it("Is the expected tool", () => {

    const tool = getPythonTool()
    expect(tool).toBeInstanceOf(PythonTool);
    expect(PythonTool.isTool(tool)).toBe(true);
    expect(tool.name).toBe("Python");
    expect(tool.description).toMatch("Run Python and/or shell code");
  });

  it("Returns zero exitCode and stdout results", async () => {

    const result = await getPythonTool().run({
      language: "python",
      code: "print('hello')",
      inputFiles: [],
    });

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe("hello\n");
  });

  it("Returns non-zero exitCode and stderr for bad python", async () => {

    const result = await getPythonTool().run({
        language: "python",
        code: "PUT LIST (((ARR(I,J) DO I = 1 TO 5) DO J = 1 TO 5))",
        inputFiles: [],
      });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch("SyntaxError");
  });

  it("Throws input validation error for wrong language", async () => {

    await expect(
      getPythonTool().run({
        language: "PL/1",
        code: "# won't get this far because we don't support PL/1 yet",
        inputFiles: [],
      }),
    ).rejects.toThrow("The received tool input does not match the expected schema.");
  });

  it("Throws input validation error for missing file", async () => {

    const sourceCode = `
    with open("file_to_read.txt", 'r') as f:
        print(f.read())
    `

    const result = await getPythonTool().run({
      language: "python",
      code: sourceCode,
      inputFiles: [ "bogus_file.txt" ],
    });

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe("hello\n");
    expect(result.files).toBe("hello\n");
  });

  it("Can read a file", async () => {

    const sourceCode = `
    with open("file_to_read.txt", 'r') as f:
        print(f.read())
    `

    const result = await getPythonTool().run({
      language: "python",
      code: sourceCode,
      inputFiles: [ "test_file.txt" ],
    });

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe("hello\n");
    expect(result.files).toBe("hello\n");
  });

});
