import { Document } from "mongoose"

export type PictureWhere = "Clodinary" | "none"
export type Roles = "SuperAdmin" | "Admin"
export const RolesTypeArray: Roles[] = ["SuperAdmin"]

export interface SuperAdminInt extends Document {
    name: string,
    number: number,
    email: string,
    password: string,
    profile_picture: {
        where: PictureWhere,
        public_id: string
        url: string
    }
    reset_code: number,
    roles: Roles[],
    createdAt: Date
}

export type SuscriptionsTypes = "month" | "year"
export type SuscriptionType = {
    plan: SuscriptionType,
    isActive: boolean,
    start: Date,
    end: Date
}

export type SettingColor = "white" | "dark"

export type SettingsType = {
    interfaceColor: SettingColor,
    deactivateEmployees: boolean,
    productStock: boolean,
}

export type ProductInt = {
    name: string,
    price: number,
    comision: number,
    stock: number,
    picture: {
        where: PictureWhere,
        public_id: string
        url: String
    },
    idPlace: String,
    createdAt: Date
}

export interface PlaceInt {
    name: string,
    totalSales: number,
    totalComisions: number
    productMostSale: ProductInt
    suscription: SuscriptionType,
    settings: SettingsType,
    createdAt: Date
}

export interface AdminInt extends SuperAdminInt {
    idPlace: string,
    username: string,
}

export interface WaiterInt {
    idPlace: string
    name: string,
    totalSales: number,
    identification: number,
    baseSalary: number,
    isActive: boolean
    debt: number,
    totalComision: number,
    createdAt: Date
}

export interface TableInt {
    tablePrice: number,
    productsLenght: number,
    idWaiter: String,
    idPlace: String,
    products: ProductInt[],
    isPaid: boolean,
    createdAt: Date,
}

export interface DecodedToken {
    _id: string,
    roles: string[],
    expiration: number
}
