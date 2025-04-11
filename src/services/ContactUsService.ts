import ContactUs from "../models/ContactUsModel";
import { sendMeetingInvitation } from "../libs/email";
import { ContactUsCreateZodSchema } from "../types/ContactUsTypes";
import { formatZodError } from "../libs/zodHandling";
import moment from "moment-timezone";

class ContactUsService {
  public async create(data: any) {
    try {
      const result = ContactUsCreateZodSchema.safeParse(data);
      if (!result.success) {
        const message = formatZodError(result.error.errors);
        throw new Error(message);
      }
      const { selectedDate, selectedTime, timeZone } = data;

      const dateTimeString = `${selectedDate} ${selectedTime}`;
      const isoDateTime = moment
        .tz(dateTimeString, "DD-MM-YYYY hh:mm A", timeZone)
        .toISOString();

      const updatedData = { ...data, meetingAt: isoDateTime };

      const nData = await ContactUs.create(updatedData);

      if (!nData) {
        throw new Error("Failed to create contact us entry");
      }

      sendMeetingInvitation(nData);
      return updatedData;
    } catch (error) {
      throw error;
    }
  }
}

export default new ContactUsService();
