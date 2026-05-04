const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String // aquí guardaremos el nombre del archivo
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Producto", productoSchema);