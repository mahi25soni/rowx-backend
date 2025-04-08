import { NextFunction, Request, Response } from "express";
import ContactUsService from "../services/ContactUsService";
import { sendSuccessReponse } from "../middlewares/ApiAndException";

class ContactUsController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ContactUsService.create(req.body);
      sendSuccessReponse(res, data, "Contact Us message sent successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new ContactUsController();
