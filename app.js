/**
 * Main Application JavaScript for Vigenère Cipher Web Interface
 * Handles UI interactions, form validation, and cipher operations
 */

// DOM Elements
const messageInput = document.getElementById('message');
const keyInput = document.getElementById('key');
const encryptRadio = document.getElementById('encrypt');
const decryptRadio = document.getElementById('decrypt');
const processBtn = document.getElementById('processBtn');
const btnText = document.getElementById('btnText');
const charCount = document.getElementById('charCount');
const resultSection = document.getElementById('resultSection');
const resultTitle = document.getElementById('resultTitle');
const originalMessage = document.getElementById('originalMessage');
const usedKey = document.getElementById('usedKey');
const resultText = document.getElementById('resultText');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateButtonText();
});

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Character counter for message input
    messageInput.addEventListener('input', updateCharacterCount);
    
    // Radio button change events
    encryptRadio.addEventListener('change', () => updateButtonText(true));
    decryptRadio.addEventListener('change', () => updateButtonText(true));
    
    // Input validation
    messageInput.addEventListener('input', validateInputs);
    keyInput.addEventListener('input', validateInputs);
    
    // Enter key to process
    keyInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processMessage();
        }
    });
    
    // Auto-format key input (remove invalid characters)
    keyInput.addEventListener('input', function(e) {
        // Remove non-letter characters
        const value = e.target.value.replace(/[^A-Za-z]/g, '');
        if (value !== e.target.value) {
            e.target.value = value;
        }
    });
}

/**
 * Update character count display
 */
function updateCharacterCount() {
    const count = messageInput.value.length;
    charCount.textContent = count;
    
    // Change color based on character count
    if (count > 100) {
        charCount.style.color = '#dc3545'; // Red
    } else if (count > 80) {
        charCount.style.color = '#ffc107'; // Yellow
    } else {
        charCount.style.color = '#007bff'; // Blue
    }
}

/**
 * Update button text based on selected action
 */
function updateButtonText(clearInputs = false) {
    const isEncrypt = encryptRadio.checked;
    btnText.textContent = isEncrypt ? 'Criptografar Mensagem' : 'Descriptografar Mensagem';
    
    // Update result title as well
    const title = isEncrypt ? 'Processo de Criptografia Concluído' : 'Processo de Descriptografia Concluído';
    resultTitle.textContent = title;
    
    // Clear inputs when switching between operations (but not on initial load)
    if (clearInputs) {
        clearForm();
    }
}

/**
 * Clear form inputs and result section
 */
function clearForm() {
    messageInput.value = '';
    keyInput.value = '';
    resultSection.style.display = 'none';
    
    // Reset validation classes
    messageInput.classList.remove('is-valid', 'is-invalid');
    keyInput.classList.remove('is-valid', 'is-invalid');
    
    // Update character count
    updateCharacterCount();
    
    // Disable the process button since form is now empty
    processBtn.disabled = true;
}

/**
 * Validate form inputs
 */
function validateInputs() {
    const message = messageInput.value.trim();
    const key = keyInput.value.trim();
    
    let isValid = true;
    
    // Reset validation classes
    messageInput.classList.remove('is-valid', 'is-invalid');
    keyInput.classList.remove('is-valid', 'is-invalid');
    
    // Validate message
    if (message.length === 0) {
        isValid = false;
    } else if (!isValidText(message)) {
        messageInput.classList.add('is-invalid');
        isValid = false;
    } else {
        messageInput.classList.add('is-valid');
    }
    
    // Validate key
    if (key.length === 0) {
        isValid = false;
    } else if (!isValidKey(key)) {
        keyInput.classList.add('is-invalid');
        isValid = false;
    } else {
        keyInput.classList.add('is-valid');
    }
    
    // Enable/disable button
    processBtn.disabled = !isValid;
    
    return isValid;
}

/**
 * Process the message (encrypt or decrypt)
 */
function processMessage() {
    if (!validateInputs()) {
        showToast('Por favor, corrija os erros no formulário.', 'error');
        return;
    }
    
    const message = normalizeText(messageInput.value.trim());
    const key = normalizeText(keyInput.value.trim());
    const isEncrypt = encryptRadio.checked;
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Simulate processing delay for better UX
        setTimeout(() => {
            let result;
            
            if (isEncrypt) {
                result = encrypt(message, key);
            } else {
                result = decrypt(message, key);
            }
            
            // Display result
            displayResult(message, key, result, isEncrypt);
            
            // Hide loading state
            setLoadingState(false);
            
            // Show success toast
            const operation = isEncrypt ? 'criptografada' : 'descriptografada';
            showToast(`Mensagem ${operation} com sucesso!`, 'success');
            
        }, 500); // 500ms delay
        
    } catch (error) {
        setLoadingState(false);
        showToast('Ocorreu um erro ao processar a mensagem.', 'error');
        console.error('Error processing message:', error);
    }
}

/**
 * Display the result in the result section
 */
function displayResult(original, key, result, isEncrypt) {
    originalMessage.textContent = original;
    usedKey.textContent = key;
    resultText.textContent = result;
    
    // Update result title
    const title = isEncrypt ? 'Processo de Criptografia Concluído' : 'Processo de Descriptografia Concluído';
    resultTitle.textContent = title;
    
    // Show result section with animation
    resultSection.style.display = 'block';
    resultSection.classList.add('fade-in-up');
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Set loading state for the process button
 */
function setLoadingState(loading) {
    if (loading) {
        processBtn.classList.add('loading');
        processBtn.disabled = true;
        btnText.textContent = 'Processando...';
        processBtn.querySelector('.fas').className = 'fas fa-spinner';
    } else {
        processBtn.classList.remove('loading');
        processBtn.disabled = false;
        updateButtonText();
        processBtn.querySelector('.fas').className = 'fas fa-magic';
    }
}

/**
 * Copy result to clipboard
 */
function copyResult() {
    const text = resultText.textContent;
    
    if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(text).then(() => {
            showToast('Resultado copiado para a área de transferência!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        // Fallback for older browsers
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