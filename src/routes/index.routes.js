import { Router } from "express"
import games from "./games.routes.js"
import clientRouter from "./clients.routes.js"
import rentals from "./rentals.routes.js"

const router = Router()

router.use(games)
router.use(clientRouter)
router.use(rentals)

export default router