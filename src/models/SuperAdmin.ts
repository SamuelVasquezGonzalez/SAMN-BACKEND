import { RolesTypeArray, SuperAdminInt } from './../types/ModelsTypes';
import {model, Schema} from "mongoose";
import bcrypt from 'bcrypt'

export const SuperAdminModel: Schema = new Schema({
    name: {type: String, required: true},
    number: {type: Number},
    email: {type: String, require: true},
    password: {type: String, required: true},
    profile_picture: {
        where: String,
        public_id: String,
        url: {
            type: String,
            default: "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
        }
    },
    reset_code: Number,
    roles: {type: [String], enum: RolesTypeArray, require: true},
    createdAt: Date
})

SuperAdminModel.pre<SuperAdminInt>("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (err: any) {
        return next(err);
    }
});

export const SuperAdminSchema = model<SuperAdminInt>("superadmin", SuperAdminModel)

