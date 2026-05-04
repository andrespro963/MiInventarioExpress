require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const session = require("express-session");

app.use(session({
    secret: process.env.SESSION_SECRET || "secreto",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
const productoRoutes = require("./routes/productoRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use(authRoutes);
app.use(productoRoutes);
app.use(chatRoutes);

io.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("mensaje", (data) => {
        io.emit("mensaje", data);
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});