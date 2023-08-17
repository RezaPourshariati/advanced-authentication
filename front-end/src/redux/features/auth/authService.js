import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/users/`;

// Validate Email
export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData);
    return response.data;
};

// Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    return response.data;
};

// Logout User
const logout = async () => {
    const response = await axios.get(API_URL + "logout");
    return response.data.message;
};

const getUser = async () => {
    const response = await axios.get(API_URL + "getUser");
    return response.data;
};

const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "loginStatus");
    return response.data;
};


const authService = {
    register,
    login,
    logout,
    getUser,
    getLoginStatus
};

export default authService;