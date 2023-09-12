
import axios from 'axios';
import { authHeader } from './AuthHeader';

const API_URL = 'https://localhost:7056/api/Login/';


const getPublicContent =()=> {
    return axios.get(API_URL + 'all');
  };

const  getUserBoard =()=> {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  };

const getModeratorBoard =()=> {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  };

const getAdminBoard =()=> {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
};

// Object that encapsulates authentication header functions
const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard
};

export default UserService;