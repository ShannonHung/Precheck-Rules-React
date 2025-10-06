import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // 或其他主題

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FieldListLoader } from "./pages/FieldListPage/FieldListLoader";
import JsonPage from "./pages/FieldListPage/FieldListPage";
import FieldPage from "./pages/FieldPage";
import FilesPage from "./pages/FilesPage";
import NotFoundPage from "./pages/NotFoundPage";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <FilesPage />,
        errorElement: <NotFoundPage />,
      },
      {
        // 不能用 /file/:filename 是因為 filename 要使用 path 來表示才可以知道是哪一個 file
        path: "/file",
        element: <JsonPage />,
        loader: FieldListLoader,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/field/:field",
        element: <FieldPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
