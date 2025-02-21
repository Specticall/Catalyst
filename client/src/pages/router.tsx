import { createBrowserRouter } from "react-router-dom";
import Main from "./app/Main";
import Login from "./showcase/Login";
import AppLayout from "./showcase/AppLayout";
import Protect from "@/components/general/Protect";

const router = createBrowserRouter([
  {
    path: "/app",
    element: (
      <Protect>
        <Main />
      </Protect>
    ),
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
