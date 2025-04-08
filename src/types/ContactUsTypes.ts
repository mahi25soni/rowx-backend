import { z } from "zod";

const ContactUsCreateZodSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  whoAreYou: z.enum([
    "Seed Level Startup",
    "Series Level Startup",
    "Enterprise",
  ]),
  meetingDate: z.date().optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
});

export { ContactUsCreateZodSchema };
