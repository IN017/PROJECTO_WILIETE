import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceDisciplina {
    static async criarDisciplina(dados) {
    try {
        const { nome, professorId, descricao, cursoId } = dados;

        if (!nome) {
            throw new Error("O nome da disciplina é obrigatório.");
        }

        if (!cursoId) {
            throw new Error("O curso é obrigatório.");
        }

        const novaDisciplina = await prisma.disciplina.create({
            data: {
                nome,
                descricao: descricao || " ",
                cursoId: Number(cursoId),

                // relação opcional com professor
                professores: professorId
                    ? {
                        connect: [{ id: Number(professorId) }]
                      }
                    : undefined
            }
        });

        return novaDisciplina;

    } catch (error) {
        throw new Error(`Erro ao criar disciplina: ${error.message}`);
    }
}

    static async listarDisciplinas() {
        try {
            const disciplinas = await prisma.disciplina.findMany({
                include:
                 {
                    curso: true,
                    professores: true
                 }
            });
            return disciplinas;
        } catch (error) {
            throw new Error(`Erro ao listar disciplinas: ${error.message}`);
        }
    }

    static async obterDisciplinaPorId(id) {
        try {
            const disciplina = await prisma.disciplina.findUnique({
                where: { id: parseInt(id) }
            });
            if (!disciplina) {
                throw new Error("Disciplina não encontrada.");
            }
            return disciplina;
        } catch (error) {
            throw new Error(`Erro ao obter disciplina: ${error.message}`);
        }
    }

   static async atualizarDisciplina(id, dados) {
    try {
        const { nome, professorId, cursoId, descricao } = dados;

        if (!nome) {
            throw new Error("O nome da disciplina é obrigatório.");
        }

        const disciplinaAtualizada = await prisma.disciplina.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                descricao,

                // RELAÇÃO COM CURSO
                curso: {
                    connect: { id: parseInt(cursoId) }
                },

                // PROFESSOR DEPENDE DO TEU MODEL
                professores: professorId
                    ? { set: [{ id: parseInt(professorId) }] }
                    : { set: [] }
            }
        });

        return disciplinaAtualizada;

    } catch (error) {
        throw new Error(`Erro ao atualizar disciplina: ${error.message}`);
    }
}
    static async deletarDisciplina(id) {
        try {
            const disciplinaExistente = await prisma.disciplina.findUnique({
                where: { id: parseInt(id) }
            });
            if (!disciplinaExistente) {
                throw new Error("Disciplina não encontrada.");
            }
            await prisma.disciplina.delete({
                where: { id: parseInt(id) }
            });
            return { message: "Disciplina deletada com sucesso." };
        } catch (error) {
            throw new Error(`Erro ao deletar disciplina: ${error.message}`);
        }
    }
 }