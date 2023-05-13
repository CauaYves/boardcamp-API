import db from "../database/database.connection.js"

export function getRentals(req, res) {
    try {

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}









export function postRentals(req, res) {

    const { customerId, gameId, daysRented } = req.body

    try {

        

        res.sendStatus(201)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}














export function postFinalByIdRentals(req, res) {
    try {

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
export function deleteRental(req, res) {
    try {

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}