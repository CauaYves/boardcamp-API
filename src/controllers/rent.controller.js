import db from "../database/database.connection.js"
import { integerTimestamp, timestamp } from "../functions/timestamp.function.js"

export async function getRentals(req, res) {
    try {
        const allSearch = await db.query(`
            SELECT rentals.*, games.name AS game_name, customers.name AS customer_name, customers.phone, customers.cpf, customers.birthday
            FROM rentals
            JOIN games ON rentals."gameId" = games.id
            JOIN customers ON rentals."customerId" = customers.id;
        `)

        const { rows } = allSearch

        rows.map((rentals) => {
            delete rentals.phone
            delete rentals.birthday
            delete rentals.cpf

            let name = rentals.customer_name
            let gameName = rentals.game_name

            delete rentals.game_name
            delete rentals.customer_name

            rentals.game = {
                id: rentals.id,
                name: gameName
            }
            rentals.customer = {
                id: rentals.id,
                name
            }
        })

        res.send(rows)
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
        const rentals = await db.query(`SELECT * FROM rentals`)

        const rentDays = answer.rows[0].pricePerDay * daysRented
        const stock = answer.rows[0].stockTotal
        console.log(answer.rows)
        if (stock <= rentals.rows.length) return res.sendStatus(400)

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
export async function postFinalByIdRentals(req, res) {
    try {
        const { id } = req.params
        await db.query(`UPDATE rentals SET "returnDate" = (CURRENT_DATE) WHERE id = ${id}`)
        const rentals = await db.query(`SELECT * FROM rentals WHERE id = ${id} `)
        if(rentals.rowCount === 0) return res.sendStatus(404)

        const {rentDate, daysRented, returnDate, gameId} = rentals.rows[0]

        const game = await db.query(`SELECT * FROM games WHERE id = ${gameId}`)

        const {pricePerDay} = game.rows[0]
                
        const daysRentedStamp = integerTimestamp(daysRented)        
        const returnDateStamp = timestamp(returnDate)
        const rentDateStamp = timestamp(rentDate)

        const delayDays = daysRentedStamp + rentDateStamp
        const delayFee = Math.floor((returnDateStamp - delayDays) / (1000 * 60 * 60 * 24));
        const priceTotal = delayFee * pricePerDay
        await db.query(`UPDATE rentals set "delayFee" = ${priceTotal} WHERE id = ${id}`)

        res.sendStatus(200)
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
const RENTALSSS = {
    "id": 1,
    "customerId": 1,
    "gameId": 1,
    "rentDate": "2023-05-13T03:00:00.000Z",
    "daysRented": 3,
    "returnDate": null,
    "originalPrice": 4500,
    "delayFee": null
}