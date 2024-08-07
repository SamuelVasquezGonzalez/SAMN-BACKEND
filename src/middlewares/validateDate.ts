import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const RegisterValidateData = [
    body('name').notEmpty().withMessage("Name is required"),
    body('email').isEmail().withMessage("Your email is not valid"),
    body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long")
];

export const LoginValidateData = [
    body('email').isEmail().withMessage("Your email is not valid"),
    body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long")
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
