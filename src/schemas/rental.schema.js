import joi from "joi";

export const idsRentalSchema = joi.object({
  daysRented: joi.number().min(1).required(),
  customerId: joi.number().min(1).required(),
  gameId: joi.number().min(1).required()
})

