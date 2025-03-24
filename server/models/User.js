const mongoose = require("mongoose");

// definir le model d'utilisateur avec les caracteristiques
const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        birthday: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
