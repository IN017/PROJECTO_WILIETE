import {prisma} from '../prisma/prismaClient.js';

export class ServiceTurma {
    static async criarTurma(dados) {
        try {
            const {titulo, descricao, imagem} = dados;
            if (!titulo || !descricao || !imagem) {
                throw new Error("Todos os campos são obrigatórios.");
            }   

            const novoEvento = await prisma.evento.create({
                data: {
                    titulo,
                    descricao,
                    imagem
                }
            });
            return novoEvento;
        } catch (error) {
            throw new Error(`Erro ao criar evento: ${error.message}`);
        }
    }

    static async listarEventos() {
        try {
            const eventos = await prisma.evento.findMany();
            return eventos;
        } catch (error) {
            throw new Error(`Erro ao listar eventos: ${error.message}`);
        }
    }

    static async obterEventoPorId(id) {
        try {
            const evento = await prisma.evento.findUnique({
                where: { id: parseInt(id) }
            });
            if (!evento) {
                throw new Error("Evento não encontrado.");
            }
            return evento;
        } catch (error) {
            throw new Error(`Erro ao obter evento: ${error.message}`);
        }       
    }

    static async atualizarEvento(id, dados) {
        try {
            const {titulo, descricao} = dados;  
            if (!titulo || !descricao) {
                throw new Error("O título e a descrição do evento são obrigatórios.");
            }
            const eventoExistente = await prisma.evento.findUnique({
                where: { id: parseInt(id) }
            });
            if (!eventoExistente) {
                throw new Error("Evento não encontrado.");
            }
            const eventoAtualizado = await prisma.evento.update({
                where: { id: parseInt(id) },
                data: { titulo, descricao }
            });
            return eventoAtualizado;
        } catch (error) {
            throw new Error(`Erro ao atualizar evento: ${error.message}`);
        }
    }

    static async deletarEvento(id) {
        try {
            const eventoExistente = await prisma.evento.findUnique({
                where: { id: parseInt(id) }
            });
            if (!eventoExistente) {
                throw new Error("Evento não encontrado.");
            }
            const eventoDeletado = await prisma.evento.delete({
                where: { id: parseInt(id) }
            });
            return eventoDeletado;
        } catch (error) {
            throw new Error(`Erro ao deletar evento: ${error.message}`);
        }
    }
 }    

