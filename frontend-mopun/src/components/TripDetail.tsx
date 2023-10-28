import React, { useEffect, useRef, useState } from "react";
import Card from "./UI/Card";
import classes from "./TripDetail.module.css";
import { useReactToPrint } from "react-to-print"; // Import useReactToPrint
import PrintableTripItem from "./PrintableTripItem";
import { redirect, useNavigate } from "react-router-dom";
import { TripTypes } from "../services/TripTypes";
import MessageInput from "./MessageInput";
import { handleSendMessage as Active } from "../hooks/PutRequest";
import { handleMessagePost } from "../hooks/PostRequest";

type TripId = {
  tripId: string;
};

const TripItem = (props: TripId) => {
  const [data, setData] = useState<TripTypes | null>(null);
  const navigate = useNavigate();

  const handleComplete = () => {
    Active(props.tripId);
    navigate(-1);
  };

  const handleLogMessage = (message: string) => {
    if (data?.callSign != null) {
    
      console.log("My Message "+message)
      handleMessagePost(data.callSign, message);
    }
  };


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

  return (
    <>
      <div className={classes.pageContainer}>
        <div className={classes.container}>
          <div className={classes.details}>
            {data ? (
              <>
                <h6>{formatDate(data.startDate)}</h6>
                <div className={classes.heading}>
                  <h1>Call Sign: {data.callSign}</h1>
                </div>
                <div className={classes.containerHeading}>
                  <h5>Trip Id: {props.tripId}</h5>
                  <h5>Moto Id: {data.motoId ?? "N/A"}</h5>
                  <h5>Mobile: {data.mobile}</h5>
                </div>
                <div>
                  <h4>Personnel</h4>
                  <ul className={classes.twoColumns}>
                    {data.personnel.map((personnel, index) => (
                      <li key={index}>
                        {data.personnel[index]?.bunkerNum}{" "}
                        {data.personnel[index]?.firstName}{" "}
                        {data.personnel[index]?.lastName}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Vehicles</h4>
                  <ul className={classes.twoColumns}>
                    {data.vehicle.map((vehicle, index) => (
                      <li key={index}>
                        {data.vehicle[index]?.registration}{" "}
                        {data.vehicle[index]?.make} {data.vehicle[index]?.model}
                      </li>
                    ))}
                  </ul>
       
                </div>
              </>
            ) : (
              <p>No Data</p>
            )}
            <div className={classes.buttonContainer}>
                     <button onClick={handleComplete} className={classes.completeButton}>
              Complete Trip
            </button>
            </div>
          </div>
          <div className={classes.messageBoard}>
            <div className={classes.heading}>
              <h2>{data?.callSign} Message</h2>
            </div>

            <MessageInput
              onSendMessage={handleLogMessage}
            ></MessageInput>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripItem;

const formatDate = (date: any) => {
  const dateObject = new Date(date);
  // Set the date format
  const day = dateObject.toLocaleString("en-US", { day: "2-digit" });
  const month = dateObject.toLocaleString("en-US", { month: "short" });
  const year = dateObject.toLocaleString("en-US", { year: "numeric" });
  return day + "-" + month + "-" + year;
};

// const TripItem = (props: TripId) => {
//   const [data, setData] = useState<TripTypes | null>(null);
//   const [printing, setPrinting] = useState(false);
//   const componentRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://localhost:7056/api/Trip/${props.tripId}`
//         );
//         if (response.ok) {
//           const tripData = await response.json();
//           setData(tripData);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [props.tripId]);

// useEffect(() => {
//   if (printing && componentRef.current) {
//     // Perform printing when printing is true and ref is available
//     handlePrint();
//     navigate(-1);
//   }
// }, [printing, navigate]);

// const handlePrint = useReactToPrint({
//   content: () => componentRef.current,
//   onBeforeGetContent: () => {
//     setPrinting(true);
//   },

//   onAfterPrint: () => {
//     setPrinting(false);
//   },
// });

//   return (
//     <Card className={classes.details}>
//       {data ? (
//         <>
//           <div className={classes.heading}>
//             <h1>Call Sign: {data.callSign}</h1>
//             <p>Trip Id: {props.tripId}</p>
//           </div>
//           <p>{formatDate(data.startDate)}</p>
//           <p>Moto Id: {data.motoId ?? 'N/A'}</p>
//           <p>Mobile: {data.mobile}</p>
//           <div>
//             Vehicles:
//             <ul>
//               {data.vehicle.map((vehicle, index) => (
//                 <li key={index}>
//                   {data.vehicle[index]?.registration}{" "}
//                   {data.vehicle[index]?.make}{" "}
//                   {data.vehicle[index]?.model}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             Personnel:
//             <ul>
//               {data.personnel.map((personnel, index) => (
//                 <li key={index}>
//                   {data.personnel[index]?.bunkerNum}{" "}
//                   {data.personnel[index]?.firstName}{" "}
//                   {data.personnel[index]?.lastName}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* <p>Priority: {data.priority}</p>
//           <button onClick={() => setPrinting(true)}>Print</button> */}
//         </>

//       ) : (
//         <p>No Data</p>
//         // <p>{printing ? "Printing..." : "Loading..."}</p>
//       )}
//       {/* // {printing && (
//       //   <PrintableTripItem ref={componentRef} tripInfo={data || null} />
//       // )} */}
//     </Card>
//   );
// };
