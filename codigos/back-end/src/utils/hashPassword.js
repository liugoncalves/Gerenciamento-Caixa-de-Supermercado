import bcrypt from 'bcrypt';

/**
 * Criptografa uma senha usando bcrypt.
 * @param {string} senha - Senha em texto plano.
 * @returns {Promise<string>} - Senha criptografada.
 */
export async function hashPassword(senha) {
    const saltRounds = 10;
    try {
        return await bcrypt.hash(senha, saltRounds);
    } catch (error) {
        throw new Error(`Erro ao criptografar a senha: ${error.message}`);
    }
}
