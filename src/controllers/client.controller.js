import db from "../database/database.connection.js"
// {
//     id: 1,
//     name: 'João Alfredo',
//     phone: '21998899222',
//     cpf: '01234567890',
//     birthday: '1992-10-25'
// }

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
        if(answerString.rowCount === 0) return res.sendStatus(404)

        const answer = answerString.rows

        const formattedAnswer = answer.map(obj => ({
            ...obj,
            birthday: new Date(obj.birthday).toISOString().split('T')[0]
          }));
          console.log(typeof(formattedAnswer))
        return res.send(formattedAnswer)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
export async function postClient(req, res) {

    const { name, phone, cpf, birthday } = req.body
    try {
        const searchClient = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`)
        if(searchClient.rowCount !== 0) return res.sendStatus(409)
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}','${phone}','${cpf}','${birthday}');`)
        res.sendStatus(201)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
export function updateClient(req, res) {
    try {

    }
    catch (error) {
        res.status(500).send(err.message)
    }
}
