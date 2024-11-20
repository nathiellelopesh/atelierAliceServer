const {query} = require("../database/pool")

async function getAllContacts() {
    try {
        const result = await query(`SELECT * FROM contact;`);
        console.log("Database result:", result);
        return result.rows;
    } catch (error) {
        console.error("Não foi possível coletar todos os contatos:", error);
        throw error;
    }
}

async function postNewContact(name, phone, message, image, delivery_date) {
    try {
        await query(`
            INSERT INTO contact
            (name, phone, message, image, delivery_date)
            VALUES ($1, $2, $3, $4, $5);`,
            [name, phone, message, image, delivery_date]
        )
        console.log("Novo contato cadastrado para: ", name);
    } catch (error) {
        throw new Error("Não foi possível cadastrar novo contato");
    } 
}

async function getContactById(id) {
    try {
        const result = await query(`SELECT * FROM contact WHERE id = $1;`, [id])
        console.log("Database result:", result);
        return result.rows[0];
    } catch (error) {
        throw new Error("Não foi possível buscar contato");
    }
}

async function deleteContact(id) {
    try {
        const result = await query(`DELETE FROM contact WHERE id=$1 RETURNING *;`, [id])
        console.log("Contato excluido com sucesso!")
        return result.rows[0];
    } catch (error) {
        throw new Error("Não foi possível buscar contato");
    }
    
}

module.exports = { getAllContacts, postNewContact, getContactById, deleteContact }