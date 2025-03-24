const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const saltRounds = 10;

// Créer un utilisateur (POST /user)
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Enregistre un nouvel utilisateur dans la base de données avec toutes les informations nécessaires.
 *     tags:
 *       - Utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - gender
 *               - birthday
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Alice"
 *               lastName:
 *                 type: string
 *                 example: "Dupont"
 *               gender:
 *                 type: string
 *                 example: "F"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1995-06-15"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "alice@example.com"
 *               phone:
 *                 type: string
 *                 example: "5141234567"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur dans la requête
 */
router.post("/", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            gender,
            birthday,
            email,
            phone,
            password,
        } = req.body;

        // Always hash the password before saving
        // Ne pas sauvegarder le mot de passe en clair
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            gender,
            birthday,
            email,
            phone,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Récupérer tous les utilisateurs (GET /user)
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Retourne la liste complète des utilisateurs enregistrés dans la base de données.
 *     tags:
 *       - Utilisateur
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        // remove password from response
        users.forEach((user) => {
            user.password = undefined;
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer un utilisateur par ID (GET /user/:id)
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     description: Retourne un utilisateur spécifique selon son ID.
 *     tags:
 *       - Utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        // remove password from response
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un utilisateur (PUT /user/:id)
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     description: Met à jour les informations d’un utilisateur selon son ID.
 *     tags:
 *       - Utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               gender:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser)
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        // remove password from response
        updatedUser.password = undefined;
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un utilisateur (DELETE /user/:id)
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur de la base de données selon son ID.
 *     tags:
 *       - Utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
