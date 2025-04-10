"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactUsController_1 = __importDefault(require("../controllers/ContactUsController"));
const ContactUsRouter = (0, express_1.Router)();
ContactUsRouter.post("/create", ContactUsController_1.default.create);
exports.default = ContactUsRouter;
