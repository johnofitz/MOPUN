import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MopPage, { action as patrolInfo } from "./pages/MopPage";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import LoginPage, { action as authAction } from "./pages/LoginPage";
import { Logout } from "./pages/Logout";
import { TokenLoader } from "./services/Auth";
import TocPage, { action as test } from "./pages/TocPage";
import CommcenPage from "./pages/CommcenPage";

import TripPage from "./pages/TripsPage";
import EditTripPage from "./pages/EditTripPage";
import TripDetailPage from "./pages/TripDetailPage";
import MopTrips from "./pages/MopTrips";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: TokenLoader,
    children: [
      { index: true, element: <LoginPage />, action: authAction },
      { path: "mop", element: <MopPage />, action: patrolInfo },
      { path: "toc", element: <TocPage />},
      { path: "commop", element: <CommcenPage /> },
      { path: "tripDetails/:tripId", element: <TripDetailPage />},
      {path: "mopTrips", element: <MopTrips/>},
      { path: "logout", action: Logout },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
