import "server-only";
import { snippets } from "@/components/snippets";
import hljs from "highlight.js/lib/core";
import ts from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/gradient-dark.css";

type SnippetID = keyof typeof snippets;

hljs.registerLanguage("typescript", ts);

export default async function Code({
  file,
  code,
  noTitle,
  id,
}: {
  file: string;
  code?: string;
  noTitle?: boolean;
  id?: SnippetID;
}) {
  let text = code ?? "";
  let header = file ?? "";
  if (id) {
    text = snippets[id].code;
    header = snippets[id].file;
  } else {
    const id: SnippetID = camel(file) as SnippetID;
    if (!text) {
      text = snippets[id].code;
    }
    if (!header) {
      header = snippets[id].file;
    }
  }

  const highlightedCode = hljs.highlight(text, {
    language: "typescript",
  }).value;
  return (
    <div>
      {noTitle ? null : <pre className="text-xs">{header}</pre>}
      <pre className="text-sm rounded-xl border p-2">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}

// Converts kebab-case or file-like strings to camelCase
export function camel(input: string) {
  return input
    .replace(/[-_]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (m) => m.toLowerCase());
}
