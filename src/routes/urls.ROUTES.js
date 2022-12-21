import { Router } from "express";
import urlShortenSchema from "../models/urlShorten.SCHEMA.js";

import { storageSendShorts, sendSpecificUrl, redirectUser, deleteUrl } from "../controllers/urls.CONTROLLERS.js";
import { validateUrlExistence, validateShortUrlExistence, validateUrlOwner} from "../middlewares/urls.MIDDLEWARES.js";

import validateBody from "../middlewares/validateBody.MIDDLEWARE.js";
import authValidation from "../middlewares/authValidation.MIDDLEWARE.js";

const router = Router()

router.get("/urls/:id", validateUrlExistence ,sendSpecificUrl)
router.get("/urls/open/:shortUrl", validateShortUrlExistence, redirectUser)

router.use(authValidation)

router.post("/urls/shorten", validateBody(urlShortenSchema), storageSendShorts)
router.delete("/urls/:id", validateUrlExistence, validateUrlOwner, deleteUrl)

export default router