import { Router } from "express";
import ContactUsController from "../controllers/ContactUsController";
const ContactUsRouter = Router();

ContactUsRouter.post("/create", ContactUsController.create);

export default ContactUsRouter;
