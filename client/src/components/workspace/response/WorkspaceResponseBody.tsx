import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useEffect, useRef, useState } from "react";
import WorkspaceResponseLoadMore from "./WorkspaceResponseLoadMore";
import workspaceStyle from "../workspaceStyle";

type Props = {
  data: unknown;
};

// The amount of characters partially rendered at a time
const PARTIAL_INTERVAL = 3000;

export default function WorkspaceResponseBody({ data }: Props) {
  const [highlighted, setHighlighted] = useState("");
  const [renderedLineCount, setRenderedLineCount] = useState(PARTIAL_INTERVAL);
  const prevScrollPos = useRef(0);

  useEffect(() => {
    const displayJSON = JSON.stringify(data || {}, null, "\t");
    setHighlighted(displayJSON);
  }, [data]);

  // Preserves the scroll position
  useEffect(() => {
    document
      .querySelector("[data-workspace-container]")
      ?.scrollTo({ top: prevScrollPos.current });
  }, [renderedLineCount]);

  const handleLoadMore = () => {
    // Capture previous scroll position
    prevScrollPos.current =
      document.querySelector("[data-workspace-container]")?.scrollTop || 0;
    setRenderedLineCount((cur) => cur + 3000);
  };

  return (
    <div className="relative">
      <WorkspaceResponseLoadMore
        onClick={handleLoadMore}
        // Only renders the load more button when the data / error has been fetched
        shouldRenderWhen={
          Boolean(data) && highlighted.length > PARTIAL_INTERVAL
        }
      />
      <div className="[&_*]:!font-[JetBrains_Mono] ">
        <SyntaxHighlighter
          language="json"
          style={workspaceStyle}
          showLineNumbers
          lineNumberStyle={{ fontStyle: "normal" }}
        >
          {highlighted.slice(0, renderedLineCount)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
