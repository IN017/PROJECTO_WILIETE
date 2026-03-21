import {prisma} from '../prisma/prismaClient.js';

export class ServiceTurma {
    async criarTurma(nome, professorId) {
        try {
            if (!nome || !professorId) {
                throw new Error("O nome da turma e o ID do professor são obrigatórios.");
            }
            const novaTurma = await prisma.turma.create({
                data: {
                    nome,       
                    usuarioId: professorId
                }
            });
            return novaTurma;
        } catch (error) {
            throw new Error(`Erro ao criar turma: ${error.message}`);
        }
    }

    async listarTurmas() {
        try {
            const turmas = await prisma.turma.findMany();
            return turmas;
        } catch (error) {
            throw new Error(`Erro ao listar turmas: ${error.message}`);
        }
    }

    async obterTurmaPorId(id) {
        try {
            const turma = await prisma.turma.findUnique({
                where: { id: parseInt(id) }
            }); 
            if (!turma) {
                throw new Error("Turma não encontrada.");
            }   
            return turma;
        } catch (error) {
            throw new Error(`Erro ao obter turma: ${error.message}`);
        }   
    }

    async atualizarTurma(id, nome) {    
        try {   
            if (!nome) {
                throw new Error("O nome da turma é obrigatório.");
            }   
            const turmaExistente = await prisma.turma.findUnique({
                where: { id: parseInt(id) }
            }); 
            if (!turmaExistente) {
                throw new Error("Turma não encontrada.");
            }
            const turmaAtualizada = await prisma.turma.update({
                where: { id: parseInt(id) },
                data: { nome }
            });
            return turmaAtualizada;
        } catch (error) {
            throw new Error(`Erro ao atualizar turma: ${error.message}`);
        }   
    }


    async deletarTurma(id) {    
        try {           
            const turmaExistente = await prisma.turma.findUnique({
                where: { id: parseInt(id) }
            });
            if (!turmaExistente) {
                throw new Error("Turma não encontrada.");
            }   
            const turmaDeletada = await prisma.turma.delete({
                where: { id: parseInt(id) }
            });
            return turmaDeletada;
        } catch (error) {
            throw new Error(`Erro ao deletar turma: ${error.message}`);
        }   
    }
}