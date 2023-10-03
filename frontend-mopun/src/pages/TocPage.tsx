
import { Outlet } from "react-router-dom";
import TripList from "../components/TripList";

const TocPage = () => {
  return (
    <>
    <TripList />
    <Outlet />
  </>
  );
};
export default TocPage;
