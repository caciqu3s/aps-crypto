/**
 * Cipher Performance Comparison Application
 * Compares 3 cipher algorithms: Vigenère, Caesar, and Substitution
 */

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set default test data
    document.getElementById('testMessage').value = 'HELLO WORLD';
    document.getElementById('testKey').value = 'TESTKEY';
    
    // Initialize encryption tab functionality
    setupEncryptionTab();
    
    // Initialize individual test tab functionality
    setupIndividualTestTab();
});

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div class="toast" id="${toastId}" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="fas ${getToastIcon(type)} me-2 text-${getToastColor(type)}"></i>
                <strong class="me-auto">Sistema de Criptografia</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    // Initialize and show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

/**
 * Get icon for toast type
 */
function getToastIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

/**
 * Get color for toast type
 */
function getToastColor(type) {
    switch (type) {
        case 'success': return 'success';
        case 'error': return 'danger';
        case 'warning': return 'warning';
        default: return 'info';
    }
}

// Add some keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to process
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        processMessage();
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        messageInput.value = '';
        keyInput.value = '';
        resultSection.style.display = 'none';
        updateCharacterCount();
        validateInputs();
    }
});

// Add sample text functionality (for testing)
function loadSampleData() {
    messageInput.value = 'HELLO WORLD';
    keyInput.value = 'KEY';
    updateCharacterCount();
    validateInputs();
}

// ============================================================================
// CIPHER COMPARISON FUNCTIONALITY
// ============================================================================

/**
 * Toggle the comparison mode section
 */
function toggleComparisonMode() {
    const comparisonSection = document.getElementById('comparisonSection');
    const toggleBtn = document.getElementById('toggleComparison');
    
    if (comparisonSection.style.display === 'none') {
        comparisonSection.style.display = 'block';
        comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        toggleBtn.innerHTML = '<i class="fas fa-times me-2"></i>Fechar Comparação';
        toggleBtn.className = 'btn btn-outline-danger btn-lg';
    } else {
        comparisonSection.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-chart-bar me-2"></i>Comparar Performance das Cifras';
        toggleBtn.className = 'btn btn-outline-secondary btn-lg';
    }
}

/**
 * Generate random test data
 */
function generateRandomTest() {
    const testMessage = document.getElementById('testMessage');
    const testKey = document.getElementById('testKey');
    
    // Generate random message of 50-100 characters
    const length = Math.floor(Math.random() * 51) + 50;
    const randomMessage = generateTestData(length);
    
    // Generate random key of 5-10 characters
    const keyLength = Math.floor(Math.random() * 6) + 5;
    const randomKey = generateTestData(keyLength).replace(/\s/g, '').substring(0, keyLength);
    
    testMessage.value = randomMessage;
    testKey.value = randomKey;
    
    showToast('Dados de teste gerados aleatoriamente!', 'success');
}

/**
 * Run performance test for all cipher algorithms
 */
function runPerformanceTest() {
    const testMessage = document.getElementById('testMessage').value.trim();
    const testKey = document.getElementById('testKey').value.trim();
    const iterations = parseInt(document.getElementById('iterations').value);
    const runTestBtn = document.getElementById('runTestBtn');
    const comparisonResults = document.getElementById('comparisonResults');
    
    // Validate inputs
    if (!testMessage || !testKey) {
        showToast('Por favor, preencha o texto e a chave para teste.', 'error');
        return;
    }
    
    if (!isValidKey(testKey)) {
        showToast('A chave deve conter apenas letras.', 'error');
        return;
    }
    
    // Show loading state
    runTestBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Executando Testes...';
    runTestBtn.disabled = true;
    
    // Run tests with a small delay to show loading state
    setTimeout(() => {
        try {
            const results = testCipherPerformance(testMessage, testKey, iterations);
            displayComparisonResults(results, iterations, testMessage.length);
            comparisonResults.style.display = 'block';
            comparisonResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            showToast('Teste de performance concluído!', 'success');
        } catch (error) {
            showToast('Erro ao executar teste de performance.', 'error');
            console.error('Performance test error:', error);
        }
        
        // Restore button state
        runTestBtn.innerHTML = '<i class="fas fa-play me-2"></i>Executar Teste de Performance';
        runTestBtn.disabled = false;
    }, 100);
}

