import {Router} from "express";
import {ControllerNota} from "../controller/controllerNota.js";

export const routerNota = Router();

routerNota.post("/notas", ControllerNota.criarNota);
routerNota.get("/notas", ControllerNota.listarNotas);
routerNota.get("/notas/:id", ControllerNota.obterNotaPorId);
routerNota.put("/notas/:id", ControllerNota.atualizarNota);
routerNota.delete("/notas/:id", ControllerNota.deletarNota);