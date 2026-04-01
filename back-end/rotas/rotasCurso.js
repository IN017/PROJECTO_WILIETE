import { Router } from "express";
import { ControllerCurso } from "../controller/controllerCurso.js";

export const routerCurso = Router();

routerCurso.post('/cursos', ControllerCurso.criarCurso);
routerCurso.get('/cursos', ControllerCurso.listarCursos);
routerCurso.get('/cursos/:id', ControllerCurso.obterCursoPorId);
routerCurso.put('/cursos/:id', ControllerCurso.atualizarCurso);
routerCurso.delete('/cursos/:id', ControllerCurso.deletarCurso);
routerCurso.get('/cursos-detalhado', ControllerCurso.listarCursosComDisciplinas);