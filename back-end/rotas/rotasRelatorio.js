import {Router} from "express";
import {ControllerRelatorio} from "../controller/controllerRelatorio.js";

export const routerRelatorio = Router();

routerRelatorio.post("/relatorios", ControllerRelatorio.criarRelatorio);
routerRelatorio.get("/relatorios", ControllerRelatorio.listarRelatorios);
routerRelatorio.get("/relatorios/:id", ControllerRelatorio.obterRelatorioPorId);
routerRelatorio.put("/relatorios/:id", ControllerRelatorio.atualizarRelatorio);
routerRelatorio.delete("/relatorios/:id", ControllerRelatorio.deletarRelatorio);