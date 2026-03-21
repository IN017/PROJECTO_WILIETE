import { Router } from "express";
import { ControllerEvento } from "../controller/controllerEvento.js";

export const routerEvento = Router();

routerEvento.post("/eventos", ControllerEvento.criarEvento);
routerEvento.get("/eventos", ControllerEvento.listarEventos);
routerEvento.get("/eventos/:id", ControllerEvento.obterEventoPorId);
routerEvento.put("/eventos/:id", ControllerEvento.atualizarEvento);
routerEvento.delete("/eventos/:id", ControllerEvento.deletarEvento);