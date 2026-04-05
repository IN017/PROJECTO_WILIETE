import serviceFeedback from '../service/serviceFeedback.js';

class ControllerFeedback {
  // Criar feedback
  async criarFeedback(req, res) {
    try {
      const { nome, email, assunto, mensagem } = req.body;
      if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }
      const feedback = await serviceFeedback.criarFeedback({ nome, email, assunto, mensagem });
      res.status(201).json(feedback);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Listar feedbacks
  async listarFeedbacks(req, res) {
    try {
      const feedbacks = await serviceFeedback.listarFeedbacks();
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Remover feedback
  async removerFeedback(req, res) {
    try {
      const { id } = req.params;
      await serviceFeedback.removerFeedback(id);
      res.json({ message: 'Feedback removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ControllerFeedback();