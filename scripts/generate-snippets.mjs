import fs from "fs";
import path from "path";
import { glob } from "glob";

const SOURCE_DIR = path.join(process.cwd());
const OUTPUT_DIR = path.join(SOURCE_DIR, "components/snippets");

// Match all `.tsx` files except those in ignored folders
const files = glob.sync("**/*.tsx", {
  cwd: SOURCE_DIR,
  ignore: ["components/**", "**/node_modules/**"],
});

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const importLines = [];
const objectEntries = [];

for (const file of files) {
  const absPath = path.join(SOURCE_DIR, file);
  const content = fs.readFileSync(absPath, "utf8");

  const baseName = file.replace(/\//g, "-").replace(/\.tsx$/, "");
  const outPath = path.join(OUTPUT_DIR, `${baseName}.json`);
  const identifier = camel(baseName);

  fs.writeFileSync(outPath, JSON.stringify({ code: content, file }, null, 2));

  importLines.push(`import ${identifier} from "./${baseName}.json";`);
  objectEntries.push(`  ${identifier}`);

  console.log(`✅ Wrote ${baseName}.json`);
}

const indexContent =
  importLines.join("\n") +
  `\n\nexport const snippets = {\n${objectEntries.join(",\n")}\n};\n`;

fs.writeFileSync(path.join(OUTPUT_DIR, "index.ts"), indexContent);

// Converts kebab-case or file-like strings to camelCase
function camel(input) {
  return input
    .replace(/[-_]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (m) => m.toLowerCase());
}
