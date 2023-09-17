import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MopPage from './pages/MopPage';
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import { Logout } from "./pages/Logout";
import { TokenLoader } from "./services/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: TokenLoader,
    children: [
      { index: true, element: <HomePage />,},
      { path: "mop", element: <MopPage/>},
      {
        path: "logout",
        action: Logout,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
