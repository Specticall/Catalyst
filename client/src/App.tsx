import { DialogComponents, DialogProvider } from "./components/ui/Dialog";
import CookiesDialog from "./components/cookies/CookiesDialog";
import ToastProvider from "./components/ui/Toast";
import { SkeletonTheme } from "react-loading-skeleton";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./pages/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT } from "./config/config";

export const dialogs = [
  {
    name: "cookie",
    component: <CookiesDialog />,
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

// export default function App() {
//   return (
//     <ToastProvider>
//       <DialogProvider components={dialogs}>
//         <div className="min-h-screen w-full bg-base">
//           <div className="min-h-screen flex flex-col">
//             <Header />
//             <main className=" flex-1 relative grid grid-cols-[22.5rem_1fr]">
//               <aside
//                 aria-label="explorer-sidebar"
//                 className="bg-foreground border-r flex flex-col border-border p-4 pb-0"
//               >
//                 <ExplorerHeader />
//                 <FileExplorer />
//               </aside>
//               <WorkspaceLayout />
//             </main>
//           </div>
//         </div>
//       </DialogProvider>
//     </ToastProvider>
//   );
// }
