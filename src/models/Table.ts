import {Schema, model} from 'mongoose'
import { TableInt } from '../types/ModelsTypes'

export const TableModel: Schema = new Schema ({
    tablePrice: {type: Number, default: 0},
    productsLenght: {type: Number, default: 0},
    idWaiter: String,
    idPlace: String,
    products: Array,
    isPaid: {type: Boolean, default: false},
    createdAt: Date
})

export const TableSchema = model<TableInt>("tables", TableModel)