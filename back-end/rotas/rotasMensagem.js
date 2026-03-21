import { Router } from "express";
import { ControllerMensagem } from "../controller/controllerMensagem.js";

export const routerMensagem = Router();

routerMensagem.post("/mensagens", ControllerMensagem.criarMensagem);
routerMensagem.get("/mensagens", ControllerMensagem.listarMensagens);
routerMensagem.get("/mensagens/:id", ControllerMensagem.obterMensagemPorId);
routerMensagem.put("/mensagens/:id", ControllerMensagem.atualizarMensagem);
routerMensagem.delete("/mensagens/:id", ControllerMensagem.deletarMensagem);