import {Router} from "express";
import {ControllerReuniao} from "../controller/controllerReuniao.js";

export const routerReuniao = Router();
routerReuniao.post("/reunioes", ControllerReuniao.criarReuniao);
routerReuniao.get("/reunioes", ControllerReuniao.listarReunioes);
routerReuniao.get("/reunioes/:id", ControllerReuniao.obterReuniaoPorId);
routerReuniao.put("/reunioes/:id", ControllerReuniao.atualizarReuniao);
routerReuniao.delete("/reunioes/:id", ControllerReuniao.deletarReuniao);