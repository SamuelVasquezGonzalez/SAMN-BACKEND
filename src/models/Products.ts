import { Schema, model } from "mongoose";
import { ProductInt } from "../types/ModelsTypes";

export const ProductModel: Schema = new Schema ({
    name: {type: String, reqired: true},
    price: {type: Number, required: true, default: 0},
    comision: {type: Number, required: true, default: 0},
    stock: {type: Number, required: true, default: 0},
    picture: {
        where: String,
        public_id: String,
        url: String
    },
    idPlace: {type: String, required: true},
    createdAt: Date
})

export const ProductSchema = model<ProductInt>("product", ProductModel)