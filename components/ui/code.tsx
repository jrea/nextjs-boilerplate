import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
// Using ES6 import syntax
import hljs from "highlight.js/lib/core";
import ts from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/gradient-dark.css";

hljs.registerLanguage("typescript", ts);

export default async function Code({
  file,
  code,
  noTitle,
}: {
  file: string;
  code?: string;
  noTitle?: boolean;
}) {
  let text = code ?? "";
  if (!text) {
    const filePath = path.resolve(process.cwd(), file); // Adjust path if needed
    text = await readFile(filePath, "utf-8");
  }
  const highlightedCode = hljs.highlight(text, {
    language: "typescript",
  }).value;
  return (
    <div>
      {noTitle ? null : <pre className="text-xs">{file}</pre>}
      <pre className="text-sm rounded-xl border p-2">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}
