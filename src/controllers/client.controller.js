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
    const { name, phone, cpf, birthday } = req.body;
    const id = req.params.id;

    const searchClient = `SELECT * FROM customers WHERE id = $1 LIMIT 1;`;
    const searchCpf = `SELECT * FROM customers WHERE cpf = $1 AND id <> $2;`;
    const updateClient = `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`;

    try {
        const { rows } = await db.query(searchClient, [id]);
        if (!rows.length) return res.sendStatus(404);

        const { rows: other } = await db.query(searchCpf, [cpf, id]);
        if (other.length > 0) return res.sendStatus(409);

        await db.query(updateClient, [name, phone, cpf, new Date(birthday).toISOString().split('T')[0], id]);

        return res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message)
    }
}
