import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import ExplorerProvider from "./context/explorer/ExplorerProvider.tsx";
import { WorkspaceProvider } from "./context/workspace/WorkspaceProvider.tsx";
import "react-loading-skeleton/dist/skeleton.css";

const client = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <SkeletonTheme baseColor="#202024" highlightColor="#2a2c36">
        <ExplorerProvider>
          <WorkspaceProvider>
            <App />
          </WorkspaceProvider>
        </ExplorerProvider>
      </SkeletonTheme>
    </QueryClientProvider>
  </StrictMode>
);
