import { DialogComponents, DialogProvider } from "./components/ui/Dialog";
import CookiesDialog from "./components/cookies/CookiesDialog";
import ToastProvider from "./components/ui/Toast";
import { SkeletonTheme } from "react-loading-skeleton";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./pages/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT } from "./config/config";
import WorkspaceEditorDialog from "./components/collaboration/WorkspaceEditorDialog";
import WorkspaceMemberEditor from "./components/collaboration/WorkspaceMemberEditor";

export const dialogs = [
  {
    name: "cookie",
    component: <CookiesDialog />,
  },
  {
    name: "workspace-editor",
    component: <WorkspaceEditorDialog />,
  },
  {
    name: "member-editor",
    component: <WorkspaceMemberEditor />,
  },
] as const satisfies DialogComponents;

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT}>
        <SkeletonTheme baseColor="#202024" highlightColor="#2a2c36">
          <ToastProvider>
            <DialogProvider components={dialogs}>
              <RouterProvider router={router} />
            </DialogProvider>
          </ToastProvider>
        </SkeletonTheme>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
