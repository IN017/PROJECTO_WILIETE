import {Router} from "express";
import {ControllerReuniao} from "../controller/controllerReuniao.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";

export const routerReuniao = Router();
routerReuniao.post("/reunioes", MiddlewareAutenticacao.autenticar, ControllerReuniao.criarReuniao);
routerReuniao.get("/reunioes", ControllerReuniao.listarReunioes);
routerReuniao.get("/reunioes/:id", ControllerReuniao.obterReuniaoPorId);
routerReuniao.put("/reunioes/:id", MiddlewareAutenticacao.autenticar, ControllerReuniao.atualizarReuniao);
routerReuniao.delete("/reunioes/:id", MiddlewareAutenticacao.autenticar, ControllerReuniao.deletarReuniao);
