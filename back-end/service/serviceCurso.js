import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceCurso {

    static async criarCurso(dados) {
        try {
            const { nome, descricao } = dados;
            if (!nome) {
                throw new Error("O nome do curso é obrigatório.");
            }
            const novoCurso = await prisma.curso.create({
                data: {
                    nome,   
                    descricao
                }
            });
            return novoCurso;
        } catch (error) {
            throw new Error(`Erro ao criar curso: ${error.message}`);
        }   
    }

    static async listarCursos() {
        try {
            const cursos = await prisma.curso.findMany();
            return cursos;
        } catch (error) {
            throw new Error(`Erro ao listar cursos: ${error.message}`);
        }
    }

    static async obterCursoPorId(id) {
        try {
            const curso = await prisma.curso.findUnique({   
                where: { id: parseInt(id) }
            });
            if (!curso) {
                throw new Error("Curso não encontrado.");
            }   
            return curso;
        } catch (error) {
            throw new Error(`Erro ao obter curso: ${error.message}`);
        }
    }

    static async atualizarCurso(id, dados) {    
        try {
            const { nome, descricao } = dados;  
            if (!nome) {
                throw new Error("O nome do curso é obrigatório.");
            }   
            const cursoExistente = await prisma.curso.findUnique({
                where: { id: parseInt(id) }
            }); 
            if (!cursoExistente) {
                throw new Error("Curso não encontrado.");
            }   
            const cursoAtualizado = await prisma.curso.update({
                where: { id: parseInt(id) },
                data: {
                    nome,   
                    descricao
                }
            });
            return cursoAtualizado;
        } catch (error) {
            throw new Error(`Erro ao atualizar curso: ${error.message}`);
        }
    }

    static async deletarCurso(id) { 
        try {
            const cursoExistente = await prisma.curso.findUnique({
                where: { id: parseInt(id) }
            }); 

            if (!cursoExistente) {
                throw new Error("Curso não encontrado.");
            }   

            await prisma.curso.delete({
                where: { id: parseInt(id) }
            });
        }   catch (error) { 
            throw new Error(`Erro ao deletar curso: ${error.message}`);
        }   
    }

    static async listarCursosComDisciplinas() {
        try {
            const cursos = await prisma.curso.findMany({
                include: {
                    disciplinas: true
                }
            }); 

            return cursos;
        } catch (error) {
            throw new Error(`Erro ao listar cursos com disciplinas: ${error.message}`);
        }   
    }       

 }