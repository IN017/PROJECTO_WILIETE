import { Router } from "express";
import { ControllerMensagem } from "../controller/controllerMensagem.js";
import { MiddlewareAutenticacao } from "../middlewares/autenticacao.js";
import { upload } from "../middlewares/upload.js";

export const routerMensagem = Router();

routerMensagem.post(
  "/mensagens",
  MiddlewareAutenticacao.autenticar,
  upload.single("arquivo"),
  ControllerMensagem.criarMensagem
);
routerMensagem.get("/mensagens", MiddlewareAutenticacao.autenticar, ControllerMensagem.listarMensagens);
routerMensagem.get("/mensagens/:id", MiddlewareAutenticacao.autenticar, ControllerMensagem.obterMensagemPorId);
routerMensagem.put("/mensagens/:id", MiddlewareAutenticacao.autenticar, ControllerMensagem.atualizarMensagem);
routerMensagem.delete("/mensagens/:id", MiddlewareAutenticacao.autenticar, ControllerMensagem.deletarMensagem);