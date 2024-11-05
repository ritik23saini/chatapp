import express from "express";
import { createUser, loginUser, logoutUser, sendMesage } from "../controller/controller.js"
const router = express.Router();

router.route('/register')
    .post(createUser)

router.route('/login')
    .post(loginUser)
router.route('/logout')
    .post(logoutUser)
router.route('/send').post(sendMesage)

export default router;