import db from "../database/database.connection.js"

export function getRentals(req, res) {
    try {

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}









export async function postRentals(req, res) {

    const { customerId, gameId, daysRented } = req.body
    const today = new Date()
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    try {

        const answer = await db.query(`SELECT * FROM games WHERE id = ${gameId};`)
        const rentDays = answer.rows[0].pricePerDay * daysRented

        const query = `
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);
        `
        const insertValues = [customerId, gameId, formattedDate, daysRented, null, rentDays, null]

        await db.query(query, insertValues)

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