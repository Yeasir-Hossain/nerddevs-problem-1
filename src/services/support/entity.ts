import { NextFunction, Response, Request } from "express";
import ApiError from "../../errors/ApiError";
import Support from "./model";

const CREATE_ALLOWED = new Set(["userID", "queryText", "deviceID"]);

/**
 * Creates a new category
 * @param {Req} req The request object
 * @returns {Promise<Response>} The response object containing the created data or the error message
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

  const isValid = Object.keys(req.body).every(k => CREATE_ALLOWED.has(k));
  if (!isValid) throw new ApiError(400, "Invalid Fields provided");

  const { userID, queryText, deviceID } = req.body;

  const previousRequest = await Support.findOne({ userID }).sort({ date: -1 })

  if (previousRequest) {
    const timeDifference = (new Date().getTime() - previousRequest.date.getTime()) / (1000 * 60);

    if (timeDifference <= 30) throw new ApiError(409, "You have already placed a support ticket. Please wait at least one hour before sending another request")
  }

  const newRequest = await Support.create({ userID, queryText, deviceID });

  return res.status(200).json({ data: { _id: newRequest.id } });
};