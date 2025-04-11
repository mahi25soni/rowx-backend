"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./libs/dbConnect"));
const cors_1 = __importDefault(require("cors"));
const mainRouter_1 = __importDefault(require("./routes/mainRouter"));
// import { errorHandler } from "./middlewares/ApiAndException";
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["https://rowx.in", "http://localhost:5173"],
    credentials: true, // if you're using cookies or sessions
}));
app.use("/api", mainRouter_1.default);
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${req.method} ${req.url} -`, err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        statusCode,
        message,
        success: false,
        data: null,
    });
});
app.listen(PORT, () => {
    (0, dbConnect_1.default)();
    console.log(`Server is running on port ${process.env.PORT}`);
});
