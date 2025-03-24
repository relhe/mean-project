const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Créer une nouvelle commande
 *     description: Enregistre une nouvelle commande dans la base de données avec toutes les informations nécessaires.
 *     tags:
 *       - Commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - userId
 *               - product
 *               - quantity
 *               - price
 *               - discount
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "12345"
 *               userId:
 *                 type: string
 *                 example: "12345"
 *               product:
 *                 type: string
 *                 example: "Laptop"
 *               quantity:
 *                 type: number
 *                 example: 5
 *               price:
 *                 type: number
 *                 example: 100
 *               discount:
 *                 type: number
 *                 example: 15
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       400:
 *         description: Erreur dans la requête
 */
router.post("/", async (req, res) => {
    try {
        const { orderId, userId, product, quantity, price, discount } =
            req.body;

        const newOrder = new Order({
            orderId,
            userId,
            product,
            quantity,
            price,
            discount,
        });

        await newOrder.save();
        res.status(201).json({ message: "Commande créée avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Récupérer toutes les commandes (GET /order)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer une commande par ID (GET /order/:id)
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour une commande (PUT /order/:id)
router.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer une commande (DELETE /order/:id)
router.delete("/:id", async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(200).json({ message: "Commande supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
