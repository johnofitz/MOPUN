import { json, redirect } from "react-router-dom";
import PatrolForm from "../components/PatrolForm";

const MopPage = () => {
  return <PatrolForm />;
};

export default MopPage;

export const action = async ({ request }: { request: Request }) => {
  const API_URL = "https://localhost:7056/api/Trip/AddTrip";

  const data = await request.formData();

  const personnelSelectValue = data.getAll("personnelSelect");

  const vehicles = data.getAll("vehicleSelect");

  const VehicleValues = vehicles.toString().split(",");
  // Convert the value to a string
  const personnelValues = personnelSelectValue.toString().split(",");

  const addPersonnelArray = personnelValues.map((value: string) =>
    value.trim()
  );

  const addVehicleArray = VehicleValues.map((value: string) => value.trim());
  const patrolDateStr: string | undefined = data.get("patrolDate") as string;
  console.log("This Date: " + patrolDateStr);
  if (!patrolDateStr) {
    // Handle the case where patrolDateStr is undefined or empty
    return null;
  }

  // Split the date string into its components
  const dateParts = patrolDateStr.split("/");

  if (dateParts.length !== 3) {
    // Handle the case where the date string doesn't have the expected format
    return null;
  }

  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are zero-based
  const year = parseInt(dateParts[2]);
  // Create a new Date object with the extracted components
  const dateObject = new Date(year, month, day);

  console.log(dateObject);
  if (isNaN(dateObject.getTime())) {
    // Handle the case where the date is invalid (e.g., February 30th)
    return null;
  }

  // console.log(addPersonnelArray)
  // console.log(addVehicleArray)
  // console.log(data.get("callSign"))
  // console.log(data.get("patrolType"))
  // console.log(data.get("patrolMobile"))
  // console.log(dateObject)
  // console.log(data.get("postSelect"))
  // console.log(data.get("startTime"))
  // console.log(data.get("endTime"))
  // console.log(data.get("patrolMoto"))
  // console.log(data.get("selectedOption"))

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callSign: data.get("callSign"),
      patrolType: data.get("patrolType"),
      patrolMobile: data.get("patrolMobile"),
      patrolDate: dateObject,
      selectedOption: data.get("selectedOption"),
      startTimes: data.get("startTime"),
      endTimes: data.get("endTime"),
      patrolMoto: data.get("patrolMoto"),
      patrolStartPoint: data.get("postSelect"),
      patrolVehicle: addVehicleArray,
      addPersonnel: addPersonnelArray, // Use the modified array here
    }),
  });

  if (response.status === 422 || response.status === 402) {
    return json({ message: "Validation error" }, { status: response.status });
  }
  if (!response.ok) {
    return json({ message: "Server error" }, { status: 500 });
  }

  return redirect("/mop");
};
