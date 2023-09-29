import { json, redirect } from "react-router-dom";
import MopForm from "../components/MopForm";

const MopPage = () => {
  return <MopForm />;
};

export default MopPage;

export const action = async ({ request }: { request: Request }) => {
  let privi: string = "";
  const API_URL = "https://localhost:7056/api/Trip/AddTrip";
  
  const data = await request.formData();
  console.log(data.get("patrolVehicle"));
  console.log(data.get("startTimes"));
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callSign: data.get("callSign"),
      PatrolType: data.get("patrolType"),
      MobileNumber: data.get("patrolMobile"),
      MotorollaID: data.get("patrolMotoId"),
      PatrolDate: data.get("patrolDate"),
      startTime: data.get("patrolStart"),
      endTime: data.get("patrolEnd"),
      PatrolStart: data.get("patrolStartPoint"),
      PatrolReg: data.get("patrolReg"),
      PatrolPersonell: data.get("patrolPersonell"),
    }),
  });
  if (response.status === 422 || response.status === 402) {
    return json({ message: "Validation error" }, { status: response.status });
  }
  if (!response.ok) {
    return json({ message: "Server error" }, { status: 500 });
  }

  console.log(privi);
  return redirect(privi);
};

