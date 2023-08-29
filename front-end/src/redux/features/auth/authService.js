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

// Get User Profile
const getUser = async () => {
    const response = await axios.get(API_URL + "getUser");
    return response.data;
};

// Get User Status
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "loginStatus");
    return response.data;
};

// Update User Profile
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "updateUser", userData);
    return response.data;
};

// Send Verification Email
const sendVerificationEmail = async () => {
    const response = await axios.post(API_URL + "sendVerificationEmail");
    return response.data.message;
};

// Verify User
const verifyUser = async (verificationToken) => {
    const response = await axios.patch(`${API_URL}verifyUser/${verificationToken}`);
    return response.data.message;
};

// Change Password
const changePassword = async (userData) => {
    const response = await axios.patch(API_URL + "changePassword", userData);
    return response.data.message;
};

// Forgot Password
const forgotPassword = async (userData) => {
    const response = await axios.post(API_URL + "forgotPassword", userData);
    return response.data.message;
};


const authService = {
    register,
    login,
    logout,
    getUser,
    getLoginStatus,
    updateUser,
    sendVerificationEmail,
    verifyUser,
    changePassword,
    forgotPassword
};

export default authService;