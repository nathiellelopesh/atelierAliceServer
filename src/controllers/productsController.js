const {getAllProducts, postNewProduct, getProductById, updateProduct, deleteProduct} = require ("../models/product");

const productsController = {
    index: async (req, res) => {
        try {
            const Products = await getAllProducts();
            res.status(200).json(Products)
            
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar produtos." });
        }
    },
    show: async (req,res) => {
        const { id } = req.params;
        try {
            const product = await getProductById(id);
            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado." });
            }
            res.status(200).json(product)
            
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar produto." });
        }
    },
    create: async (req,res) => {
        const { title, description, price, images, size, is_promotion } = req.body;
        try {
            const newProduct = await postNewProduct(title, description, price, images, size, is_promotion);
            res.status(201).json(newProduct);
        } catch (error) {
            console.log("Erro ao criar produto controller.", error)
            res.status(500).json({ error: "Erro ao criar produto controller."});
        }
    },
    update: async (req, res) => {
        // não pode ser productId e sim somente "id" para reconhecer q é o id da url
        const { id } = req.params;
        const { title, description, price, images, size, is_promotion, is_sold } = req.body;
        try {
            const product = await updateProduct(id, title, description, price, images, size, is_promotion, is_sold)
            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado." });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar produto."});
        }
    },
    delete: async (req,res) => {
        const { id } = req.params;
        try {
            const product = await deleteProduct(id)
            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado." });
            }
            res.status(200).json({ message: "Produto excluído com sucesso!", product });
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            res.status(500).json({error: "Erro ao excluir produto"})
        }
    }
}

module.exports = productsController

