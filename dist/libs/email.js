"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMeetingInvitation = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ejs_1 = __importDefault(require("ejs"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const send = async (templateName, data, mailOptions) => {
    const emailTemplatePath = path_1.default.join(process.cwd(), "src/templates", templateName);
    const template = fs_1.default.readFileSync(emailTemplatePath, "utf-8");
    const emailBody = ejs_1.default.render(template, {
        fullName: data.fullName,
        email: data.email,
        meetLink: "https://meet.google.com/gyh-ybpe-cbo",
    });
    mailOptions.html = emailBody;
    // default from field with custom name
    mailOptions.from =
        mailOptions.from || `"Mahi Soni" <${process.env.EMAIL_USER}>`;
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent to:", mailOptions.to);
    }
    catch (error) {
        console.error("Error sending mail:", error);
        throw error;
    }
};
const sendMeetingInvitation = async (data) => {
    try {
        const mailOptions = {
            to: data.email,
            subject: "Lets have a meet together",
            from: `RowX`,
        };
        await send("meeting_invitation.ejs", data, mailOptions);
    }
    catch (error) {
        console.error("Error sending mail:", error);
        throw error;
    }
};
exports.sendMeetingInvitation = sendMeetingInvitation;
