import { Router } from "express";
import { getClients, postClient } from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/ValidateSchema.middleware.js";
import { gameSchema } from "../schemas/game.schema.js";

const gamesRouter = Router()


gamesRouter.get("/games", getClients)
gamesRouter.post("/games",validateSchema(gameSchema), postClient)

export default gamesRouter