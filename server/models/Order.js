const mongoose = require("mongoose");

// definir le model de commande avec les caracteristiques
const OrderSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true, unique: true },
        userId: { type: String, required: true },
        product: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
