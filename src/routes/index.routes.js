import { Router } from "express"
import games from "./games.routes.js"



const router = Router()
router.use(games)

export default router