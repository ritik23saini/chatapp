import express from "express";
import { createUser, loginUser, logoutUser, sendMesage, getAllUser } from "../controller/controller.js"
const router = express.Router();

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.post('/send/:id', sendMesage)

router.get('/getAllUsers/:id', getAllUser)
export default router;