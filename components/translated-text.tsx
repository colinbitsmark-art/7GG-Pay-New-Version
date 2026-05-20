import * as React from "react";
import { translateText, type Language } from "@/lib/i18n";

export function translateNode(node: React.ReactNode, language: Language = "en"): React.ReactNode {
  if (Array.isArray(node)) {
    return React.Children.map(node, (child) => translateNode(child, language));
  }
  if (typeof node === "string") {
    const trimmed = node.trim();
    if (!trimmed) return node;
    const leading = node.match(/^\s*/)?.[0] ?? "";
    const trailing = node.match(/\s*$/)?.[0] ?? "";
    return leading + translateText(trimmed, language) + trailing;
  }
  if (!React.isValidElement(node)) return node;

  const props = node.props as { children?: React.ReactNode };
  if (props.children === undefined) return node;

  return React.cloneElement(
    node as React.ReactElement<{ children?: React.ReactNode }>,
    { children: translateNode(props.children, language) }
  );
}
