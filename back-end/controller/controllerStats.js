import { ServiceStats } from "../service/serviceStats.js";

export class ControllerStats {

  static async getStats(req, res) {
    try {
      const stats = await ServiceStats.getStats();

      return res.status(200).json({
        success: true,
        message: "Estatísticas carregadas com sucesso",
        data: stats
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Erro ao obter estatísticas"
      });
    }
  }

  
  static async listarUsuarios(req, res) {
    try {
      const usuarios = await ServiceStats.listarUsuarios();

      return res.status(200).json({
        success: true,
        data: usuarios
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

 
  static async listarCursos(req, res) {
    try {
      const cursos = await ServiceStats.listarCursos();

      return res.status(200).json({
        success: true,
        data: cursos
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  
  static async listarAlunos(req, res) {
    try {
      const alunos = await ServiceStats.listarAlunos();

      return res.status(200).json({
        success: true,
        data: alunos
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

 
  static async listarAvisos(req, res) {
    try {
      const avisos = await ServiceStats.listarAvisos();

      return res.status(200).json({
        success: true,
        data: avisos
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }


  static async listarEventos(req, res) {
    try {
      const eventos = await ServiceStats.listarEventos();

      return res.status(200).json({
        success: true,
        data: eventos
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

 
  static async listarReunioes(req, res) {
    try {
      const reunioes = await ServiceStats.listarReunioes();

      return res.status(200).json({
        success: true,
        data: reunioes
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }


  static async listarTurmas(req, res) {
    try {
      const turmas = await ServiceStats.listarTurmas();

      return res.status(200).json({
        success: true,
        data: turmas
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}