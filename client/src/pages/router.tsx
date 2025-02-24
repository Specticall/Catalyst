import { createBrowserRouter } from "react-router-dom";
import Main from "./app/Main";
import Login from "./showcase/Login";
import AppLayout from "./showcase/AppLayout";
import Protect from "@/components/general/Protect";
import ErrorPage from "./ErrorPage";
import Landing from "./showcase/Landing";

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
    errorElement: <ErrorPage />,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
