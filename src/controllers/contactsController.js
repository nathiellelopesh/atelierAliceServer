const { getAllContacts, postNewContact, getContactById, deleteContact } = require ("../models/contact");

const ContactsController = {
    AllContacts: async (req, res) => {
        try {
            const Contacts = await getAllContacts();
            res.status(200).json(Contacts)
            
        } catch (error) {
            console.error("Error:", error); 
            res.status(500).json({ error: "Erro ao buscar todos os contatos." });
        }
    },
    create: async (req, res) => {
        const {name, phone, message, image, delivery_date} = req.body
        try {
            const newContact = await postNewContact(name, phone, message, image, delivery_date);
            res.status(201).json(newContact);
        } catch (error) {
            res.status(500).json({ error: "Erro ao cadastrar novo contato"});
        }
    },
    ContactById: async (req, res) => {
        const {id} = req.params;
        try {
            const result = await getContactById(id);
            res.status(200).json(result)
        } catch (error) {
            console.error("Error:", error); 
            res.status(500).json({ error: "Erro ao buscar todos os contatos." });
        }
    },
    delete: async (req, res) => {
        const {id} = req.params;
        try {
            const result = await deleteContact(id)
            if (!result) {
                return res.status(404).json({ error: "Contato não encontrado." });
            }
            res.status(200).json({ message: "Contato excluído com sucesso!", result });
        } catch (error) {
            
        }
    }
}

module.exports = ContactsController
