import express from "express";
import { createAppointment, listAppointments, updateStatus } from "../controllers/appointmentController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

// Todos os usuários autenticados podem listar e criar
router.get("/", listAppointments);
router.post("/", createAppointment);

// Apenas secretários podem alterar status de atendimento
router.patch("/:id/status", authorize("secretary"), updateStatus);

export default router;
