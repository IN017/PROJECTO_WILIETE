import { prisma } from "../prismaClient/prismaClient.js";
import { hashSenha, compareSenha } from "../bcrypt-jwt/hashSenha.js";
import {JWT} from "../bcrypt-jwt/jwt.js"

export class ServiceUsuario {

    // CRIAR USUÁRIO
static async criarUsuario(dados) {
  try {
    const {
      nome, email, senha, telefone, perfil, imagem,
      // Encarregado
      relacaoEducando, numeroMatricula,
      // Professor
      codigoVerificacao, disciplinas, cursos, turmas
    } = dados;

    if (!nome?.trim() || !email?.trim() || !senha || !telefone || !perfil) {
      throw new Error("Campos obrigatórios em falta.");
    }

    // Validações específicas por perfil
    const relacaoMap = {
      'Pai': 'PAI',
      'Mãe': 'MAE',
      'Mae': 'MAE',
      'Tutor Legal': 'TUTOR',
      'Tutor': 'TUTOR'
    };

    const relacaoConvertida = relacaoEducando ? relacaoMap[relacaoEducando] || relacaoEducando : null;

    if (perfil === "ENCARREGADO") {
      if (!numeroMatricula?.trim()) throw new Error("Número de matrícula do aluno obrigatório.");
      if (!relacaoConvertida?.trim()) throw new Error("Relação com o educando obrigatória.");
      if (!["PAI", "MAE", "TUTOR"].includes(relacaoConvertida)) throw new Error("Relação com o educando inválida.");
    }

    if (perfil === "PROFESSOR") {
      if (!codigoVerificacao?.trim()) throw new Error("Código de verificação obrigatório.");
      
    }

    const emailFormatado = email.trim().toLowerCase();

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: emailFormatado }
    });
    if (usuarioExistente) throw new Error("Email já cadastrado.");

    const telefoneExistente = await prisma.usuario.findUnique({
      where: { telefone }
    });
    if (telefoneExistente) throw new Error("Telefone já cadastrado.");

    // Se for encarregado, verificar se o número de matrícula existe
    if (perfil === "ENCARREGADO") {
      const alunoExiste = await prisma.aluno.findUnique({
        where: { numero_matricula: numeroMatricula }
      });
      if (!alunoExiste) throw new Error("Aluno com esse número de matrícula não encontrado.");
    }

    const senhaHash = await hashSenha(senha);

    const disciplinasArray = disciplinas
      ? Array.isArray(disciplinas)
        ? disciplinas
        : [disciplinas]
      : undefined;

    const cursosArray = cursos
      ? Array.isArray(cursos)
        ? cursos
        : [cursos]
      : undefined;

    const turmasArray = turmas
      ? Array.isArray(turmas)
        ? turmas
        : [turmas]
      : undefined;

    const usuarioCriado = await prisma.usuario.create({
      data: {
        nome,
        email: emailFormatado,
        senha: senhaHash,
        telefone,
        perfil,
        imagem: imagem || null,

        // Campos condicionais
        relacaoEducando: perfil === "ENCARREGADO" ? relacaoConvertida : null,
        codigoVerificacao: perfil === "PROFESSOR" ? codigoVerificacao : null,
      


        // Disciplinas (many-to-many, só para professor)
        disciplinas: disciplinasArray
          ? { connect: disciplinasArray.map(id => ({ id: Number(id) })) }
          : undefined,

        // Cursos (many-to-many, só para professor)
        cursos: cursosArray
          ? { connect: cursosArray.map(id => ({ id: Number(id) })) }
          : undefined
      },
      include: { 
        disciplinas: true,
        turmas: true,
        cursos: true
      }
    });

    // Se for professor, associar turmas
    if (perfil === "PROFESSOR" && turmasArray && turmasArray.length > 0) {
      await prisma.turma.updateMany({
        where: { id: { in: turmasArray.map(id => Number(id)) } },
        data: { usuarioId: usuarioCriado.id }
      });
    }

    // Se for encarregado, ligar ao aluno
    if (perfil === "ENCARREGADO") {
      await prisma.aluno.update({
        where: { numero_matricula: numeroMatricula },
        data: { encarregadoId: usuarioCriado.id }
      });
    }

    const { senha: _, ...usuarioSemSenha } = usuarioCriado;
    return usuarioSemSenha;

  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
}

// LOGIN