/**
 * Display comparison results in table and chart
 */
function displayComparisonResults(results, iterations, messageLength) {
    const tableBody = document.getElementById('resultsTableBody');
    
    // Clear previous results
    tableBody.innerHTML = '';
    
    // Create table rows
    Object.keys(results).forEach(cipherKey => {
        const cipher = results[cipherKey];
        const row = document.createElement('tr');
        
        // Find the fastest times for highlighting
        const encryptTimes = Object.values(results).map(c => c.encryptTime);
        const decryptTimes = Object.values(results).map(c => c.decryptTime);
        const fastestEncrypt = Math.min(...encryptTimes);
        const fastestDecrypt = Math.min(...decryptTimes);
        
        row.innerHTML = `
            <td>
                <strong class="d-block">${cipher.name.split(' ')[2] || cipher.name.split(' ')[0]}</strong>
                <small class="text-muted">${getAlgorithmDescription(cipherKey)}</small>
            </td>
            <td class="${cipher.encryptTime === fastestEncrypt ? 'table-success fw-bold' : ''}">
                ${formatTime(cipher.encryptTime)}
                ${cipher.encryptTime === fastestEncrypt ? '<i class="fas fa-trophy text-warning"></i>' : ''}
            </td>
            <td class="${cipher.decryptTime === fastestDecrypt ? 'table-success fw-bold' : ''}">
                ${formatTime(cipher.decryptTime)}
                ${cipher.decryptTime === fastestDecrypt ? '<i class="fas fa-trophy text-warning"></i>' : ''}
            </td>
            <td>
                <span class="badge ${getSecurityBadgeClass(cipher.security)} small">${cipher.security}</span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="showCipherResult('${cipherKey}', '${cipher.encrypted}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Create performance chart
    createPerformanceChart(results);
    
    // Add test summary
    addTestSummary(iterations, messageLength);
}

/**
 * Format time in appropriate units
 */
function formatTime(milliseconds) {
    if (milliseconds < 0.001) {
        return `${(milliseconds * 1000).toFixed(3)} μs`;
    } else if (milliseconds < 1) {
        return `${milliseconds.toFixed(3)} ms`;
    } else {
        return `${milliseconds.toFixed(2)} ms`;
    }
}

/**
 * Get algorithm description
 */
function getAlgorithmDescription(cipherKey) {
    const descriptions = {
        vigenere: 'Chave repetitiva',
        caesar: 'Deslocamento simples', 
        substitution: 'Troca de alfabeto'
    };
    return descriptions[cipherKey] || '';
}

/**
 * Get security badge class
 */
function getSecurityBadgeClass(security) {
    switch (security) {
        case 'Baixa': return 'bg-danger';
        case 'Média': return 'bg-warning text-dark';
        case 'Média-Alta': return 'bg-success';
        default: return 'bg-secondary';
    }
}

/**
 * Show cipher result in modal/toast
 */
function showCipherResult(cipherKey, encrypted) {
    const cipherNames = {
        vigenere: 'Vigenère',
        caesar: 'César', 
        substitution: 'Substituição'
    };
    
    const truncated = encrypted.length > 100 ? encrypted.substring(0, 100) + '...' : encrypted;
    showToast(`Resultado ${cipherNames[cipherKey]}: ${truncated}`, 'info');
}

/**
 * Create simple performance chart using canvas
 */
function createPerformanceChart(results) {
    const canvas = document.getElementById('performanceChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get actual canvas dimensions (may be different from width/height attributes)
    const actualWidth = canvas.offsetWidth || canvas.width;
    const actualHeight = canvas.offsetHeight || canvas.height;
    
    // Chart dimensions - responsive to canvas size
    const chartWidth = actualWidth - 100;
    const chartHeight = actualHeight - 120;
    const startX = 60;
    const startY = 30;
    
    // Get data
    const ciphers = Object.keys(results);
    const encryptTimes = ciphers.map(key => results[key].encryptTime);
    const decryptTimes = ciphers.map(key => results[key].decryptTime);
    
    const maxTime = Math.max(...encryptTimes, ...decryptTimes);
    const barWidth = chartWidth / (ciphers.length * 2 + 1);
    
    // Draw title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Comparação de Performance (ms)', actualWidth / 2, 20);
    
    // Draw bars
    ciphers.forEach((cipher, index) => {
        const x = startX + (index * 2 + 1) * barWidth;
        
        // Encrypt time bar (blue)
        const encryptHeight = (encryptTimes[index] / maxTime) * chartHeight;
        ctx.fillStyle = '#007bff';
        ctx.fillRect(x, startY + chartHeight - encryptHeight, barWidth * 0.8, encryptHeight);
        
        // Decrypt time bar (orange)
        const decryptHeight = (decryptTimes[index] / maxTime) * chartHeight;
        ctx.fillStyle = '#fd7e14';
        ctx.fillRect(x + barWidth * 0.9, startY + chartHeight - decryptHeight, barWidth * 0.8, decryptHeight);
        
        // Cipher labels - improved positioning
        ctx.fillStyle = '#333';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        const cipherName = results[cipher].name.split(' ')[2] || results[cipher].name.split(' ')[0];
        ctx.fillText(cipherName, x + barWidth, startY + chartHeight + 18);
    });
    
    // Legend - centered and better positioned
    const legendY = startY + chartHeight + 40;
    const totalLegendWidth = 220; // Approximate width of both legend items
    const legendStartX = (actualWidth - totalLegendWidth) / 2;
    
    // Encrypt legend
    ctx.fillStyle = '#007bff';
    ctx.fillRect(legendStartX, legendY, 12, 12);
    ctx.fillStyle = '#333';
    ctx.font = '11px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Criptografia', legendStartX + 18, legendY + 10);
    
    // Decrypt legend
    ctx.fillStyle = '#fd7e14';
    ctx.fillRect(legendStartX + 110, legendY, 12, 12);
    ctx.fillStyle = '#333';
    ctx.fillText('Descriptografia', legendStartX + 128, legendY + 10);
}

/**
 * Add test summary information
 */
function addTestSummary(iterations, messageLength) {
    const tableBody = document.getElementById('resultsTableBody');
    const summaryRow = document.createElement('tr');
    summaryRow.className = 'table-light';
    summaryRow.innerHTML = `
        <td colspan="5" class="text-center">
            <small class="text-muted">
                <i class="fas fa-info-circle me-1"></i>
                ${iterations.toLocaleString()} iterações • ${messageLength} caracteres
            </small>
        </td>
    `;
    tableBody.appendChild(summaryRow);
}

/**
 * Clear comparison results
 */
function clearComparisonResults() {
    const comparisonResults = document.getElementById('comparisonResults');
    const tableBody = document.getElementById('resultsTableBody');
    
    comparisonResults.style.display = 'none';
    tableBody.innerHTML = '';
    
    // Clear chart
    const canvas = document.getElementById('performanceChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    showToast('Resultados da comparação limpos.', 'info');
}

// Add keyboard shortcuts for the comparison feature
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to run test
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runPerformanceTest();
    }
    
    // Escape to clear results
    if (e.key === 'Escape') {
        clearComparisonResults();
    }
});

// ============================================================================
// ENCRYPTION/DECRYPTION FUNCTIONALITY
// ============================================================================

/**
 * Setup encryption tab functionality
 */
function setupEncryptionTab() {
    const encryptMessage = document.getElementById('encryptMessage');
    const encryptKey = document.getElementById('encryptKey');
    const encryptAction = document.getElementById('encryptAction');
    const decryptAction = document.getElementById('decryptAction');
    const vigenereRadio = document.getElementById('vigenere');
    const caesarRadio = document.getElementById('caesar');
    const substitutionRadio = document.getElementById('substitution');
    
    // Character counter for message input
    encryptMessage.addEventListener('input', updateEncryptCharacterCount);
    
    // Radio button change events
    encryptAction.addEventListener('change', updateEncryptButtonText);
    decryptAction.addEventListener('change', updateEncryptButtonText);
    vigenereRadio.addEventListener('change', updateKeyHelp);
    caesarRadio.addEventListener('change', updateKeyHelp);
    substitutionRadio.addEventListener('change', updateKeyHelp);
    
    // Input validation
    encryptMessage.addEventListener('input', validateEncryptInputs);
    encryptKey.addEventListener('input', validateEncryptInputs);
    
    // Enter key to process
    encryptKey.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processEncryption();
        }
    });
    
    // Auto-format key input based on cipher type
    encryptKey.addEventListener('input', function(e) {
        const selectedCipher = getSelectedCipher();
        if (selectedCipher === 'caesar') {
            // For Caesar, only first character matters
            const value = e.target.value.replace(/[^A-Za-z]/g, '').substring(0, 1);
            if (value !== e.target.value) {
                e.target.value = value;
            }
        } else {
            // For Vigenère and Substitution, only letters
            const value = e.target.value.replace(/[^A-Za-z]/g, '');
            if (value !== e.target.value) {
                e.target.value = value;
            }
        }
    });
    
    // Initialize
    updateEncryptButtonText();
    updateKeyHelp();
}

/**
 * Update character count for encryption message
 */
function updateEncryptCharacterCount() {
    const count = document.getElementById('encryptMessage').value.length;
    document.getElementById('encryptCharCount').textContent = count;
    
    // Change color based on character count
    if (count > 100) {
        document.getElementById('encryptCharCount').style.color = '#dc3545';
    } else if (count > 80) {
        document.getElementById('encryptCharCount').style.color = '#ffc107';
    } else {
        document.getElementById('encryptCharCount').style.color = '#007bff';
    }
}

/**
 * Update button text based on selected action
 */
function updateEncryptButtonText() {
    const isEncrypt = document.getElementById('encryptAction').checked;
    const btnText = document.getElementById('processBtnText');
    btnText.textContent = isEncrypt ? 'Criptografar Mensagem' : 'Descriptografar Mensagem';
    
    // Update result title as well
    const resultTitle = document.getElementById('encryptResultTitle');
    const title = isEncrypt ? 'Processo de Criptografia Concluído' : 'Processo de Descriptografia Concluído';
    resultTitle.textContent = title;
}

/**
 * Update key help text based on selected cipher
 */
function updateKeyHelp() {
    const selectedCipher = getSelectedCipher();
    const keyHelp = document.getElementById('keyHelp');
    
    switch (selectedCipher) {
        case 'vigenere':
            keyHelp.textContent = 'Para Vigenère: apenas letras (A-Z). A chave será repetida para cobrir toda a mensagem.';
            break;
        case 'caesar':
            keyHelp.textContent = 'Para César: apenas a primeira letra é usada. A=1, B=2, C=3, etc.';
            break;
        case 'substitution':
            keyHelp.textContent = 'Para Substituição: apenas letras (A-Z). A chave define o novo alfabeto.';
            break;
    }
}

/**
 * Get selected cipher type
 */
function getSelectedCipher() {
    if (document.getElementById('vigenere').checked) return 'vigenere';
    if (document.getElementById('caesar').checked) return 'caesar';
    if (document.getElementById('substitution').checked) return 'substitution';
    return 'vigenere'; // default
}

/**
 * Validate encryption inputs
 */
function validateEncryptInputs() {
    const message = document.getElementById('encryptMessage').value.trim();
    const key = document.getElementById('encryptKey').value.trim();
    const processBtn = document.getElementById('processEncryptBtn');
    
    let isValid = true;
    
    // Reset validation classes
    document.getElementById('encryptMessage').classList.remove('is-valid', 'is-invalid');
    document.getElementById('encryptKey').classList.remove('is-valid', 'is-invalid');
    
    // Validate message
    if (message.length === 0) {
        isValid = false;
    } else if (!isValidText(message)) {
        document.getElementById('encryptMessage').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('encryptMessage').classList.add('is-valid');
    }
    
    // Validate key based on cipher type
    const selectedCipher = getSelectedCipher();
    if (key.length === 0) {
        isValid = false;
    } else if (selectedCipher === 'caesar') {
        if (!/^[A-Za-z]$/.test(key)) {
            document.getElementById('encryptKey').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('encryptKey').classList.add('is-valid');
        }
    } else {
        if (!isValidKey(key)) {
            document.getElementById('encryptKey').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('encryptKey').classList.add('is-valid');
        }
    }
    
    // Enable/disable button
    processBtn.disabled = !isValid;
    
    return isValid;
}

/**
 * Process encryption/decryption
 */
function processEncryption() {
    if (!validateEncryptInputs()) {
        showToast('Por favor, corrija os erros no formulário.', 'error');
        return;
    }
    
    const message = normalizeText(document.getElementById('encryptMessage').value.trim());
    const key = normalizeText(document.getElementById('encryptKey').value.trim());
    const isEncrypt = document.getElementById('encryptAction').checked;
    const selectedCipher = getSelectedCipher();
    const processBtn = document.getElementById('processEncryptBtn');
    
    // Show loading state
    processBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processando...';
    processBtn.disabled = true;
    
    try {
        // Simulate processing delay for better UX
        setTimeout(() => {
            let result;
            
            if (isEncrypt) {
                result = encryptWithCipher(message, key, selectedCipher);
            } else {
                result = decryptWithCipher(message, key, selectedCipher);
            }
            
            // Display result
            displayEncryptResult(message, key, result, isEncrypt, selectedCipher);
            
            // Hide loading state
            processBtn.innerHTML = '<i class="fas fa-magic me-2"></i><span id="processBtnText">' + 
                (isEncrypt ? 'Criptografar Mensagem' : 'Descriptografar Mensagem') + '</span>';
            processBtn.disabled = false;
            
            // Show success toast
            const operation = isEncrypt ? 'criptografada' : 'descriptografada';
            showToast(`Mensagem ${operation} com sucesso!`, 'success');
            
        }, 300);
        
    } catch (error) {
        processBtn.innerHTML = '<i class="fas fa-magic me-2"></i><span id="processBtnText">' + 
            (isEncrypt ? 'Criptografar Mensagem' : 'Descriptografar Mensagem') + '</span>';
        processBtn.disabled = false;
        showToast('Ocorreu um erro ao processar a mensagem.', 'error');
        console.error('Encryption error:', error);
    }
}

/**
 * Encrypt message with selected cipher
 */
function encryptWithCipher(message, key, cipherType) {
    switch (cipherType) {
        case 'vigenere':
            return vigenereEncrypt(message, key);
        case 'caesar':
            const shift = key.charCodeAt(0) - 65 + 1; // A=1, B=2, etc.
            return caesarEncrypt(message, shift);
        case 'substitution':
            return substitutionEncrypt(message, key);
        default:
            return vigenereEncrypt(message, key);
    }
}

/**
 * Decrypt message with selected cipher
 */
function decryptWithCipher(message, key, cipherType) {
    switch (cipherType) {
        case 'vigenere':
            return vigenereDecrypt(message, key);
        case 'caesar':
            const shift = key.charCodeAt(0) - 65 + 1; // A=1, B=2, etc.
            return caesarDecrypt(message, shift);
        case 'substitution':
            return substitutionDecrypt(message, key);
        default:
            return vigenereDecrypt(message, key);
    }
}

/**
 * Display encryption result
 */
function displayEncryptResult(original, key, result, isEncrypt, cipherType) {
    const cipherNames = {
        vigenere: 'Cifra de Vigenère',
        caesar: 'Cifra de César',
        substitution: 'Cifra de Substituição'
    };
    
    document.getElementById('usedAlgorithm').textContent = cipherNames[cipherType];
    document.getElementById('usedEncryptKey').textContent = key;
    document.getElementById('originalEncryptMessage').textContent = original;
    document.getElementById('encryptResultText').textContent = result;
    
    // Update result title
    const title = isEncrypt ? 'Processo de Criptografia Concluído' : 'Processo de Descriptografia Concluído';
    document.getElementById('encryptResultTitle').textContent = title;
    
    // Show result section with animation
    const resultSection = document.getElementById('encryptResultSection');
    resultSection.style.display = 'block';
    resultSection.classList.add('fade-in-up');
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Copy encryption result to clipboard
 */
function copyEncryptResult() {
    const text = document.getElementById('encryptResultText').textContent;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Resultado copiado para a área de transferência!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

/**
 * Fallback method to copy to clipboard
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Resultado copiado para a área de transferência!', 'success');
    } catch (err) {
        showToast('Não foi possível copiar o resultado.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// ============================================================================
// INDIVIDUAL TEST FUNCTIONALITY
// ============================================================================

/**
 * Setup individual test tab functionality
 */
function setupIndividualTestTab() {
    const testMessage = document.getElementById('testIndividualMessage');
    const testKey = document.getElementById('testIndividualKey');
    const testVigenere = document.getElementById('testVigenere');
    const testCaesar = document.getElementById('testCaesar');
    const testSubstitution = document.getElementById('testSubstitution');
    
    // Character counter for test message input
    testMessage.addEventListener('input', updateTestCharacterCount);
    
    // Radio button change events
    testVigenere.addEventListener('change', updateTestKeyHelp);
    testCaesar.addEventListener('change', updateTestKeyHelp);
    testSubstitution.addEventListener('change', updateTestKeyHelp);
    
    // Input validation
    testMessage.addEventListener('input', validateTestInputs);
    testKey.addEventListener('input', validateTestInputs);
    
    // Enter key to process
    testKey.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            runIndividualTest();
        }
    });
    
    // Auto-format key input based on cipher type
    testKey.addEventListener('input', function(e) {
        const selectedCipher = getSelectedTestCipher();
        if (selectedCipher === 'caesar') {
            // For Caesar, only first character matters
            const value = e.target.value.replace(/[^A-Za-z]/g, '').substring(0, 1);
            if (value !== e.target.value) {
                e.target.value = value;
            }
        } else {
            // For Vigenère and Substitution, only letters
            const value = e.target.value.replace(/[^A-Za-z]/g, '');
            if (value !== e.target.value) {
                e.target.value = value;
            }
        }
    });
    
    // Initialize
    updateTestKeyHelp();
}

/**
 * Update character count for test message
 */
function updateTestCharacterCount() {
    const count = document.getElementById('testIndividualMessage').value.length;
    document.getElementById('testCharCount').textContent = count;
    
    // Change color based on character count
    if (count > 150) {
        document.getElementById('testCharCount').style.color = '#dc3545';
    } else if (count > 100) {
        document.getElementById('testCharCount').style.color = '#ffc107';
    } else {
        document.getElementById('testCharCount').style.color = '#007bff';
    }
}

/**
 * Update test key help text based on selected cipher
 */
function updateTestKeyHelp() {
    const selectedCipher = getSelectedTestCipher();
    const keyHelp = document.getElementById('testKeyHelp');
    
    switch (selectedCipher) {
        case 'vigenere':
            keyHelp.textContent = 'Para Vigenère: apenas letras (A-Z). A chave será repetida para cobrir toda a mensagem.';
            break;
        case 'caesar':
            keyHelp.textContent = 'Para César: apenas a primeira letra é usada. A=1, B=2, C=3, etc.';
            break;
        case 'substitution':
            keyHelp.textContent = 'Para Substituição: apenas letras (A-Z). A chave define o novo alfabeto.';
            break;
    }
}

/**
 * Get selected test cipher type
 */
function getSelectedTestCipher() {
    if (document.getElementById('testVigenere').checked) return 'vigenere';
    if (document.getElementById('testCaesar').checked) return 'caesar';
    if (document.getElementById('testSubstitution').checked) return 'substitution';
    return 'vigenere'; // default
}

/**
 * Validate test inputs
 */
function validateTestInputs() {
    const message = document.getElementById('testIndividualMessage').value.trim();
    const key = document.getElementById('testIndividualKey').value.trim();
    const runBtn = document.getElementById('runIndividualTestBtn');
    
    let isValid = true;
    
    // Reset validation classes
    document.getElementById('testIndividualMessage').classList.remove('is-valid', 'is-invalid');
    document.getElementById('testIndividualKey').classList.remove('is-valid', 'is-invalid');
    
    // Validate message
    if (message.length === 0) {
        isValid = false;
    } else if (!isValidText(message)) {
        document.getElementById('testIndividualMessage').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('testIndividualMessage').classList.add('is-valid');
    }
    
    // Validate key based on cipher type
    const selectedCipher = getSelectedTestCipher();
    if (key.length === 0) {
        isValid = false;
    } else if (selectedCipher === 'caesar') {
        if (!/^[A-Za-z]$/.test(key)) {
            document.getElementById('testIndividualKey').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('testIndividualKey').classList.add('is-valid');
        }
    } else {
        if (!isValidKey(key)) {
            document.getElementById('testIndividualKey').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('testIndividualKey').classList.add('is-valid');
        }
    }
    
    // Enable/disable button
    runBtn.disabled = !isValid;
    
    return isValid;
}

/**
 * Generate test data for individual testing
 */
function generateIndividualTestData() {
    const testMessage = document.getElementById('testIndividualMessage');
    const testKey = document.getElementById('testIndividualKey');
    
    // Generate random message of 30-80 characters
    const length = Math.floor(Math.random() * 51) + 30;
    const randomMessage = generateTestData(length);
    
    // Generate random key of 5-8 characters
    const keyLength = Math.floor(Math.random() * 4) + 5;
    const randomKey = generateTestData(keyLength).replace(/\s/g, '').substring(0, keyLength);
    
    testMessage.value = randomMessage;
    testKey.value = randomKey;
    
    // Update character count and validation
    updateTestCharacterCount();
    validateTestInputs();
    
    showToast('Dados de teste gerados aleatoriamente!', 'success');
}

/**
 * Run individual algorithm test
 */
function runIndividualTest() {
    if (!validateTestInputs()) {
        showToast('Por favor, corrija os erros no formulário.', 'error');
        return;
    }
    
    const message = normalizeText(document.getElementById('testIndividualMessage').value.trim());
    const key = normalizeText(document.getElementById('testIndividualKey').value.trim());
    const selectedCipher = getSelectedTestCipher();
    const runBtn = document.getElementById('runIndividualTestBtn');
    
    // Show loading state
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Executando Teste...';
    runBtn.disabled = true;
    
    try {
        // Simulate processing delay for better UX
        setTimeout(() => {
            const startTime = performance.now();
            
            // Encrypt the message
            const encrypted = encryptWithCipher(message, key, selectedCipher);
            
            // Decrypt the message
            const decrypted = decryptWithCipher(encrypted, key, selectedCipher);
            
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            
            // Display results
            displayIndividualTestResult(message, key, encrypted, decrypted, executionTime, selectedCipher);
            
            // Hide loading state
            runBtn.innerHTML = '<i class="fas fa-play me-2"></i>Executar Teste Individual';
            runBtn.disabled = false;
            
            // Show success toast
            showToast('Teste individual concluído com sucesso!', 'success');
            
        }, 200);
        
    } catch (error) {
        runBtn.innerHTML = '<i class="fas fa-play me-2"></i>Executar Teste Individual';
        runBtn.disabled = false;
        showToast('Ocorreu um erro ao executar o teste.', 'error');
        console.error('Individual test error:', error);
    }
}

/**
 * Display individual test result
 */
function displayIndividualTestResult(original, key, encrypted, decrypted, executionTime, cipherType) {
    const cipherNames = {
        vigenere: 'Cifra de Vigenère',
        caesar: 'Cifra de César',
        substitution: 'Cifra de Substituição'
    };
    
    document.getElementById('testedAlgorithm').textContent = cipherNames[cipherType];
    document.getElementById('testedKey').textContent = key;
    document.getElementById('executionTime').textContent = `${executionTime.toFixed(3)} ms`;
    document.getElementById('originalTestMessage').textContent = original;
    document.getElementById('encryptedTestText').textContent = encrypted;
    document.getElementById('decryptedTestText').textContent = decrypted;
    
    // Show result section with animation
    const resultSection = document.getElementById('individualTestResults');
    resultSection.style.display = 'block';
    resultSection.classList.add('fade-in-up');
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Copy test result to clipboard
 */
function copyTestResult(type) {
    let text;
    if (type === 'encrypted') {
        text = document.getElementById('encryptedTestText').textContent;
    } else {
        text = document.getElementById('decryptedTestText').textContent;
    }
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            const operation = type === 'encrypted' ? 'criptografado' : 'descriptografado';
            showToast(`Resultado ${operation} copiado para a área de transferência!`, 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

/**
 * Clear individual test
 */
function clearIndividualTest() {
    const testMessage = document.getElementById('testIndividualMessage');
    const testKey = document.getElementById('testIndividualKey');
    const resultSection = document.getElementById('individualTestResults');
    
    testMessage.value = '';
    testKey.value = '';
    resultSection.style.display = 'none';
    
    // Reset validation classes
    testMessage.classList.remove('is-valid', 'is-invalid');
    testKey.classList.remove('is-valid', 'is-invalid');
    
    // Update character count
    updateTestCharacterCount();
    
    // Enable button
    document.getElementById('runIndividualTestBtn').disabled = true;
    
    showToast('Teste individual limpo.', 'info');
}

/**
 * Clear encryption inputs
 */
function clearEncryptInputs() {
    const encryptMessage = document.getElementById('encryptMessage');
    const encryptKey = document.getElementById('encryptKey');
    const resultSection = document.getElementById('encryptResultSection');
    
    // Clear inputs
    encryptMessage.value = '';
    encryptKey.value = '';
    
    // Hide result section
    resultSection.style.display = 'none';
    
    // Reset validation classes
    encryptMessage.classList.remove('is-valid', 'is-invalid');
    encryptKey.classList.remove('is-valid', 'is-invalid');
    
    // Update character count
    updateEncryptCharacterCount();
    
    // Disable process button
    document.getElementById('processEncryptBtn').disabled = true;
    
    showToast('Campos de criptografia limpos.', 'info');
}

/**
 * Clear comparison inputs
 */
function clearComparisonInputs() {
    const testMessage = document.getElementById('testMessage');
    const testKey = document.getElementById('testKey');
    const iterations = document.getElementById('iterations');
    
    // Clear inputs
    testMessage.value = '';
    testKey.value = 'TESTKEY';
    iterations.value = '1000';
    
    showToast('Campos de comparação limpos.', 'info');
}

/**
 * Clear individual test inputs
 */
function clearIndividualTestInputs() {
    const testMessage = document.getElementById('testIndividualMessage');
    const testKey = document.getElementById('testIndividualKey');
    const resultSection = document.getElementById('individualTestResults');
    
    // Clear inputs
    testMessage.value = '';
    testKey.value = '';
    
    // Hide result section
    resultSection.style.display = 'none';
    
    // Reset validation classes
    testMessage.classList.remove('is-valid', 'is-invalid');
    testKey.classList.remove('is-valid', 'is-invalid');
    
    // Update character count
    updateTestCharacterCount();
    
    // Disable run button
    document.getElementById('runIndividualTestBtn').disabled = true;
    
    showToast('Campos de teste individual limpos.', 'info');
}