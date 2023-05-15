import db from "../database/database.connection.js"

export async function getClients(req, res) {
    try {
        const answerString = await db.query(`SELECT * FROM customers;`)

        const answer = answerString.rows

        const formattedAnswer = answer.map(obj => ({
            ...obj,
            birthday: new Date(obj.birthday).toISOString().split('T')[0]
        }));

        return res.send(formattedAnswer)

    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export async function getClientById(req, res) {
    const { id } = req.params
    const numId = Number(id)

    try {
        const answerString = await db.query(`SELECT * FROM customers WHERE customers.id = ${numId};`)
        if (answerString.rowCount === 0) return res.sendStatus(404)

        const answer = answerString.rows

        const formattedAnswer = answer.map(obj => ({
            ...obj,
            birthday: new Date(obj.birthday).toISOString().split('T')[0]
        }));
        console.log(typeof (formattedAnswer))
        return res.send(formattedAnswer[0])
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
export async function postClient(req, res) {

    const { name, phone, cpf, birthday } = req.body
    try {
        const searchClient = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`)
        if (searchClient.rowCount !== 0) return res.sendStatus(409)
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}','${phone}','${cpf}','${birthday}');`)
        res.sendStatus(201)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
export async function updateClient(req, res) {
    try {
        const { name, phone, cpf, birthday } = req.body
        const searchCostumer = await db.query(`SELECT * FROM customers WHERE customers.cpf = '${cpf}'`)
        const nameSearch = searchCostumer.rows[0].name
        const withoutSpaceName = name.replace(/\s/g, "")

        if (nameSearch !== withoutSpaceName) return res.sendStatus(409)

        await db.query(`UPDATE customers SET name = '${name}', phone = '${phone}', birthday = '${birthday}' WHERE cpf = '${cpf}'`);

        res.sendStatus(200)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
