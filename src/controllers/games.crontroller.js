import db from "../database/database.connection.js"

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games`)
        res.send(games.rows)
    }
    catch (error) {
        res.status(500).send(err.message)
    }
}

export async function postGames(req, res) {
    try {
        const {name, image, stockTotal, pricePerDay} = req.body

        const searchGame = await db.query(`SELECT * FROM games WHERE name = '${name}'`)
        if(searchGame.rowCount !== 0) return res.sendStatus(409)

        const insertQuery = `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`
        const insertValues = [name, image, stockTotal, pricePerDay]

        await db.query(insertQuery, insertValues)

        res.sendStatus(201)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
