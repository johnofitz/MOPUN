import { json } from "react-router-dom";
import Auth from "../components/AuthForm";

const LoginPage = () => {
  return <Auth />;
};

export default LoginPage;

export const action = async (username: string, password: string) => {
  const API_URL = "https://localhost:7056/api/Login/SignIn";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  if (response.status === 422 || response.status === 402) {
    return json({ message: "Validation error" }, { status: response.status });
  }
  if (!response.ok) {
    return json({ message: "Server error" }, { status: 500 });
  }
  const resData = await response.json();
  const token = resData.token;
  const role = resData.roles;

  sessionStorage.setItem("token", token);
  sessionStorage.setItem("role", role)


};
