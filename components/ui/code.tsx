import "server-only";
import fs from "fs";
import path from "node:path";
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
    const filePath = path.join(process.cwd(), file);
    text = fs.readFileSync(filePath, "utf8");
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
