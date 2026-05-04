const express = require("express");
const router = express.Router();

const {
    mostrarLogin,
    login,
    logout,
    registrar
} = require("../controllers/authController");

router.get("/login", mostrarLogin);
router.post("/login", login);

router.get("/registro", (req, res) => res.render("registro"));
router.post("/registro", registrar);

router.get("/logout", logout);

module.exports = router;