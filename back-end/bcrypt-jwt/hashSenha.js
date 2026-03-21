import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Número de rounds para o salt

// Função para hash da senha
export async function hashSenha(senha) {
    try {
        const hash = await bcrypt.hash(senha, SALT_ROUNDS);
        return hash;
    } catch (error) {
        throw new Error(`Erro ao hash da senha: ${error.message}`);
    }
}

// Função para comparar senhas
export async function compareSenha(senha, hash) {
    try {
        const isMatch = await bcrypt.compare(senha, hash);
        return isMatch;
    } catch (error) {
        throw new Error(`Erro ao comparar senhas: ${error.message}`);
    }
}