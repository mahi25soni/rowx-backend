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
    phone: {
      type: String,
      trim: true,
    },
    whoAreYou: {
      type: String,
      trim: true,
      enum: ["Seed Level Startup", "Series Level Startup", "Enterprise"],
    },
    meetingDate: {
      type: Date,
    },
    minValue: {
      type: Number,
    },
    maxValue: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
export default ContactUs;
