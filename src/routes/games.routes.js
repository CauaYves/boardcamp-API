import { Router } from "express";
import { validateSchema } from "../middlewares/ValidateSchema.middleware.js";
import { gameSchema } from "../schemas/game.schema.js";
import { getGames, postGames } from "../controllers/games.crontroller.js";

const gamesRouter = Router()


gamesRouter.get("/games", getGames)
gamesRouter.post("/games",validateSchema(gameSchema), postGames)

export default gamesRouter