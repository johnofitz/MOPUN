import  { useEffect, useState } from "react";
import Card from "./UI/Card";
import classes from "./TripDetail.module.css"

type TripItemProps = {
  tripId: string;
  callSign: string;
  location: string;
  lastLocation: string;
  mobile: string;
  motoId: string;
  reason: string;
  priority: string;
  startDate: string;
  startTime: string;
  endTime: string;
  personnelTrips: string[];
  vehicleTrips: string[];
};

type TripId = {
  tripId: string;
};

const TripItem = (props: TripId) => {
  const [data, setData] = useState<TripItemProps | null>(null); // Initialize data as null
  console.log(props.tripId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7056/api/Trip/${props.tripId}`
        );
        if (response.ok) {
          const tripData = await response.json();
          setData(tripData);
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [props.tripId]); // Include props.tripId in the dependency array to re-fetch data when it changes

  return (
    <Card className={classes.details}>
      {data ? (
      <>
      
          <h1>{data.callSign}</h1>
          <p>Moto Id: {data.motoId}</p>
          <p>
            Vehicle Trips:
            <ul>
              {data.vehicleTrips.map((vehicle, index) => (
                <li key={index}>{vehicle}</li>
              ))}
            </ul>
          </p>
          <p>
            Bunker No:
            <ul>
              {data.personnelTrips.map((personnel, index) => (
                <li key={index}>{personnel}</li>
              ))}
            </ul>
          </p>

          </>
      ) : (
        <p>Loading...</p>
      )}
     
     </Card>
  );
};

export default TripItem;
