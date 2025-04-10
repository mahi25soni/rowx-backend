"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContactUsService_1 = __importDefault(require("../services/ContactUsService"));
const ApiAndException_1 = require("../middlewares/ApiAndException");
class ContactUsController {
    async create(req, res, next) {
        try {
            const data = await ContactUsService_1.default.create(req.body);
            (0, ApiAndException_1.sendSuccessReponse)(res, data, "Contact Us message sent successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new ContactUsController();
