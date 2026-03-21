import {prisma} from '../prismaClient/prismaClient.js';

export class ServiceRelatorio {
    static async gerarRelatorioNotas(titulo, conteudo) {    

        try {
            if (!titulo || !conteudo) {
                throw new Error("O título e o conteúdo do relatório são obrigatórios.");
            }   
            const novoRelatorio = await prisma.relatorio.create({
                data: {
                    titulo, 
                    conteudo
                }
            });
            return novoRelatorio;
        } catch (error) {
            throw new Error(`Erro ao criar relatório: ${error.message}`);
        }   
    }

    static async listarRelatorios() {
        try {
            const relatorios = await prisma.relatorio.findMany();
            return relatorios;
        } catch (error) {
            throw new Error(`Erro ao listar relatórios: ${error.message}`);
        }
    }

    static async obterRelatorioPorId(id) {
        try {
            const relatorio = await prisma.relatorio.findUnique({   

                where: { id: parseInt(id) }
            });
            if (!relatorio) {
                throw new Error("Relatório não encontrado.");
            }   

            return relatorio;
        } catch (error) {
            throw new Error(`Erro ao obter relatório: ${error.message}`);
        }       

    }       

    static async atualizarRelatorio(id, titulo, conteudo) {
        try {
            if (!titulo || !conteudo) { 

                throw new Error("O título e o conteúdo do relatório são obrigatórios.");
            }       

            const relatorioExistente = await prisma.relatorio.findUnique({      
                where: { id: parseInt(id) }
            });
            if (!relatorioExistente) {  
                throw new Error("Relatório não encontrado.");
            }   
            const relatorioAtualizado = await prisma.relatorio.update({ 
                where: { id: parseInt(id) },
                data: { titulo, conteudo }
            });
            return relatorioAtualizado;
        }
        catch (error) {
            throw new Error(`Erro ao atualizar relatório: ${error.message}`);
        }           

    }

    static async deletarRelatorio(id) {     
        try {
            const relatorioExistente = await prisma.relatorio.findUnique({
                where: { id: parseInt(id) }
            });
            if (!relatorioExistente) {
                throw new Error("Relatório não encontrado.");
            }
            await prisma.relatorio.delete({
                where: { id: parseInt(id) }
            });
            return { message: "Relatório deletado com sucesso." };
        }
        catch (error) {
            throw new Error(`Erro ao deletar relatório: ${error.message}`);
        }
    }

 }
