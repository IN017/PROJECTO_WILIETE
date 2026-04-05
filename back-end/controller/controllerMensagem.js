import { ServiceMensagem } from "../service/serviceMensagem.js";
import { enviarMensagemWS } from "../websocket.js";

export class ControllerMensagem {
  static async criarMensagem(req, res) {
    try {
      const file = req.file;
      const payload = {
        ...req.body,
        arquivoNome: file?.originalname,
        arquivoTipo: file?.mimetype,
        arquivoTamanho: file?.size,
        arquivoUrl: file ? `/uploads/arquivos/${file.filename}` : undefined,
      };

      const mensagem = await ServiceMensagem.criarMensagem(payload);
      return res.status(201).json(mensagem);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async listarMensagens(req, res) {
    try {
      const { usuarioId } = req.query;
      const mensagens = await ServiceMensagem.listarMensagens(usuarioId);
      return res.status(200).json(mensagens);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async obterMensagemPorId(req, res) {
    try {
      const { id } = req.params;
      const mensagem = await ServiceMensagem.obterMensagemPorId(id);
      return res.status(200).json(mensagem);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async atualizarMensagem(req, res) {
    try {
      const { id } = req.params;
      const { conteudo } = req.body;
      const usuarioId = req.user.id;
      const mensagem = await ServiceMensagem.atualizarMensagem(id, { conteudo, usuarioId });
      
      // Notificar o destinatário via WebSocket
      enviarMensagemWS(mensagem.destinatarioId, {
        tipo: 'mensagem_editada',
        mensagemId: mensagem.id,
        conteudo: mensagem.conteudo,
        destinatarioId: mensagem.destinatarioId
      });
      
      return res.status(200).json(mensagem);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async deletarMensagem(req, res) {
    try {
      const { id } = req.params;
      const { tipo } = req.body; // 'para_mim' ou 'para_todos'
      const usuarioId = req.user?.id;
      
      if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }
      
      // Obter a mensagem antes de deletar para ter o destinatarioId
      const mensagemExistente = await ServiceMensagem.obterMensagemPorId(id);
      const resultado = await ServiceMensagem.deletarMensagem(id, usuarioId, tipo || 'para_todos');
      
      // Notificar o destinatário via WebSocket se deletado para todos
      if (tipo === 'para_todos') {
        enviarMensagemWS(mensagemExistente.destinatarioId, {
          tipo: 'mensagem_deletada',
          mensagemId: id,
          destinatarioId: mensagemExistente.destinatarioId
        });
      } else if (tipo === 'para_mim') {
        // Notificar o próprio usuário ou algo, mas talvez não necessário
      }
      
      return res.status(200).json(resultado);
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
      return res.status(400).json({ error: error.message });
    }
  }
}
