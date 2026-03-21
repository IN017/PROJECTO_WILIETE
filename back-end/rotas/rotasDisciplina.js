import { Router } from "express";
import { ControllerDisciplina } from "../controller/controllerDisciplina.js";

export const routerDisciplina = Router();

routerDisciplina.post("/disciplinas", ControllerDisciplina.criarDisciplina);
routerDisciplina.get("/disciplinas", ControllerDisciplina.listarDisciplinas);
routerDisciplina.get("/disciplinas/:id", ControllerDisciplina.obterDisciplinaPorId);
routerDisciplina.put("/disciplinas/:id", ControllerDisciplina.atualizarDisciplina);
routerDisciplina.delete("/disciplinas/:id", ControllerDisciplina.deletarDisciplina);