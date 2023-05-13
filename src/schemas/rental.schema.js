import joi from "joi";

export const rentalSchema = joi.object({
  rentDate: joi.date().iso().required(),
  daysRented: joi.number().min(1).required(),
  returnDate: joi.date().allow(null).required(),
  originalPrice: joi.number().min(1).required(),
  delayFee: joi.date().allow(null).required()
})

export const idsRentalSchema = joi.object({
  daysRented: joi.number().min(1).required(),
  customerId: joi.number().min(1).required(),
  gameId: joi.number().min(1).required()
})

