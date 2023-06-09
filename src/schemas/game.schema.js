import joi from "joi"

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().min(1).required(),
    pricePerDay: joi.number().min(1).required()
})
// {
//     name: 'Banco Imobiliário',
//     image: 'http://www.imagem.com.br/banco_imobiliario.jpg',
//     stockTotal: 3,
//     pricePerDay: 1500
//   }