import {prisma} from "../prismaClient/prismaClient.js";

export class ServiceAluno {

    static async criarAluno(dados) {
    try {
        const { nome, numero_matricula, turmaId, telefone, classe, encarregadoId, cursoId } = dados;

        if (!nome || !numero_matricula || !turmaId) {
            throw new Error("Nome, matrícula e turma são obrigatórios.");
        }

        const matriculaExistente = await prisma.aluno.findUnique({
            where: { numero_matricula }
        });

        if (matriculaExistente) {
            throw new Error("Número de matrícula já cadastrado.");
        }

        const telefoneExistente = await prisma.aluno.findUnique({
            where: { telefone }
        });

        if (telefoneExistente) {
            throw new Error("Telefone já cadastrado.");
        }

        const novoAluno = await prisma.aluno.create({
            data: {
                nome,
                numero_matricula,
                turmaId,
                telefone,
                classe,
                cursoId,

                // 👇 só adiciona se existir
                ...(encarregadoId && { encarregadoId })
            }
        });

        return novoAluno;

    } catch (error) {
        throw new Error(`Erro ao criar aluno: ${error.message}`);
    }
}

    static async listarAlunos() {
    try {
        const alunos = await prisma.aluno.findMany({
            include: {
                turma: true,
                curso: true,
                encarregado: true
            }
        });   
        return alunos;
    } catch (error) {
        throw new Error(`Erro ao listar alunos: ${error.message}`);
    }   
}

    static async obterAlunoPorId(id) {
        try {
            const aluno = await prisma.aluno.findUnique({   
                where: { id: parseInt(id) }
            });
            if (!aluno) {
                throw new Error("Aluno não encontrado.");
            }
            return aluno;
        } catch (error) {
            throw new Error(`Erro ao obter aluno: ${error.message}`);
        }

    }

    static async atualizarAluno(id, dados) {
    try {
        const { nome, numero_matricula, turmaId, telefone, classe, encarregadoId, cursoId } = dados;

        if (!nome || !numero_matricula || !turmaId) {
            throw new Error("Nome, matrícula e turma são obrigatórios.");
        }

        const alunoExistente = await prisma.aluno.findUnique({
            where: { id: parseInt(id) }
        });

        if (!alunoExistente) {
            throw new Error("Aluno não encontrado.");
        }

        const alunoAtualizado = await prisma.aluno.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                numero_matricula,
                turmaId,
                telefone,
                classe,
                cursoId,

                // opcional
                encarregadoId: encarregadoId || null
            }
        });

        return alunoAtualizado;

    } catch (error) {
        throw new Error(`Erro ao atualizar aluno: ${error.message}`);
    }
}

    static async deletarAluno(id) {
        try {
            const alunoExistente = await prisma.aluno.findUnique({      
                where: { id: parseInt(id) }
            }); 

            if (!alunoExistente) {
                throw new Error("Aluno não encontrado.");
            }
            await prisma.aluno.delete({
                where: { id: parseInt(id) }
            });
            return { mensagem: "Aluno deletado com sucesso." };
        }
        catch (error) {
            throw new Error(`Erro ao deletar aluno: ${error.message}`);
        }   
    }
}




                    