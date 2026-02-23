// Initiative Marketplace - Minimal JS for Modal Interactions

function openPurchaseModal(projectName, price) {
    const modal = document.getElementById('purchaseModal');
    const titleEl = document.getElementById('modalProjectName');
    const priceEl = document.getElementById('modalPrice');

    titleEl.textContent = projectName;
    priceEl.textContent = price;

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('purchaseModal');
    modal.style.display = 'none';
}

/* --- LinkedIn Auth Simulation --- */
const AUTH_KEY = 'li_auth_token';
const USER_MOCK_NAME = 'Edward Unthank';

function triggerLinkedInAuth() {
    // Simulate redirecting to LinkedIn OAuth provider
    // In reality, this would be: window.location.href = `https://www.linkedin.com/oauth/v2/authorization?...`
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('code', 'mock_auth_code_12345');

    alert('Simulating redirect to LinkedIn for Authorization...');
    window.location.href = currentUrl.toString();
}

function checkAuthState() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // If we just got back from the "OAuth Provider"
    if (code) {
        localStorage.setItem(AUTH_KEY, 'valid_token');

        // Clean up the URL so the code isn't lingering
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }

    // Update UI based on auth state
    const isAuthenticated = localStorage.getItem(AUTH_KEY) !== null;
    const authBtn = document.getElementById('authButton');
    const userProfile = document.getElementById('userProfile');
    const userNameBadge = document.getElementById('userName');

    if (isAuthenticated) {
        authBtn.style.display = 'none';
        userProfile.style.display = 'flex';
        userNameBadge.textContent = USER_MOCK_NAME;
    } else {
        authBtn.style.display = 'flex';
        userProfile.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    checkAuthState();
}

/* --- Submission Modal --- */
function openSubmitModal() {
    document.getElementById('submitModal').style.display = 'flex';
}

function closeSubmitModal() {
    document.getElementById('submitModal').style.display = 'none';
    document.getElementById('initiativeForm').reset();
}

function handleSubmission(event) {
    event.preventDefault();
    alert('Initiative submitted for compliance review successfully!');
    closeSubmitModal();
}

// Global Click Handler for Modals
window.onclick = function (event) {
    const purchaseModal = document.getElementById('purchaseModal');
    const submitModal = document.getElementById('submitModal');
    if (event.target === purchaseModal) {
        closeModal();
    }
    if (event.target === submitModal) {
        closeSubmitModal();
    }
}

// initialization
window.onload = checkAuthState;
