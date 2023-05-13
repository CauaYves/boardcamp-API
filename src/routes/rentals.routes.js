import { Router } from "express";
import { deleteRental, getRentals, postFinalByIdRentals, postRentals } from "../controllers/rent.controller.js";
import { validateSchema } from "../middlewares/ValidateSchema.middleware.js";
import rentalSchema from "../schemas/rental.schema.js";

const rentals = Router()

rentals.get("/rentals", getRentals)
rentals.post("/rentals", validateSchema(rentalSchema), postRentals)
rentals.post("/rentals/:id/return", validateSchema(rentalSchema), postFinalByIdRentals)
rentals.delete("/rentals/:id", validateSchema(rentalSchema), deleteRental)

export default rentals