import { Router } from "express";
import { deleteRental, getRentals, postFinalByIdRentals, postRentals } from "../controllers/rent.controller.js";
import { validateSchema } from "../middlewares/ValidateSchema.middleware.js";
import { idsRentalSchema } from "../schemas/rental.schema.js";

const rentals = Router()

rentals.get("/rentals", getRentals)
rentals.post("/rentals", validateSchema(idsRentalSchema), postRentals)
rentals.post("/rentals/:id/return", postFinalByIdRentals)
rentals.delete("/rentals/:id", deleteRental)

export default rentals