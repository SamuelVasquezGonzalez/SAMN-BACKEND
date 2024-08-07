import { SuperAdminAuth } from './../auth/SuperAdmin.auth';
import { Router } from "express";
import { LoginValidateData, RegisterValidateData } from "../middlewares/validateDate";
import { deleteSuperAdmin, getAllSuperAdmins, getSuperAdmin, SuperAdminLogIn, SuperAdminSignUp, updateSuperAdmin } from "../controllers/SuperAdmin.controller";

const router = Router()

router.get("/superadmins/", SuperAdminAuth ,getAllSuperAdmins)
router.get("/superadmin/:idSuperAdmin", SuperAdminAuth, getSuperAdmin)

router.post("/superadmins/signup", RegisterValidateData, SuperAdminSignUp)
router.post("/superadmins/login", LoginValidateData, SuperAdminLogIn)

router.put("/superadmin/me", SuperAdminAuth, updateSuperAdmin)
router.delete("/superadmins/:idSuperAdmin", SuperAdminAuth, deleteSuperAdmin)

router.get("/places/")

export default router;