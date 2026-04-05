import express from 'express';
import controllerFeedback from '../controller/controllerFeedback.js';

const router = express.Router();

// Rota para criar feedback
router.post('/', controllerFeedback.criarFeedback);

// Rota para listar feedbacks
router.get('/', controllerFeedback.listarFeedbacks);

// Rota para remover feedback
router.delete('/:id', controllerFeedback.removerFeedback);

export default router;