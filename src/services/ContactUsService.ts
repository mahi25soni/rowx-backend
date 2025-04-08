import ContactUs from "../models/ContactUsModel";
import { sendMeetingInvitation } from "../libs/email";
import { ContactUsCreateZodSchema } from "../types/ContactUsTypes";
import { formatZodError } from "../libs/zodHandling";

class ContactUsService {
  public async create(data: any) {
    try {
      const result = ContactUsCreateZodSchema.safeParse(data);
      if (!result.success) {
        const message = formatZodError(result.error.errors);
        throw new Error(message);
      }
      const nData = await ContactUs.create(data);

      if (!nData) {
        throw new Error("Failed to create contact us entry");
      }

      sendMeetingInvitation(data);
      return nData;
    } catch (error) {
      throw error;
    }
  }
}

export default new ContactUsService();
