/**
 * Vigenère Cipher Implementation for Web
 * Adapted from the original Node.js version for browser compatibility
 */

/**
 * Função para criptografar uma mensagem usando a Cifra de Vigenère.
 * @param {string} plainText - O texto a ser criptografado (até 128 caracteres).
 * @param {string} key - A palavra-chave.
 * @returns {string} - O texto cifrado.
 */
function encrypt(plainText, key) {
    let encryptedText = '';
    for (let i = 0; i < plainText.length; i++) {
        const charCode = plainText.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);

        // Aplica a cifra apenas em letras maiúsculas A-Z
        if (charCode >= 65 && charCode <= 90) {
            const encryptedCharCode = ((charCode - 65 + (keyChar - 65)) % 26) + 65;
            encryptedText += String.fromCharCode(encryptedCharCode);
        } else {
            // Mantém outros caracteres (espaços, números, etc.) como estão
            encryptedText += plainText[i];
        }
    }
    return encryptedText;
}

/**
 * Função para descriptografar uma mensagem da Cifra de Vigenère.
 * @param {string} encryptedText - O texto cifrado.
 * @param {string} key - A palavra-chave.
 * @returns {string} - O texto original.
 */
function decrypt(encryptedText, key) {
    let decryptedText = '';
    for (let i = 0; i < encryptedText.length; i++) {
        const charCode = encryptedText.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);

        // Descriptografa apenas letras maiúsculas A-Z
        if (charCode >= 65 && charCode <= 90) {
            const decryptedCharCode = ((charCode - 65 - (keyChar - 65) + 26) % 26) + 65;
            decryptedText += String.fromCharCode(decryptedCharCode);
        } else {
            decryptedText += encryptedText[i];
        }
    }
    return decryptedText;
}

/**
 * Função para validar se o texto contém apenas caracteres válidos
 * @param {string} text - Texto a ser validado
 * @returns {boolean} - True se válido, false caso contrário
 */
function isValidText(text) {
    // Aceita letras (A-Z, a-z), números, espaços e alguns caracteres especiais
    const validPattern = /^[A-Za-z0-9\s.,!?;:'"()\-]*$/;
    return validPattern.test(text);
}

/**
 * Função para validar se a chave contém apenas letras
 * @param {string} key - Chave a ser validada
 * @returns {boolean} - True se válida, false caso contrário
 */
function isValidKey(key) {
    // Aceita apenas letras (A-Z, a-z)
    const keyPattern = /^[A-Za-z]+$/;
    return keyPattern.test(key);
}

/**
 * Função para normalizar o texto (converter para maiúsculas)
 * @param {string} text - Texto a ser normalizado
 * @returns {string} - Texto normalizado
 */
function normalizeText(text) {
    return text.toUpperCase();
} 