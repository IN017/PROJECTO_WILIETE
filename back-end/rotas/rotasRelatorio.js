import {Router} from "express";
import {ControllerRelatorio} from "../controller/controllerRelatorio.js";

export const routerRelatorio = Router();

routerRelatorio.get("/relatorios/disciplinas", ControllerRelatorio.gerarRelatorioDisciplinas);
routerRelatorio.get("/relatorios/mensagens", ControllerRelatorio.gerarRelatorioMensagens);
routerRelatorio.get("/relatorios/avisos", ControllerRelatorio.gerarRelatorioAvisos);
routerRelatorio.get("/relatorios/notas", ControllerRelatorio.gerarRelatorioNotas);