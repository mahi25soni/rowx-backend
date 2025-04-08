import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const sendSuccessReponse = (res: Response, data: any, message: string) => {
  return res.status(200).json({
    statusCode: 200,
    message: message || "Success",
    data: data,
    success: true,
  });
};

export { sendSuccessReponse };
