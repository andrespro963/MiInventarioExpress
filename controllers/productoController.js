const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

// Crear producto
exports.crearProducto = async (req, res) => {
    try {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.render("crear", {
                errores: errores.array(),
                datos: req.body
            });
        }

        const { nombre, precio, descripcion } = req.body;

        const nuevoProducto = new Producto({
            nombre,
            precio,
            descripcion,
            imagen: req.file ? req.file.filename : null
        });

        await nuevoProducto.save();

        res.redirect("/productos");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear producto");
    }
};

// Listar productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find().sort({ fecha: -1 }).lean();

        res.render("productos", { productos });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener productos");
    }
};