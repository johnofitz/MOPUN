import React, { useEffect, useRef, useState } from "react";
import Card from "./UI/Card";
import classes from "./TripDetail.module.css";
import { useReactToPrint } from "react-to-print"; // Import useReactToPrint
import PrintableTripItem from "./PrintableTripItem";
import { useNavigate } from "react-router-dom";
import { TripTypes } from '../services/TripTypes';



type TripId = {
  tripId: string;
};

const TripItem = (props: TripId, tripItems: TripTypes) => {
  const [data, setData] = useState<TripTypes | null>(null);
  const [printing, setPrinting] = useState(false);
  const componentRef = useRef(null);
  const navigate = useNavigate();

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
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [props.tripId]);

  useEffect(() => {
    if (printing && componentRef.current) {
      // Perform printing when printing is true and ref is available
      handlePrint();
      navigate(-1)
    }
  }, [printing, navigate]);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      setPrinting(true);
    },
    
    onAfterPrint: () => {
      setPrinting(false);
    },
  });

  return (

    <Card className={classes.details}>
      {data ? (
        <>
      
        <div className={classes.heading}>
          <h1 >{data.callSign}</h1>
          </div>
          <p>Moto Id: {data.motoId}</p>
          <div>
            Vehicle Trips:
            <ul>
              {data.vehicleTrips.map((vehicle, index) => (
                <li key={index}>{vehicle}</li>
              ))}
            </ul>
          </div>
          <div>
            Bunker No:
            <ul>
              {data.personnelTrips.map((personnel, index) => (
                <li key={index}>{personnel}</li>
              ))}
            </ul>
          </div>
          <p>Priority: {data.priority}</p>
          <button onClick={() => setPrinting(true)}>Print</button>
        </>
      ) : (
        <p>{printing ? "Printing..." : "Loading..."}</p>
      )}
      {printing && <PrintableTripItem ref={componentRef} tripInfo={data || null} />}
   </Card>
  );
};

export default TripItem;
