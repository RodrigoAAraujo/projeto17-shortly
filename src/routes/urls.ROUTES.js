import { Router } from "express";
import urlShortenSchema from "../models/urlShorten.SCHEMA.js";

import { storageSendShorts } from "../controllers/urls.CONTROLLERS.js";

import validateBody from "../middlewares/validateBody.MIDDLEWARE.js";
import authValidation from "../middlewares/authValidation.MIDDLEWARE.js";

const router = Router()

//router.get("/urls/:id", validateUrlExistence ,sendSpecificUrl)
//router.get("/urls/open/:shortUrl", validateShortUrlExistence, redirectUser)

router.use(authValidation)

router.post("/urls/shorten", validateBody(urlShortenSchema), storageSendShorts)
//router.delete("/urls/:id", validateUrlOwner, sendDeleteConfirmation)

export default router