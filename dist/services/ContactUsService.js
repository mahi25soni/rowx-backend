"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContactUsModel_1 = __importDefault(require("../models/ContactUsModel"));
const email_1 = require("../libs/email");
const ContactUsTypes_1 = require("../types/ContactUsTypes");
const zodHandling_1 = require("../libs/zodHandling");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class ContactUsService {
    async create(data) {
        try {
            const result = ContactUsTypes_1.ContactUsCreateZodSchema.safeParse(data);
            if (!result.success) {
                const message = (0, zodHandling_1.formatZodError)(result.error.errors);
                throw new Error(message);
            }
            const { selectedDate, selectedTime, timeZone } = data;
            const dateTimeString = `${selectedDate} ${selectedTime}`;
            const isoDateTime = moment_timezone_1.default
                .tz(dateTimeString, "DD-MM-YYYY hh:mm A", timeZone)
                .toISOString();
            const updatedData = { ...data, meetingAt: isoDateTime };
            const nData = await ContactUsModel_1.default.create(updatedData);
            if (!nData) {
                throw new Error("Failed to create contact us entry");
            }
            (0, email_1.sendMeetingInvitation)(nData);
            return updatedData;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new ContactUsService();
