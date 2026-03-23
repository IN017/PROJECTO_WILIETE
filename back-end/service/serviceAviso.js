import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceAviso {

    static async criarAviso(dados) {
        try {
            const { titulo, conteudo, imagem } = dados;

            if (!titulo || !conteudo || !imagem) {
                throw new Error("Todos os campos são obrigatórios.");
            }

            const novoAviso = await prisma.aviso.create({
                data: {
                    titulo,
                    conteudo,
                    imagem
                }
            });

            return novoAviso;

        } catch (error) {
            throw new Error(`Erro ao criar aviso: ${error.message}`);
        }
    }

    static async listarAvisos() {
        return await prisma.aviso.findMany();
    }

    static async obterAvisoPorId(id) {
        return await prisma.aviso.findUnique({
            where: { id: parseInt(id) }
        });
    }

    static async atualizarAviso(id, dados) {
        const { titulo, conteudo, imagem } = dados;

        return await prisma.aviso.update({
            where: { id: parseInt(id) },
            data: {
                titulo,
                conteudo,
                imagem
            }
        });
    }

    static async deletarAviso(id) {
        return await prisma.aviso.delete({
            where: { id: parseInt(id) }
        });
    }
}