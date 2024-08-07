import { AuthenticatedRequest } from './../types/Extends';
import { NextFunction, Response } from "express"
import { JWT_SECRET } from "../config/envConfig";
import { DecodedToken } from '../types/ModelsTypes';
import { ERRORS_TYPES } from '../types/ErrorsTypes';

import jwt from 'jsonwebtoken'

const TOKEN_SECRET = JWT_SECRET as string

export const SuperAdminAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void  => {
    const token = req.headers["authorization"] as string;

    if(!token) res.status(401).json({error: {message: ERRORS_TYPES.UNAUTHORIZED}})

    jwt.verify(token, TOKEN_SECRET, (err, decoded: any) => {

        if (err) {
            res.status(401).json({ error: { message: ERRORS_TYPES.UNAUTHORIZED } });
        }

        const decodedToken = decoded as DecodedToken;

        req._id = decodedToken._id
        req.roles = decodedToken.roles

        if(!req.roles.includes("SuperAdmin") && !req.roles.includes("Admin")) res.status(403).json({error: {message: ERRORS_TYPES.UNAUTHORIZED}});

        next()
    })
}