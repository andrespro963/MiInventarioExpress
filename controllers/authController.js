const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

// Mostrar login
exports.mostrarLogin = (req, res) => {
    res.render("login");
};

// Registrar usuario (opcional para pruebas)
exports.registrar = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            email,
            password: hash
        });

        await nuevoUsuario.save();

        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.send("Error al registrar usuario");
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.render("login", { error: "Usuario no existe" });
        }

        const esValido = await bcrypt.compare(password, usuario.password);

        if (!esValido) {
            return res.render("login", { error: "Contraseña incorrecta" });
        }

        // Crear sesión
        req.session.usuario = {
            id: usuario._id,
            email: usuario.email
        };

        res.redirect("/chat");
    } catch (error) {
        console.error(error);
        res.send("Error en login");
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};