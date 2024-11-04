//router.js
const { Router } = require("express");
const productsController = require("./controllers/productsController")

const router = Router()

router.get("/", productsController.index);
router.get("/:id", productsController.show);
router.post("/admin/createProduct", productsController.create);
router.put("/admin/updateProduct/:id", productsController.update);
router.delete("/admin/updateProduct/:id", productsController.delete);

module.exports = router

