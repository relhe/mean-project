require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Ajouter un Swagger pour tester les endpoints depuis le navigateur
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
    .connect(mongoURI)
    .then(() => console.log("Serveur est connectée à MongoDB"))
    .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Routes
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

// Configuration du Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Utilisateurs",
            version: "1.0.0",
            description: "Une API Express pour gérer des utilisateurs",
        },
        servers: [{ url: "http://localhost:5001" }],
    },
    apis: ["./routes/userRoutes.js", "./routes/orderRoutes.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Lancement du serveur nodejs
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
);
