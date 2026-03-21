import { JWT } from "../bcrypt-jwt/jwt.js";

export class MiddlewareAutenticacao {

    static autenticar(req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Token não fornecido" });
            }

            const token = authHeader.split(" ")[1];

            const decoded = JWT.verificarToken(token);

            req.user = decoded;

            return next();

        } catch (error) {
            return res.status(401).json({ error: "Token inválido ou expirado" });
        }
    }

}