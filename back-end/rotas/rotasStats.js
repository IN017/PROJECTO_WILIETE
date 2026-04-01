import express from "express";
import { ControllerStats } from "../controller/controllerStats.js";

const router = express.Router();

router.get("/stats", ControllerStats.getStats);

router.get("/usuarios", ControllerStats.listarUsuarios);

router.get("/cursos", ControllerStats.listarCursos);

router.get("/alunos", ControllerStats.listarAlunos);

router.get("/avisos", ControllerStats.listarAvisos);

router.get("/eventos", ControllerStats.listarEventos);

router.get("/reunioes", ControllerStats.listarReunioes);

router.get("/turmas", ControllerStats.listarTurmas);


export default router;