static async loginUsuario(email, senha) {
  try {
    if (!email?.trim() || !senha) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const emailFormatado = email.trim().toLowerCase();

    const usuario = await prisma.usuario.findUnique({
      where: { email: emailFormatado },
      include: {
        disciplinas: true,
        turmas: true,
        cursos: true
      }
    });

    if (!usuario) {
      throw new Error("Email ou senha inválidos.");
    }

    // comparar senha
    const senhaValida = await compareSenha(senha, usuario.senha);

    if (!senhaValida) {
      throw new Error("Email ou senha inválidos.");
    }

    // gerar token
    const token = JWT.gerarToken({
      id: usuario.id,
      email: usuario.email,
      perfil: usuario.perfil
    });

    const { senha: _, ...usuarioSemSenha } = usuario;

    return {
      usuario: usuarioSemSenha,
      token
    };

  } catch (error) {
    throw new Error(`Erro no login: ${error.message}`);
  }
}


    // LISTAR USUÁRIOS
   static async listarUsuarios() {
    try {
        const usuarios = await prisma.usuario.findMany({
            include: {
                disciplinas: true,
                turmas: true,
                cursos: true
            }
        });

        return usuarios.map(({ senha, ...rest }) => rest);

    } catch (error) {
        throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
}



    // LISTAR POR ID
   static async listarUsuarioPorId(id) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: parseInt(id) },
            include: {
                disciplinas: true,
                turmas: true,
                cursos: true
            }
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        const { senha, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;

    } catch (error) {
        throw new Error(`Erro ao listar usuário por ID: ${error.message}`);
    }
}
    //ATUALIZAR USUÁRIO
    static async atualizarUsuario(id, dados) {
    try {
        const {
            nome, email, senha, telefone, perfil, imagem, disciplinas, cursos,
            // Encarregado
            relacaoEducando, numeroMatricula,
            // Professor
            codigoVerificacao
        } = dados;

        const usuarioExistente = await prisma.usuario.findUnique({
            where: { id: parseInt(id) }
        });

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado.");
        }

        // Determinar o perfil final (pode estar a atualizar ou manter o atual)
        const perfilFinal = perfil ?? usuarioExistente.perfil;

        // Validações condicionais por perfil
        if (perfilFinal === "ENCARREGADO") {
            // Só valida se estiver a enviar número de matrícula novo
            if (numeroMatricula) {
                const alunoExiste = await prisma.aluno.findUnique({
                    where: { numero_matricula: numeroMatricula }
                });
                if (!alunoExiste) {
                    throw new Error("Aluno com esse número de matrícula não encontrado.");
                }
            }
        }

        let senhaHash = usuarioExistente.senha;
        if (senha) {
            senhaHash = await hashSenha(senha);
        }

        const disciplinasArray = disciplinas
            ? Array.isArray(disciplinas)
                ? disciplinas
                : [disciplinas]
            : undefined;

        const cursosArray = cursos
            ? Array.isArray(cursos)
                ? cursos
                : [cursos]
            : undefined;

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: {
                nome:     nome     ?? usuarioExistente.nome,
                email:    email    ? email.trim().toLowerCase() : usuarioExistente.email,
                senha:    senhaHash,
                telefone: telefone ?? usuarioExistente.telefone,
                perfil:   perfilFinal,
                imagem:   imagem   ?? usuarioExistente.imagem,

                // Campos do Encarregado
                relacaoEducando: perfilFinal === "ENCARREGADO"
                    ? (relacaoEducando ?? usuarioExistente.relacaoEducando)
                    : null,

                // Campos do Professor
                codigoVerificacao: perfilFinal === "PROFESSOR"
                    ? (codigoVerificacao ?? usuarioExistente.codigoVerificacao)
                    : null,

                // Many-to-many (só professor)
                disciplinas: disciplinasArray
                    ? { set: disciplinasArray.map(id => ({ id: Number(id) })) }
                    : undefined,

                cursos: cursosArray
                    ? { set: cursosArray.map(id => ({ id: Number(id) })) }
                    : undefined
            },
            include: {
                disciplinas: true,
                turmas: true,
                cursos: true
            }
        });

        // Se for encarregado e enviou novo número de matrícula, atualizar ligação ao aluno
        if (perfilFinal === "ENCARREGADO" && numeroMatricula) {
            await prisma.aluno.update({
                where: { numero_matricula: numeroMatricula },
                data: { encarregadoId: usuarioAtualizado.id }
            });
        }

        const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
        return usuarioSemSenha;

    } catch (error) {
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
}


    // DELETAR USUÁRIO
   static async deletarUsuario(id) {
    try {
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { id: parseInt(id) }
        });

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado.");
        }

        await prisma.usuario.delete({
            where: { id: parseInt(id) }
        });

        return { mensagem: "Usuário deletado com sucesso." };

    } catch (error) {
        throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
}
}