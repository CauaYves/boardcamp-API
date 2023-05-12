import { Router } from "express"
import games from "./games.routes.js"
import clientRouter from "./clients.routes.js"



const router = Router()
router.use(games)
router.use(clientRouter)

export default router