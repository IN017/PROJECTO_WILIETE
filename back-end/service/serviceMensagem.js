import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceMensagem {
  static async criarMensagem({ remetenteId, destinatarioId, conteudo, arquivoNome, arquivoTipo, arquivoTamanho, arquivoUrl }) {
    if (!remetenteId || !destinatarioId) {
      throw new Error("Remetente e destinatário são obrigatórios.");
    }

    const hasConteudo = conteudo && conteudo.trim();
    const hasArquivo = arquivoUrl && arquivoNome;
    if (!hasConteudo && !hasArquivo) {
      throw new Error("A mensagem deve conter texto ou um arquivo anexado.");
    }

    const remetente = await prisma.usuario.findUnique({ where: { id: Number(remetenteId) } });
    if (!remetente) {
      throw new Error("Remetente não encontrado.");
    }

    const destinatario = await prisma.usuario.findUnique({ where: { id: Number(destinatarioId) } });
    if (!destinatario) {
      throw new Error("Destinatário não encontrado.");
    }

    return prisma.mensagem.create({
      data: {
        conteudo: hasConteudo ? conteudo.trim() : "",
        remetenteId: Number(remetenteId),
        destinatarioId: Number(destinatarioId),
        arquivoUrl: arquivoUrl || null,
        arquivoNome: arquivoNome || null,
        arquivoTipo: arquivoTipo || null,
        arquivoTamanho: arquivoTamanho ? Number(arquivoTamanho) : null,
      },
      include: {
        remetente: true,
        destinatario: true,
      },
    });
  }

  static async listarMensagens(usuarioId) {
    const where = usuarioId
      ? {
          OR: [
            { 
              remetenteId: Number(usuarioId),
              deletadoParaRemetente: false
            },
            { 
              destinatarioId: Number(usuarioId),
              deletadoParaDestinatario: false
            },
          ],
        }
      : undefined;

    return prisma.mensagem.findMany({
      where,
      orderBy: { criadoEm: "asc" },
      include: {
        remetente: true,
        destinatario: true,
      },
    });
  }

  static async obterMensagemPorId(id) {
    const mensagem = await prisma.mensagem.findUnique({
      where: { id: Number(id) },
      include: {
        remetente: true,
        destinatario: true,
      },
    });

    if (!mensagem) {
      throw new Error("Mensagem não encontrada.");
    }

    return mensagem;
  }

  static async atualizarMensagem(id, { conteudo, usuarioId }) {
    if (!conteudo || !conteudo.trim()) {
      throw new Error("Conteúdo da mensagem não pode ser vazio.");
    }

    // Verificar se a mensagem existe e se o usuário é o remetente
    const mensagemExistente = await prisma.mensagem.findUnique({
      where: { id: Number(id) },
    });

    if (!mensagemExistente) {
      throw new Error("Mensagem não encontrada.");
    }

    if (mensagemExistente.remetenteId !== Number(usuarioId)) {
      throw new Error("Apenas o remetente pode editar a mensagem.");
    }

    const mensagem = await prisma.mensagem.update({
      where: { id: Number(id) },
      data: { 
        conteudo: conteudo.trim(),
        editadoEm: new Date(),
      },
      include: {
        remetente: true,
        destinatario: true,
      },
    });

    return mensagem;
  }

  static async deletarMensagem(id, usuarioId, tipo = 'para_todos') {
    if (!usuarioId) {
      throw new Error("ID do usuário não fornecido.");
    }
    
    const usuarioIdNum = Number(usuarioId);
    if (isNaN(usuarioIdNum)) {
      throw new Error("ID do usuário inválido.");
    }
    
    const mensagemExistente = await prisma.mensagem.findUnique({
      where: { id: Number(id) },
    });

    if (!mensagemExistente) {
      throw new Error("Mensagem não encontrada.");
    }

    const isRemetente = mensagemExistente.remetenteId === usuarioIdNum;
    const isDestinatario = mensagemExistente.destinatarioId === usuarioIdNum;

    if (!isRemetente && !isDestinatario) {
      throw new Error("Usuário não autorizado a deletar esta mensagem.");
    }

    if (tipo === 'para_todos') {
      // Só o remetente pode deletar para todos
      if (!isRemetente) {
        throw new Error("Apenas o remetente pode deletar a mensagem para todos.");
      }
      await prisma.mensagem.delete({
        where: { id: Number(id) },
      });
      return { mensagem: "Mensagem deletada para todos." };
    } else if (tipo === 'para_mim') {
      const updateData = isRemetente 
        ? { deletadoParaRemetente: true }
        : { deletadoParaDestinatario: true };
      
      await prisma.mensagem.update({
        where: { id: Number(id) },
        data: updateData,
      });
      return { mensagem: "Mensagem deletada para você." };
    } else {
      throw new Error("Tipo de deleção inválido.");
    }
  }
}
