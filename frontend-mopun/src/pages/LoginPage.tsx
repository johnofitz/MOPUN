import { json, redirect } from "react-router-dom";
import Auth from "../components/AuthComponents/AuthForm";
import { UserRole } from "../services/Auth";

const LoginPage = () => {
  return <Auth />;
};

export default LoginPage;

export const action = async ({ request }: { request: Request }) => {
  let privi:string = "";
  const API_URL = "https://localhost:7056/api/Login/SignIn";

  const data = await request.formData();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.get("username"),
      password: data.get("password"),
    }),
  });
  
  if (response.status === 422 || response.status === 404) {
    const jsonData = await response.json(); // Wait for the JSON parsing
    console.log(jsonData); // Logging the JSON response
    return jsonData; // Return the parsed JSON data
}

  if (!response.ok) {
    return json({ message: "Server error" }, { status: 500 });
  }
  const resData = await response.json();
  const token = resData.token;
  const role:string = resData.roles;

  sessionStorage.setItem("token", token);
  sessionStorage.setItem("role", role);
  const checkRole = UserRole();
  
  if(checkRole === "User"){
   privi = "/mop";
  }
  if(checkRole === "High"){
    privi ="/toc";
  }
  console.log(privi);
  return redirect(privi);
};
