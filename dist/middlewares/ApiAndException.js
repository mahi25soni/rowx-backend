"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessReponse = void 0;
const sendSuccessReponse = (res, data, message) => {
    return res.status(200).json({
        statusCode: 200,
        message: message || "Success",
        data: data,
        success: true,
    });
};
exports.sendSuccessReponse = sendSuccessReponse;
