import { redirect } from 'react-router-dom';

export const AuthToken =()=>{
    const token = sessionStorage.getItem('token');
    return token;
}

export const TokenLoader =()=>{
    return AuthToken();
}

export const CheckAuthToken=()=>{
    const token = AuthToken();

    if(!token){
        return redirect('/')
    }

    return null;
}