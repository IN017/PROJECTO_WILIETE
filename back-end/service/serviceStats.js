import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceStats {

 
  static async listarUsuarios() {
    try {
      const usuarios = await prisma.usuario.findMany({
        include: {
          disciplinas: true,
          turmas: true
        }
      });

      return usuarios.map(({ senha, ...rest }) => rest);
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  
  static async listarCursos() {
    try {
      return await prisma.curso.findMany();
    } catch (error) {
      throw new Error(`Erro ao listar cursos: ${error.message}`);
    }
  }

  
  static async listarAlunos() {
    try {
      return await prisma.aluno.findMany();
    } catch (error) {
      throw new Error(`Erro ao listar alunos: ${error.message}`);
    }
  }

  
  static async listarAvisos() {
    try {
      return await prisma.aviso.findMany();
    } catch (error) {
      throw new Error(`Erro ao listar avisos: ${error.message}`);
    }
  }

  
  static async listarEventos() {
    try {
      return await prisma.evento.findMany();
    } catch (error) {
      throw new Error(`Erro ao listar eventos: ${error.message}`);
    }
  }

 
  static async listarReunioes() {
    try {
      return await prisma.reuniao.findMany();
    } catch (error) {
      throw new Error(`Erro ao listar reuniões: ${error.message}`);
    }
  }

 
  static async listarTurmas() {
    try {
      return await prisma.turma.findMany();
    } catch (error) {
      throw new Error(`Erro ao listar turmas: ${error.message}`);
    }
  }

 
  static async getStats() {
    try {
      const [
        usuarios,
        cursos,
        alunos,
        avisos,
        eventos,
        reunioes,
        turmas,
        disciplinas
      ] = await Promise.all([
        prisma.usuario.findMany(),
        prisma.curso.findMany(),
        prisma.aluno.findMany(),
        prisma.aviso.findMany(),
        prisma.evento.findMany(),
        prisma.reuniao.findMany(),
        prisma.turma.findMany(),
        prisma.disciplina.findMany()
      ]);

      const professores = usuarios.filter(u => u.perfil === "PROFESSOR").length;
      const encarregados = usuarios.filter(u => u.perfil === "ENCARREGADO").length;

      return {
        usuarios: usuarios.length,
        professores,
        encarregados,
        cursos: cursos.length,
        alunos: alunos.length,
        avisos: avisos.length,
        eventos: eventos.length,
        reunioes: reunioes.length,
        turmas: turmas.length,
        disciplinas: disciplinas.length
      };

    } catch (error) {
      throw new Error(`Erro ao obter estatísticas: ${error.message}`);
    }
  }
}