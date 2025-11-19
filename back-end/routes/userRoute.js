import express from "express";
import {protect, adminOnly, authorOnly} from '../middleware/authMiddleware.js';
import {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers,
    loginStatus,
    upgradeUser,
    sendAutomatedEmail,
    sendVerificationEmail,
    verifyUser,
    forgotPassword,
    resetPassword,
    changePassword,
    sendLoginCode,
    loginWithCode,
    loginWithGoogle
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout', logoutUser);
router.get('/getUser', protect, getUser);
router.patch('/updateUser', protect, updateUser);

router.delete('/:id', protect, adminOnly, deleteUser);
router.get('/getUsers', protect, authorOnly, getUsers);
router.get('/loginStatus', protect, loginStatus);
router.post('/upgradeUser', protect, adminOnly, upgradeUser);
router.post('/sendAutomatedEmail', protect, sendAutomatedEmail);
router.post('/sendVerificationEmail', protect, sendVerificationEmail);
router.patch('/verifyUser/:verificationToken', verifyUser); // protect removed, user want to verify from phone.
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:resetToken', resetPassword);
router.patch('/changePassword', protect, changePassword);

router.post('/sendLoginCode/:email', sendLoginCode);
router.post('/loginWithCode/:email', loginWithCode);

router.post("/google/callback", loginWithGoogle);

export default router;