/**
 * Collection of Cipher Algorithms for Performance Comparison
 * Includes: Vigenère, Caesar, and Simple Substitution Ciphers
 */

// ============================================================================
// VIGENÈRE CIPHER (Enhanced version)
// ============================================================================

/**
 * Vigenère Cipher Encryption
 */
function vigenereEncrypt(plainText, key) {
    let encryptedText = '';
    const normalizedKey = key.toUpperCase();
    
    for (let i = 0; i < plainText.length; i++) {
        const charCode = plainText.charCodeAt(i);
        const keyChar = normalizedKey.charCodeAt(i % normalizedKey.length);

        if (charCode >= 65 && charCode <= 90) { // A-Z
            const encryptedCharCode = ((charCode - 65 + (keyChar - 65)) % 26) + 65;
            encryptedText += String.fromCharCode(encryptedCharCode);
        } else {
            encryptedText += plainText[i];
        }
    }
    return encryptedText;
}

/**
 * Vigenère Cipher Decryption
 */
function vigenereDecrypt(encryptedText, key) {
    let decryptedText = '';
    const normalizedKey = key.toUpperCase();
    
    for (let i = 0; i < encryptedText.length; i++) {
        const charCode = encryptedText.charCodeAt(i);
        const keyChar = normalizedKey.charCodeAt(i % normalizedKey.length);

        if (charCode >= 65 && charCode <= 90) { // A-Z
            const decryptedCharCode = ((charCode - 65 - (keyChar - 65) + 26) % 26) + 65;
            decryptedText += String.fromCharCode(decryptedCharCode);
        } else {
            decryptedText += encryptedText[i];
        }
    }
    return decryptedText;
}

// ============================================================================
// CAESAR CIPHER
// ============================================================================

/**
 * Caesar Cipher Encryption
 */
function caesarEncrypt(plainText, shift) {
    let encryptedText = '';
    const normalizedShift = parseInt(shift) % 26;
    
    for (let i = 0; i < plainText.length; i++) {
        const charCode = plainText.charCodeAt(i);
        
        if (charCode >= 65 && charCode <= 90) { // A-Z
            const encryptedCharCode = ((charCode - 65 + normalizedShift) % 26) + 65;
            encryptedText += String.fromCharCode(encryptedCharCode);
        } else {
            encryptedText += plainText[i];
        }
    }
    return encryptedText;
}

/**
 * Caesar Cipher Decryption
 */
function caesarDecrypt(encryptedText, shift) {
    let decryptedText = '';
    const normalizedShift = parseInt(shift) % 26;
    
    for (let i = 0; i < encryptedText.length; i++) {
        const charCode = encryptedText.charCodeAt(i);
        
        if (charCode >= 65 && charCode <= 90) { // A-Z
            const decryptedCharCode = ((charCode - 65 - normalizedShift + 26) % 26) + 65;
            decryptedText += String.fromCharCode(decryptedCharCode);
        } else {
            decryptedText += encryptedText[i];
        }
    }
    return decryptedText;
}

// ============================================================================
// SIMPLE SUBSTITUTION CIPHER
// ============================================================================

/**
 * Generate a substitution key based on a keyword
 */
function generateSubstitutionKey(keyword) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const normalizedKeyword = keyword.toUpperCase().replace(/[^A-Z]/g, '');
    
    // Remove duplicates from keyword
    let uniqueKeyword = '';
    for (let char of normalizedKeyword) {
        if (!uniqueKeyword.includes(char)) {
            uniqueKeyword += char;
        }
    }
    
    // Create substitution alphabet
    let substitutionAlphabet = uniqueKeyword;
    for (let char of alphabet) {
        if (!substitutionAlphabet.includes(char)) {
            substitutionAlphabet += char;
        }
    }
    
    return substitutionAlphabet;
}

/**
 * Simple Substitution Cipher Encryption
 */
