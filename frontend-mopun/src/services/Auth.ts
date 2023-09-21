import { redirect } from 'react-router-dom';

export const AuthToken =()=>{
    const token = sessionStorage.getItem('token');
    return token;
}
export const UserRole = () => {
    return sessionStorage.getItem('role');
  }
export const RoleLoader =()=>{
    const role = UserRole();
    return role;
}
export const TokenLoader =()=>{
    const token = AuthToken();
    
  
    return token;
}

export const CheckAuthToken=()=>{
    const token = AuthToken();

    if(!token){
        return redirect('/')
    }

    return null;
}