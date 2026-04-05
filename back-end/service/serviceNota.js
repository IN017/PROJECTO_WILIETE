import { prisma } from "../prismaClient/prismaClient.js";


export class ServiceNota {
    static async criarNota(dados) {
        try {
            const { alunoId, disciplinaId, valor, tipo } = dados;
            if (!alunoId || !disciplinaId || typeof valor !== 'number' || !tipo) {
                throw new Error("O aluno, a disciplina, o tipo e o valor da nota são obrigatórios.");
            }

            const novaNota = await prisma.nota.create({
                data: {
                    alunoId,
                    disciplinaId,
                    valor,
                    tipo
                }
            });
            return novaNota;
        } catch (error) {
            throw new Error(`Erro ao criar nota: ${error.message}`);
        }
    }

    static async listarNotas() {
        try {
            const notas = await prisma.nota.findMany({
                include: {
                    aluno: true,
                    disciplina: true
                }
            });
            return notas;
        } catch (error) {
            throw new Error(`Erro ao listar notas: ${error.message}`);
        }
    }

    static async obterNotaPorId(id) {
        try {
            const nota = await prisma.nota.findUnique({
                where: { id: parseInt(id) }
            });
            if (!nota) {
                throw new Error("Nota não encontrada.");
            }
            return nota;
        } catch (error) {
            throw new Error(`Erro ao obter nota: ${error.message}`);
        }
    }

    static async atualizarNota(id, dados) {
        try {
            const { alunoId, disciplinaId, valor, tipo } = dados;
            if (!alunoId || !disciplinaId || typeof valor !== 'number' || !tipo) {
                throw new Error("O aluno, a disciplina, o tipo e o valor da nota são obrigatórios.");
            }
            const notaExistente = await prisma.nota.findUnique({
                where: { id: parseInt(id) }
            });
            if (!notaExistente) {
                throw new Error("Nota não encontrada.");
            }
            const notaAtualizada = await prisma.nota.update({
                where: { id: parseInt(id) },
                data: { alunoId, disciplinaId, valor, tipo }
            });
            return notaAtualizada;
        } catch (error) {
            throw new Error(`Erro ao atualizar nota: ${error.message}`);
        }
    }

    static async deletarNota(id) {
        try {
            const notaExistente = await prisma.nota.findUnique({
                where: { id: parseInt(id) }
            });
            if (!notaExistente) {
                throw new Error("Nota não encontrada.");
            }
            const notaDeletada = await prisma.nota.delete({
                where: { id: parseInt(id) }
            });
            return notaDeletada;
        } catch (error) {
            throw new Error(`Erro ao deletar nota: ${error.message}`);
        }
    }
}