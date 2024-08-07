import { Request, Response } from "express";
import { SuperAdminSchema } from "../models/SuperAdmin";
import { ERRORS_TYPES } from "../types/ErrorsTypes";
import { SuperAdminInt } from "../types/ModelsTypes";
import { generateRandomCode } from "../utils/generate";
import { JWT_SECRET } from "../config/envConfig";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dayjs from "dayjs";
import { AuthenticatedRequest } from "../types/Extends";
import { SUCCES_TYPES } from "../types/SuccessTypes";

const TOKEN_SECRET = JWT_SECRET as string;

export const SuperAdminLogIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password ) {
            return res.status(400).json({ error: ERRORS_TYPES.BAD_REQUEST, message: 'Missing email or password' });
        }

        const getUserByEmail = await SuperAdminSchema.findOne({ email });
            if (!getUserByEmail) {
                return res.status(404).json({ error: ERRORS_TYPES.NOT_FOUND, message: 'This account does not exist' });
            }

            const verifyPassword = await bcrypt.compare(password, getUserByEmail.password);
            if (!verifyPassword) {
                return res.status(401).json({ error: ERRORS_TYPES.UNAUTHORIZED, message: 'Invalid password' });
            }

            const tokenData = {
                _id: getUserByEmail._id,
                roles: getUserByEmail.roles
            }

            const token = jwt.sign(tokenData, TOKEN_SECRET, {
                expiresIn: "30d"
            })

            return res.status(200).json({ message: 'Logged in successfully', data: token });

    } catch (err) {
        return res.status(500).json({error: {message: ERRORS_TYPES.INTERNAL_ERROR, err}})
    }
};

export const SuperAdminSignUp = async (req: Request, res: Response) => {
    try {
        const {name, email, password, roles} = req.body;

        const verifyEmail = await SuperAdminSchema.findOne({email})

        if(verifyEmail) return res.status(409).json({err: ERRORS_TYPES.IN_USE})

        const newUser: SuperAdminInt = new SuperAdminSchema({
            name,
            email,
            password,
            recoveryCode: generateRandomCode(),
            roles: !roles ? ["SuperAdmin"]: roles,
            createdAt: new Date()
        })

        await newUser.save()

        return res.json({message: SUCCES_TYPES.CREATED})
    } catch (err) {
        return res.status(500).json({error: {message: ERRORS_TYPES.INTERNAL_ERROR, err}})
    }
}


export const getAllSuperAdmins = async (req: Request, res: Response) => {
    try {
        const getAll = await SuperAdminSchema.find().select("-password -reset_code")

        if(getAll.length == 0) return res.status(404).json({err: ERRORS_TYPES.NOT_FOUND})

        res.send(getAll)
    } catch (err) {
        return res.status(500).json({error: {message: ERRORS_TYPES.INTERNAL_ERROR, err}})
    }
}

export const getSuperAdmin = async (req: Request, res: Response) => {
    try {
        const {idSuperAdmin} = req.params;

        const getSuperAdmin = await SuperAdminSchema.findById(idSuperAdmin).select("-password -reset_code")

        if(!getSuperAdmin) return res.status(404).json({err: ERRORS_TYPES.NOT_FOUND})

        res.send(getSuperAdmin)
    } catch (err) {
        return res.status(500).json({error: {message: ERRORS_TYPES.INTERNAL_ERROR, err}})
    }
}

export const updateSuperAdmin = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {name, number, email, roles} = req.body;

        const getSuperAdmin = await SuperAdminSchema.findById(req._id)

        if(!getSuperAdmin) return res.status(404).json({err: ERRORS_TYPES.NOT_FOUND})

        const newInfo = {
            name: name || getSuperAdmin.name,
            number: number || getSuperAdmin.number,
            email: email || getSuperAdmin.email,
            roles: roles || getSuperAdmin.roles,
        }

        await SuperAdminSchema.findByIdAndUpdate(req._id, {$set: newInfo}, {new: true})

        res.status(200).json({message: SUCCES_TYPES.UPDATED})
    } catch (err) {
        return res.status(500).json({error: {message: ERRORS_TYPES.INTERNAL_ERROR, err}})
    }
}

export const deleteSuperAdmin = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {idSuperAdmin} = req.params;
        const getSuperAdmin = await SuperAdminSchema.findById(idSuperAdmin)

        if(!getSuperAdmin) return res.status(404).json({err: ERRORS_TYPES.NOT_FOUND})

        await SuperAdminSchema.findByIdAndDelete(idSuperAdmin)

        res.status(200).json({message: SUCCES_TYPES.DELETED})
    } catch (err) {
        return res.status(500).json({error: {message: ERRORS_TYPES.INTERNAL_ERROR, err}})
    }
}