import { Router } from "express"
import { getClientById, getClients, postClient, updateClient } from "../controllers/client.controller.js"
import { validateSchema } from "../middlewares/ValidateSchema.middleware.js"
import { clientSchema } from "../schemas/client.schema.js"

const clientRouter = Router()

clientRouter.get("/customers", getClients)
clientRouter.get("/customers/:id", getClientById)
clientRouter.post("/customers", validateSchema(clientSchema), postClient)
clientRouter.put("/customers/:id", validateSchema(clientSchema), updateClient)

export default clientRouter