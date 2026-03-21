import {Router} from "express";
import {ControllerTurma} from "../controller/controllerTurma.js";

export const routerTurma = Router();
routerTurma.post("/turmas", ControllerTurma.criarTurma);
routerTurma.get("/turmas", ControllerTurma.listarTurmas);
routerTurma.get("/turmas/:id", ControllerTurma.obterTurmaPorId);
routerTurma.put("/turmas/:id", ControllerTurma.atualizarTurma);
routerTurma.delete("/turmas/:id", ControllerTurma.deletarTurma);