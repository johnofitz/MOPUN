import { redirect } from "react-router-dom";

export const Logout =()=>{
    sessionStorage.clear();
    return redirect('/');
}