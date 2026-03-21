import { ServiceRelatorio } from "../service/serviceRelatorio";

export class ControllerRelatorio {
    static async criarRelatorio(req, res) {
        try {
            const { titulo, conteudo } = req.body;  
            const relatorioCriado = await ServiceRelatorio.gerarRelatorioNotas(titulo, conteudo);
            res.status(201).json(relatorioCriado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarRelatorios(req, res) {
        try {
            const relatorios = await ServiceRelatorio.listarRelatorios();
            res.status(200).json(relatorios);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obterRelatorioPorId(req, res) {
        try {
            const { id } = req.params;
            const relatorio = await ServiceRelatorio.obterRelatorioPorId(id);
            res.status(200).json(relatorio);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarRelatorio(req, res) {
        try {
            const { id } = req.params;
            const { titulo, conteudo } = req.body;
            const relatorioAtualizado = await ServiceRelatorio.atualizarRelatorio(id, titulo, conteudo);
            res.status(200).json(relatorioAtualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarRelatorio(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ServiceRelatorio.deletarRelatorio(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

 }