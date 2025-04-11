import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
export default ContactUs;
