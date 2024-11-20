const { Router } = require("express");
const productsController = require("./controllers/productsController");
const ContactsController = require("./controllers/contactsController");

const router = Router()

router.get("/", productsController.index);
router.get("/:id", productsController.show);
router.post("/admin/createProduct", productsController.create);
router.put("/admin/updateProduct/:id", productsController.update);
router.delete("/admin/updateProduct/:id", productsController.delete);

router.get("/admin/contact", ContactsController.AllContacts);
router.get("/admin/contact/:id", ContactsController.ContactById);
router.post('/', ContactsController.create);
router.delete("/admin/contact/:id", ContactsController.delete);

module.exports = router

