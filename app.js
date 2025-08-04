/**
 * Cipher Performance Comparison Application
 * Compares 3 cipher algorithms: Vigenère, Caesar, and Substitution
 */

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set default test data
    document.getElementById('testMessage').value = 'HELLO WORLD';
    document.getElementById('testKey').value = 'TESTKEY';
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
    const testMessage = document.getElementById('testMessage');
    const testKey = document.getElementById('testKey');
    
    comparisonResults.style.display = 'none';
    tableBody.innerHTML = '';
    testMessage.value = '';
    testKey.value = 'TESTKEY';
    
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