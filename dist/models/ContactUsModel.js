"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactUsSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },
    contact: {
        type: String,
        trim: true,
        required: true,
    },
    company: {
        type: String,
    },
    whoAreYou: {
        type: String,
        trim: true,
    },
    selectedDate: {
        type: String,
    },
    selectedTime: {
        type: String,
    },
    meetingAt: {
        type: Date,
    },
    timeZone: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
const ContactUs = mongoose_1.default.model("ContactUs", contactUsSchema);
exports.default = ContactUs;
