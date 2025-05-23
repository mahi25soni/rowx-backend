import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import ejs from "ejs";

dotenv.config();

// console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
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
  mailOptions.from = mailOptions.from || `"RowX" <${process.env.EMAIL_USER}>`;

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
    // Send email to user
    const mailOptions = {
      to: data.email,
      subject: "Lets have a meet together",
    };
    await send("meeting_invitation.ejs", data, mailOptions);

    // Notify RowX team
    const mailOptionsRowX = {
      to: "hello@rowx.in",
      subject: `New meeting request from ${data.fullName} on ${data?.selectedDate} at ${data?.selectedTime}`,
    };
    await send("notify_meeting_rowx.ejs", data, mailOptionsRowX);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
};

export { sendMeetingInvitation };
