import db from "../database/database.connection.js"

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


// SELECT *
//         FROM customers
//         JOIN rentals ON customers.id = rentals."customerId"
//         JOIN games ON rentals."gameId" = games.id;

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
        const games = await db.query(`SELECT * FROM games WHERE ${gameId} = id`)
        const stock = games.rows[0].stockTotal

        if (stock < 1) return res.sendStatus(400)

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