import React from "react";

export default {
  'code[class*="language-"]': {
    color: "#22da17",
    fontFamily: "JetBrains Mono",
    textAlign: "left",
    whiteSpace: "pre-wrap",
    wordSpacing: "normal",
    wordBreak: "break-word",
    wordWrap: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "2",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    lineHeight: "28px",
    fontSize: "16px",
    margin: "5px 0",
  },
  'pre[class*="language-"]': {
    color: "white",
    fontFamily: "monospace",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    lineHeight: "25px",
    fontSize: "18px",
    margin: "0.5em 0",
    background: "#181818",
    padding: "1em",
    overflow: "auto",
  },
  'pre[class*="language-"] *': {
    fontFamily: "monospace",
  },
  ':not(pre) > code[class*="language-"]': {
    color: "white",
    background: "#0a143c",
    padding: "0.1em",
    borderRadius: "0.3em",
    whiteSpace: "normal",
  },
  'pre[class*="language-"]::-moz-selection': {
    textShadow: "none",
    background: "rgba(29, 59, 83, 0.99)",
  },
  'pre[class*="language-"] ::-moz-selection': {
    textShadow: "none",
    background: "rgba(29, 59, 83, 0.99)",
  },
  'code[class*="language-"]::-moz-selection': {
    textShadow: "none",
    background: "rgba(29, 59, 83, 0.99)",
  },
  'code[class*="language-"] ::-moz-selection': {
    textShadow: "none",
    background: "rgba(29, 59, 83, 0.99)",
  },
  'pre[class*="language-"]::selection': {
    textShadow: "none",
    background: "rgba(29, 59, 83, 0.99)",
  },
  'pre[class*="language-"] ::selection': {
    textShadow: "none",
    background: "rgba(29, 59, 83, 0.99)",
  },
  'code[class*="language-"]::selection': {
    textShadow: "none",
    background: "rgba(29, 59, 83, 0.99)",
  },
  'code[class*="language-"] ::selection': {
    textShadow: "none",
    background: "rgba(29, 59, 83, 0.99)",
  },
  comment: {
    color: "#a6accd99",
    // fontStyle: "italic",
  },
  prolog: {
    color: "#a6accd99",
    fontStyle: "italic",
  },
  cdata: {
    color: "#a6accd99",
    fontStyle: "italic",
  },
  punctuation: {
    color: "#a6accd",
  },
  ".namespace": {
    color: "rgb(178, 204, 214)",
  },
  deleted: {
    color: "rgba(239, 83, 80, 0.56)",
    fontStyle: "italic",
  },
  symbol: {
    color: "#ADD7FF",
  },
  property: {
    color: "#ADD7FF",
  },
  tag: {
    color: "#a6accd99",
  },
  operator: {
    color: "#a6accd99",
  },
  keyword: {
    color: "#ADD7FF",
  },
  boolean: {
    color: "#fffac2",
  },
  number: {
    color: "#fffac2",
  },
  constant: {
    color: "rgb(34 183 199)",
  },
  function: {
    color: "rgb(34 183 199)",
  },
  builtin: {
    color: "rgb(34 183 199)",
  },
  char: {
    color: "rgb(34 183 199)",
  },
  selector: {
    color: "rgb(199, 146, 234)",
    fontStyle: "italic",
  },
  doctype: {
    color: "rgb(199, 146, 234)",
    fontStyle: "italic",
  },
  "attr-name": {
    color: "#5DE4c7",
    fontStyle: "italic",
  },
  inserted: {
    color: "#5DE4c7",
    fontStyle: "italic",
  },
  string: {
    color: "#5DE4c7",
  },
  url: {
    color: "#5DE4c7",
  },
  entity: {
    color: "#5DE4c7",
  },
  ".language-css .token.string": {
    color: "#5DE4c7",
  },
  ".style .token.string": {
    color: "#5DE4c7",
  },
  "class-name": {
    color: "rgb(255, 203, 139)",
  },
  atrule: {
    color: "rgb(255, 203, 139)",
  },
  "attr-value": {
    color: "rgb(255, 203, 139)",
  },
  regex: {
    color: "rgb(214, 222, 235)",
  },
  important: {
    color: "rgb(214, 222, 235)",
    fontWeight: "bold",
  },
  variable: {
    color: "rgb(214, 222, 235)",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
} as { [key: string]: React.CSSProperties };
