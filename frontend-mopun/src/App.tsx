import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MopPage from './pages/MopPage';
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <LoginPage /> },
      { path: "mop", element: <MopPage/>},
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
