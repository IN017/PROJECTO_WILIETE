import { Router } from "express";
import { ControllerAluno } from "../controller/controllerAluno.js";

export const routerAluno = Router();

routerAluno.post('/alunos', ControllerAluno.criarAluno);
routerAluno.get('/alunos', ControllerAluno.listarAlunos);
routerAluno.get('/alunos/:id', ControllerAluno.obterAlunoPorId);
routerAluno.put('/alunos/:id', ControllerAluno.atualizarAluno);
routerAluno.delete('/alunos/:id', ControllerAluno.deletarAluno);