const express = require("express");
const router = express.Router();
const { estaAutenticado } = require("../middlewares/authMiddleware");

router.get("/chat", estaAutenticado, (req, res) => {
    res.render("chat", {
        usuario: req.session.usuario
    });
});

module.exports = router;