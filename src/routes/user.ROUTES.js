import { Router } from "express";
import authValidation from "../middlewares/authValidation.MIDDLEWARE.js";
import validateBody from "../middlewares/validateBody.MIDDLEWARE.js";
import signinSchema from "../models/signIn.SCHEMA.js";
import signupSchema from "../models/signUp.SCHEMA.js";


const router = Router()

router.post("/signup", validateBody(signupSchema), validateEmailExitence, registerUser)
router.post("/signin", validateBody(signinSchema), validateUserExistence, sendToken)
router.get("/ranking", sendRank)

router.use(authValidation)

router.get("/users/me", sendMyInfo)


export default router