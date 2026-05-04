const express = require("express");
const router = express.Router();

const { obtenerProductos, crearProducto } = require("../controllers/productoController");
const { estaAutenticado } = require("../middlewares/authMiddleware");
const upload = require("../config/multer");

const { body } = require("express-validator");

router.get("/productos", estaAutenticado, obtenerProductos);
router.post("/productos", estaAutenticado, upload.single("imagen"), crearProducto);
router.get("/crear", estaAutenticado, (req, res) => {
    res.render("crear");
});

// Listar
router.get("/productos", obtenerProductos);

// Crear
router.post(
    "/productos",
    upload.single("imagen"),
    [
        body("nombre")
            .notEmpty().withMessage("El nombre es obligatorio"),

        body("precio")
            .isNumeric().withMessage("El precio debe ser un número")
            .custom(value => value > 0).withMessage("El precio debe ser mayor a 0"),

        body("descripcion")
            .notEmpty().withMessage("La descripción es obligatoria")
    ],
    crearProducto
);

router.get("/crear", (req, res) => {
    res.render("crear");
});

module.exports = router;