import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "Root";
import HomePage from "pages/home/HomePage";
import EventPage from "pages/event/EventPage";
import AddEventPage from "pages/add-event/AddEventPage";
import Alert from "components/ui/Alert";

const router = createBrowserRouter([
  {
    path: "/alan-systems",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "event/:id",
        element: <EventPage />,
      },
      {
        path: "event/add",
        element: <AddEventPage />,
      },
      {
        path: "*",
        element: <Alert>Page not found</Alert>,
      },
    ],
  },
]);

export default router;
