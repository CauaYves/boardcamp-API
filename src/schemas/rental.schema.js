import joi from "joi";

const rentalSchema = joi.object({
  rentDate: joi.date().iso().required(),    
  daysRented: joi.number().min(1).required(),             
  returnDate: joi.date().allow(null).required(),         
  originalPrice: joi.number().min(1).required(),
  delayFee: joi.date().allow(null).required()
})
export default rentalSchema