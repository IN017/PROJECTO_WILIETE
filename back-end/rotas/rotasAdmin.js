import { Router } from "express";
import { JWT } from "../bcrypt-jwt/jwt.js";
 
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
 
    // Usar SECRET_KEY (igual ao resto do projecto) ou JWT_SECRET como fallback
    const segredo = process.env.SECRET_KEY || process.env.JWT_SECRET || "segredo_jwt";
 
    const token = JWT.gerarToken(
      { perfil: "ADMIN", utilizador },
      segredo,
      { expiresIn: process.env.EXPIRATION_TIME || "8h" }
    );
 
    return res.status(200).json({
      token,
      admin: { utilizador, perfil: "ADMIN" }
    });
 
  } catch (error) {
    console.error("Erro no login admin:", error);
    return res.status(500).json({ error: "Erro interno." });
  }
});