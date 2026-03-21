import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceReuniao {
    static async criarReuniao(titulo, linkMeeting, local) {
        try {
            if (!titulo || !linkMeeting || !local) {
                throw new Error("O título, o link da reunião e o local são obrigatórios.");
            }
            const novaReuniao = await prisma.reuniao.create({
                data: {
                    titulo,
                    linkMeeting,
                    local
                }
            });
            return novaReuniao;
        } catch (error) {
            throw new Error(`Erro ao criar reunião: ${error.message}`);
        }
    }

    static async listarReunioes() {
        try {
            const reunioes = await prisma.reuniao.findMany();
            return reunioes;
        } catch (error) {
            throw new Error(`Erro ao listar reuniões: ${error.message}`);
        }
    }

    static async obterReuniaoPorId(id) {
        try {
            const reuniao = await prisma.reuniao.findUnique({
                where: { id: parseInt(id) }
            });
            if (!reuniao) {
                throw new Error("Reunião não encontrada.");
            }
            return reuniao;
        } catch (error) {
            throw new Error(`Erro ao obter reunião: ${error.message}`);
        }
    }

    static async atualizarReuniao(id, titulo, linkMeeting, local) {
        try {
            if (!titulo || !linkMeeting || !local) {
                throw new Error("O título, o link da reunião e o local são obrigatórios.");
            }

            const reuniaoExistente = await prisma.reuniao.findUnique({
                where: { id: parseInt(id) }
            });
            if (!reuniaoExistente) {
                throw new Error("Reunião não encontrada.");
            }

            const reuniaoAtualizada = await prisma.reuniao.update({
                where: { id: parseInt(id) },
                data: { titulo, linkMeeting, local }
            });
            return reuniaoAtualizada;
        } catch (error) {
            throw new Error(`Erro ao atualizar reunião: ${error.message}`);
        }
    }

    static async deletarReuniao(id) {
        try {
            const reuniaoExistente = await prisma.reuniao.findUnique({
                where: { id: parseInt(id) }
            });
            if (!reuniaoExistente) {
                throw new Error("Reunião não encontrada.");
            }

            await prisma.reuniao.delete({
                where: { id: parseInt(id) }
            });
            return { message: "Reunião deletada com sucesso." };
        } catch (error) {
            throw new Error(`Erro ao deletar reunião: ${error.message}`);
        }
    }
}