import { prisma } from '../prismaClient/prismaClient.js';

class ServiceFeedback {
  // Criar um novo feedback
  async criarFeedback(dados) {
    try {
      const feedback = await prisma.feedback.create({
        data: {
          nome: dados.nome,
          email: dados.email,
          assunto: dados.assunto,
          mensagem: dados.mensagem,
        },
      });
      return feedback;
    } catch (error) {
      throw new Error('Erro ao criar feedback: ' + error.message);
    }
  }

  // Listar todos os feedbacks
  async listarFeedbacks() {
    try {
      const feedbacks = await prisma.feedback.findMany({
        orderBy: {
          criadoEm: 'desc',
        },
      });
      return feedbacks;
    } catch (error) {
      throw new Error('Erro ao listar feedbacks: ' + error.message);
    }
  }

  // Remover um feedback por ID
  async removerFeedback(id) {
    try {
      const feedback = await prisma.feedback.delete({
        where: { id: parseInt(id) },
      });
      return feedback;
    } catch (error) {
      throw new Error('Erro ao remover feedback: ' + error.message);
    }
  }
}

export default new ServiceFeedback();