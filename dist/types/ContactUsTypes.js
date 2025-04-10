"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsCreateZodSchema = void 0;
const zod_1 = require("zod");
const ContactUsCreateZodSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z.string().optional(),
    whoAreYou: zod_1.z.enum([
        "Seed Level Startup",
        "Series Level Startup",
        "Enterprise",
    ]),
    meetingDate: zod_1.z.date().optional(),
    minValue: zod_1.z.number().optional(),
    maxValue: zod_1.z.number().optional(),
});
exports.ContactUsCreateZodSchema = ContactUsCreateZodSchema;