function substitutionEncrypt(plainText, keyword) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const substitutionKey = generateSubstitutionKey(keyword);
    let encryptedText = '';
    
    for (let i = 0; i < plainText.length; i++) {
        const char = plainText[i];
        const charCode = char.charCodeAt(0);
        
        if (charCode >= 65 && charCode <= 90) { // A-Z
            const alphabetIndex = charCode - 65;
            encryptedText += substitutionKey[alphabetIndex];
        } else {
            encryptedText += char;
        }
    }
    return encryptedText;
}

/**
 * Simple Substitution Cipher Decryption
 */
function substitutionDecrypt(encryptedText, keyword) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const substitutionKey = generateSubstitutionKey(keyword);
    let decryptedText = '';
    
    for (let i = 0; i < encryptedText.length; i++) {
        const char = encryptedText[i];
        const charCode = char.charCodeAt(0);
        
        if (charCode >= 65 && charCode <= 90) { // A-Z
            const substitutionIndex = substitutionKey.indexOf(char);
            if (substitutionIndex !== -1) {
                decryptedText += alphabet[substitutionIndex];
            } else {
                decryptedText += char;
            }
        } else {
            decryptedText += char;
        }
    }
    return decryptedText;
}

// ============================================================================
// CIPHER PERFORMANCE TESTING
// ============================================================================

/**
 * Measure execution time of a function
 */
function measureTime(func, iterations = 1000) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        func();
    }
    const end = performance.now();
    return (end - start) / iterations; // Average time per operation in milliseconds
}

/**
 * Test cipher performance
 */
function testCipherPerformance(plainText, key, iterations = 1000) {
    const normalizedText = plainText.toUpperCase();
    const normalizedKey = key.toUpperCase();
    
    const results = {
        vigenere: {
            name: 'Cifra de Vigenère',
            encryptTime: 0,
            decryptTime: 0,
            encrypted: '',
            decrypted: '',
            complexity: 'O(n)',
            security: 'Média'
        },
        caesar: {
            name: 'Cifra de César',
            encryptTime: 0,
            decryptTime: 0,
            encrypted: '',
            decrypted: '',
            complexity: 'O(n)',
            security: 'Baixa'
        },
        substitution: {
            name: 'Cifra de Substituição',
            encryptTime: 0,
            decryptTime: 0,
            encrypted: '',
            decrypted: '',
            complexity: 'O(n)',
            security: 'Média-Alta'
        }
    };
    
    // Test Vigenère Cipher
    results.vigenere.encrypted = vigenereEncrypt(normalizedText, normalizedKey);
    results.vigenere.encryptTime = measureTime(() => {
        vigenereEncrypt(normalizedText, normalizedKey);
    }, iterations);
    
    results.vigenere.decryptTime = measureTime(() => {
        vigenereDecrypt(results.vigenere.encrypted, normalizedKey);
    }, iterations);
    results.vigenere.decrypted = vigenereDecrypt(results.vigenere.encrypted, normalizedKey);
    
    // Test Caesar Cipher (using first char of key as shift)
    const caesarShift = normalizedKey.charCodeAt(0) - 65 + 1; // A=1, B=2, etc.
    results.caesar.encrypted = caesarEncrypt(normalizedText, caesarShift);
    results.caesar.encryptTime = measureTime(() => {
        caesarEncrypt(normalizedText, caesarShift);
    }, iterations);
    
    results.caesar.decryptTime = measureTime(() => {
        caesarDecrypt(results.caesar.encrypted, caesarShift);
    }, iterations);
    results.caesar.decrypted = caesarDecrypt(results.caesar.encrypted, caesarShift);
    
    // Test Substitution Cipher
    results.substitution.encrypted = substitutionEncrypt(normalizedText, normalizedKey);
    results.substitution.encryptTime = measureTime(() => {
        substitutionEncrypt(normalizedText, normalizedKey);
    }, iterations);
    
    results.substitution.decryptTime = measureTime(() => {
        substitutionDecrypt(results.substitution.encrypted, normalizedKey);
    }, iterations);
    results.substitution.decrypted = substitutionDecrypt(results.substitution.encrypted, normalizedKey);
    
    return results;
}

/**
 * Generate test data of specified length
 */
function generateTestData(length = 100) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.trim();
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

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