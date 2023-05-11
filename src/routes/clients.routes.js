import { Router } from "express"
import { getClientById, getClients, postClient, updateClient } from "../controllers/client.controller"
import { validateSchema } from "../middlewares/ValidateSchema.middleware"
import { clientSchema } from "../schemas/client.schema"

const clientRouter = Router()

clientRouter.get("/customers", getClients)
clientRouter.get("/customers/:id", getClientById)
clientRouter.post("customers", validateSchema(clientSchema), postClient)
clientRouter.post("customers/:id", validateSchema(clientSchema), updateClient)