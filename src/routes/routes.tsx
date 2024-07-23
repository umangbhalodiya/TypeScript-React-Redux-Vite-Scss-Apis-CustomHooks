import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./Home";
import { Protectedroute } from "./protectedroute";
import Register from "./Authentication/Register";
import CreatePassword from "./Authentication/CreatePassword";
import { DefaultPage } from "../components/DefaultPage/DefaultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/register",
    element: (
      <DefaultPage>
        <Register />
      </DefaultPage>
    ),
  },
  {
    path: "/create-password",
    element: (
      <Protectedroute>
        <DefaultPage>
          <CreatePassword />
        </DefaultPage>
      </Protectedroute>
    ),
  },
  {
    path: "/home",
    element: (
      <Protectedroute>
        <DefaultPage>
          <Home />
        </DefaultPage>
      </Protectedroute>
    ),
  },
]);

export default router;
