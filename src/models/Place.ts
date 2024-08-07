import { Schema, model } from "mongoose";
import { PlaceInt } from "../types/ModelsTypes";

export const PlaceModel: Schema = new Schema ({
    name: {type: String, require: true},
    totalSales: {type: String, default: 0},
    totalComisions: {type: String, default: 0},
    productMostSale: {type: Object, default: {}},
    suscription: {
        plan: {type: Boolean, default: false},
        isActive: {type: Boolean, default: false},
        start: Date,
        end: Date
    },
    settings: {
        interfaceColor: {type: String, default: "white"},
        deactivateEmployees: {type: Boolean, default: false},
        productStock: {type: Boolean, default: true},
    },
    createdAt: Date
})

export const PlaceSchema = model<PlaceInt>("place", PlaceModel)