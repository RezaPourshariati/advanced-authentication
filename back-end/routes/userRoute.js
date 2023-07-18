const express = require("express");
const {protect, adminOnly, authorOnly} = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers
} = require("../controllers/userController");
const router = express.Router();


router.post("/register", registerUser);
router.get("/login", loginUser);
router.get('/logout', logoutUser);
router.get('/getUser', protect, getUser);
router.patch('/updateUser', protect, updateUser);

router.delete('/:id', protect, adminOnly, deleteUser);
router.get('/getUsers', protect, authorOnly, getUsers);


module.exports = router;