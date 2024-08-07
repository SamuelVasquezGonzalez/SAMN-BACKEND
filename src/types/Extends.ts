import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    _id?: string;
    roles?: string[]
}