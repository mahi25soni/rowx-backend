import { z } from "zod";

const ContactUsCreateZodSchema = z.object({
  fullName: z.string().min(1, "Full name is required").trim(),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  contact: z.string().min(1, "Contact is required").trim(),
  company: z.string().optional(),
  whoAreYou: z.string().trim().optional(),
  selectedDate: z.string().optional(),
  selectedTime: z.string().optional(),
  meetingAt: z.date().optional(),
  timeZone: z.string().trim().optional(),
});

export { ContactUsCreateZodSchema };
