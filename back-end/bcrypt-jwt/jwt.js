import "dotenv/config";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRATION_TIME = process.env.EXPIRATION_TIME || "1h";

// Verificando se as variáveis de ambiente estão definidas
if(!SECRET_KEY) {
    throw new Error("A chave secreta para JWT não está definida. Por favor, defina a variável de ambiente SECRET_KEY.");
}


// Classe para manipulação de JWT
export class JWT {
    static gerarToken(payload) {
        try {
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME,
             }
                
            );
            return token;
        } catch (error) {
            throw new Error(`Erro ao gerar token JWT: ${error.message}`);
        }
    }

    static verificarToken(token) {
        if (!token) {
            throw new Error("Token não fornecido.Token JWT é obrigatório para verificação.");
        }
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (error) {
            throw new Error(`Token inválido. Erro ao verificar token JWT: ${error.message}`);
        }
    }
}