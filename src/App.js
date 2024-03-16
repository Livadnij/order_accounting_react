import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Layout from "./Pages/Layout";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <MainPage />,
        index: true,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
