import { Router } from "express";
import ContactUsRouter from "./ContactUsRoutes";
const router = Router();

router.use("/contact-us", ContactUsRouter);

export default router;
