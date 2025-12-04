import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const API_URL = `${BACKEND_URL}/api/v1/users/`

// Validate Email
export function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i,
  )
}

// Register User
async function register(userData) {
  const response = await axios.post(`${API_URL}register`, userData)
  return response.data
}

// Login User
async function login(userData) {
  const response = await axios.post(`${API_URL}login`, userData)
  return response.data
}

// Logout User
async function logout() {
  const response = await axios.get(`${API_URL}logout`)
  return response.data.message
}

// Get User Profile
async function getUser() {
  const response = await axios.get(`${API_URL}getUser`)
  return response.data
}

// Get User Status
async function getLoginStatus() {
  const response = await axios.get(`${API_URL}loginStatus`)
  return response.data
}

// Update User Profile
async function updateUser(userData) {
  const response = await axios.patch(`${API_URL}updateUser`, userData)
  return response.data
}

// Send Verification Email
async function sendVerificationEmail() {
  const response = await axios.post(`${API_URL}sendVerificationEmail`)
  return response.data.message
}

// Verify User
async function verifyUser(verificationToken) {
  const response = await axios.patch(`${API_URL}verifyUser/${verificationToken}`)
  return response.data.message
}

// Change Password
async function changePassword(userData) {
  const response = await axios.patch(`${API_URL}changePassword`, userData)
  return response.data.message
}

// Forgot Password
async function forgotPassword(userData) {
  const response = await axios.post(`${API_URL}forgotPassword`, userData)
  return response.data.message
}

// Forgot Password
async function resetPassword(userData, resetToken) {
  const response = await axios.patch(`${API_URL}resetPassword/${resetToken}`, userData)
  return response.data.message
}

// Get Users
async function getUsers() {
  const response = await axios.get(`${API_URL}getUsers`)
  return response.data
}

// Delete User
async function deleteUser(id) {
  const response = await axios.delete(API_URL + id)
  return response.data.message
}

// Upgrade User
async function upgradeUser(userData) {
  const response = await axios.post(`${API_URL}upgradeUser`, userData)
  return response.data.message
}

// Send Login Code
async function sendLoginCode(email) {
  const response = await axios.post(`${API_URL}sendLoginCode/${email}`)
  return response.data.message
}

// Login With Code
async function loginWithCode(code, email) {
  const response = await axios.post(`${API_URL}loginWithCode/${email}`, code)
  return response.data
}

// Login With Google
async function loginWithGoogle(userToken) {
  const response = await axios.post(`${API_URL}google/callback`, userToken)
  return response.data
}

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
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
}

export default authService
