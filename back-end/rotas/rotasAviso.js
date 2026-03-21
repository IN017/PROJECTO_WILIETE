import { Router } from "express";
import { ControllerAviso } from "../controller/controllerAviso.js";

export const routerAviso = Router();

routerAviso.post("/avisos", ControllerAviso.criarAviso);
routerAviso.get("/avisos", ControllerAviso.listarAvisos);
routerAviso.get("/avisos/:id", ControllerAviso.obterAvisoPorId);
routerAviso.put("/avisos/:id", ControllerAviso.atualizarAviso);
routerAviso.delete("/avisos/:id", ControllerAviso.deletarAviso);
