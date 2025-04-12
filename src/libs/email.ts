import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import ejs from "ejs";

dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.in",
  port: 587,
  secure: false, // use TLS (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const send = async (
  templateName: string,
  data: any,
  mailOptions: {
    to: string;
    subject: string;
    from?: string;
    html?: string;
  }
) => {
  const emailTemplatePath = path.join(
    process.cwd(),
    "src/templates",
    templateName
  );
  const template = fs.readFileSync(emailTemplatePath, "utf-8");
  const emailBody = ejs.render(template, {
    fullName: data.fullName,
    email: data.email,
    meetLink: "https://meet.google.com/gyh-ybpe-cbo",
    date: data.selectedDate,
    time: data.selectedTime,
  });
  mailOptions.html = emailBody;

  // default from field with custom name
  mailOptions.from =
    mailOptions.from || `"Mahi Soni" <${process.env.EMAIL_USER}>`;

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", mailOptions.to);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
};

const sendMeetingInvitation = async (data: any) => {
  try {
    const mailOptions = {
      to: data.email,
      subject: "Lets have a meet together",
      from: `RowX`,
    };
    await send("meeting_invitation.ejs", data, mailOptions);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
};

export { sendMeetingInvitation };
