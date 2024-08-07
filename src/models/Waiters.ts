
import {Schema, model} from 'mongoose'
import { WaiterInt } from '../types/ModelsTypes'

export const WaiterModel: Schema = new Schema ({
    idPlace: {type: String, required: true},
    name: {type: String, required: true},
    totalSales: {type: Number, default: 0},
    identification: {type: Number, default: 0},
    baseSalary: {type: Number, default: 0},
    isActive: {type: Boolean, default: true},
    debt: {type: Number, default: 0},
    totalComision: {type: Number, default: 0},
    createdAt: Date
})

export const WaiterSchema = model<WaiterInt>("waiter", WaiterModel)