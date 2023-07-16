const express = require("express");
const {protect, adminOnly} = require('../middleware/authMiddleware');
const {registerUser, loginUser, logoutUser, getUser, updateUser, deleteUser} = require("../controllers/userController");
const router = express.Router();


router.post("/register", registerUser);
router.get("/login", loginUser);
router.get('/logout', logoutUser);
router.get('/getUser', protect, getUser);
router.patch('/updateUser', protect, updateUser);

router.delete('/:id', protect, adminOnly, deleteUser);


module.exports = router;