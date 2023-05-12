import { db } from "../database/database.connection.js"
// { formato de um cliente
//     id: 1,
//     name: 'João Alfredo',
//     phone: '21998899222',
//     cpf: '01234567890',
//     birthday: '1992-10-25'
// }

export async function getClients(req, res) {
    try {
        const answer = console.table((await db.query(`SELECT * FROM customers;`)).rows)
        return res.send(answer)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export async function getClientById(req, res) {
    const { id } = req.params
    const numId = Number(id)

    try {
        const answer = console.table((await db.query(`SELECT * FROM customers WHERE customers.id = ${numId};`)))
        if(!answer) return res.sendStatus(404)

        return res.send(answer)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
export async function postClient(req, res) {

    const { name, phone, cpf, birthday } = req.body
    try {
        const answer = await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}','${phone}','${cpf}','${birthday}');`)
        res.send(answer)
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
