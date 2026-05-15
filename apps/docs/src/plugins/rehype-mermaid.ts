/**
 * rehype plugin that renders mermaid code blocks into SVG diagrams.
 *
 * In MDX, write:
 * ```mermaid
 * graph TD
 *   A --> B
 * ```
 *
 * This plugin runs during the build/dev transform phase and replaces
 * the <pre><code class="language-mermaid">...</code></pre> with
 * a <div class="mermaid">...</div> that Starlight/Expressive Code won't
 * wrap, allowing the mermaid SVG to render.
 */

import type { Root } from "hast";
import { visit } from "unist-util-visit";
import type { Transformer } from "unified";

const MERMAID_LANG = "language-mermaid";
const MERMAID_CLASS = "mermaid-diagram-container";

export function rehypeMermaid(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (!parent || typeof index !== "number") return;
      if (node.tagName !== "pre") return;

      const codeNode = node.children.find(
        (c) => c.type === "element" && c.tagName === "code"
      ) as typeof node | undefined;

      if (!codeNode || codeNode.type !== "element") return;

      const classes = (codeNode.properties?.class as string | undefined)?.split(" ");
      if (!classes?.includes(MERMAID_LANG)) return;

      // Extract mermaid source text
      const textNode = codeNode.children.find(
        (c) => c.type === "text"
      ) as { value: string } | undefined;

      if (!textNode) return;
      const source = textNode.value.trim();
      if (!source) return;

      // Replace <pre><code> with <div class="mermaid-diagram-container">
      const replacement: typeof node = {
        type: "element",
        tagName: "div",
        properties: {
          class: MERMAID_CLASS,
          "data-mermaid": true,
        },
        children: [
          {
            type: "text",
            value: source,
          },
        ],
      };

      parent.children.splice(index, 1, replacement);
    });
  };
}
