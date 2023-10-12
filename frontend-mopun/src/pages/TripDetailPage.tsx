
import {  useParams } from "react-router-dom";
import TripItem from "../components/TripDetail";

function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>();

  
  const tripIdOrDefault = tripId || '1' ;


  return (
     <TripItem tripId={tripIdOrDefault} />
 
  );
}


export default TripDetailPage;

// async function loadTrip(tripId: any) {
//   const response = await fetch("https://localhost:7056/api/Trip/" + tripId);

//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch details for selected event." },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const resData = await response.json();
//     console.log(resData)
//     return resData;
//   }
// }

// export async function loader({params}: {params: Params}) {
//   const id = params.tripId;
//   return defer({
//     tripId: await loadTrip(id),
//   });
// }
