import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceReuniao {
    static async criarReuniao(titulo, linkMeeting, local, participantesIds = [], criadoPorId = null) {
        try {
            if (!titulo || !local) {
                throw new Error("O título e o local são obrigatórios.");
            }

            const participantes = Array.from(new Set((participantesIds || [])
                .map(id => parseInt(id, 10))
                .filter(Number.isInteger)));

            if (!participantes.length) {
                throw new Error("Selecione pelo menos um destinatário para a reunião.");
            }

            const novaReuniao = await prisma.reuniao.create({
                data: {
                    titulo,
                    linkMeeting,
                    local,
                    criadoPorId: criadoPorId ? parseInt(criadoPorId, 10) : null,
                    participantes: {
                        create: participantes.map(usuarioId => ({ usuarioId }))
                    }
                },
                include: {
                    criadoPor: true,
                    participantes: { include: { usuario: true } }
                }
            });
            return novaReuniao;
        } catch (error) {
            throw new Error(`Erro ao criar reunião: ${error.message}`);
        }
    }

    static async listarReunioes(usuarioId) {
        try {
            const where = usuarioId
                ? {
                    OR: [
                        { participantes: { some: { usuarioId: parseInt(usuarioId, 10) } } },
                        { criadoPorId: parseInt(usuarioId, 10) }
                    ]
                }
                : {};

            const reunioes = await prisma.reuniao.findMany({
                where,
                include: { criadoPor: true, participantes: { include: { usuario: true } } }
            });
            return reunioes;
        } catch (error) {
            throw new Error(`Erro ao listar reuniões: ${error.message}`);
        }
    }

    static async obterReuniaoPorId(id) {
        try {
            const reuniao = await prisma.reuniao.findUnique({
                where: { id: parseInt(id) },
                include: { criadoPor: true, participantes: { include: { usuario: true } } }
            });
            if (!reuniao) {
                throw new Error("Reunião não encontrada.");
            }
            return reuniao;
        } catch (error) {
            throw new Error(`Erro ao obter reunião: ${error.message}`);
        }
    }

    static async atualizarReuniao(id, titulo, linkMeeting, local, participantesIds) {
        try {
            if (!titulo || !local) {
                throw new Error("O título e o local são obrigatórios.");
            }

            const reuniaoExistente = await prisma.reuniao.findUnique({
                where: { id: parseInt(id) }
            });
            if (!reuniaoExistente) {
                throw new Error("Reunião não encontrada.");
            }

            const data = { titulo, linkMeeting, local };
            if (Array.isArray(participantesIds)) {
                const participantes = Array.from(new Set((participantesIds || [])
                    .map(pid => parseInt(pid, 10))
                    .filter(Number.isInteger)));

                data.participantes = {
                    deleteMany: {},
                    create: participantes.map(usuarioId => ({ usuarioId }))
                };
            }

            const reuniaoAtualizada = await prisma.reuniao.update({
                where: { id: parseInt(id) },
                data
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

            // Primeiro deletar todos os participantes
            await prisma.reuniaoParticipante.deleteMany({
                where: { reuniaoId: parseInt(id) }
            });

            // Depois deletar a reunião
            await prisma.reuniao.delete({
                where: { id: parseInt(id) }
            });
            return { message: "Reunião deletada com sucesso." };
        } catch (error) {
            throw new Error(`Erro ao deletar reunião: ${error.message}`);
        }
    }
}