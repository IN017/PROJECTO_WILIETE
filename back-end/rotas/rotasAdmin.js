import { Router } from "express";
import { JWT } from "../bcrypt-jwt/jwt.js";
import { ControllerUsuarios } from "../controller/controllersUsuario.js";
 
export const routerAdmin = Router();
 
routerAdmin.post("/admin/login", (req, res) => {
  try {
    const { utilizador, senha } = req.body;
 
   // debug console.log("Body recebido:", req.body); 
 
    if (!utilizador || !senha) {
      return res.status(400).json({ error: "Utilizador e senha obrigatórios." });
    }
 
    const adminUser  = process.env.ADMIN_USER  || "admin";
    const adminSenha = process.env.ADMIN_SENHA  || "schoolconnect2026";
 
    if (utilizador !== adminUser || senha !== adminSenha) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = JWT.gerarToken({
      id: 0, // ID especial para admin
      perfil: "ADMIN",
      utilizador
    });

    return res.json({ token });
  } catch (error) {
    console.error("Erro no login admin:", error);
    return res.status(500).json({ error: "Erro interno." });
  }
});

routerAdmin.post("/admin/codigos", ControllerUsuarios.criarCodigoProfessor);
routerAdmin.get("/admin/codigos", ControllerUsuarios.listarCodigosProfessor);