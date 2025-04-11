"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsCreateZodSchema = void 0;
const zod_1 = require("zod");
const ContactUsCreateZodSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required").trim(),
    email: zod_1.z.string().email("Invalid email address").trim().toLowerCase(),
    contact: zod_1.z.string().min(1, "Contact is required").trim(),
    company: zod_1.z.string().optional(),
    whoAreYou: zod_1.z.string().trim().optional(),
    selectedDate: zod_1.z.string().optional(),
    selectedTime: zod_1.z.string().optional(),
    meetingAt: zod_1.z.date().optional(),
    timeZone: zod_1.z.string().trim().optional(),
});
exports.ContactUsCreateZodSchema = ContactUsCreateZodSchema;
