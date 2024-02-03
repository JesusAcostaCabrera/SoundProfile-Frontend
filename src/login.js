const forgotPasswordModal = document.querySelector('.forgot-password');
const modalClosePassword = document.getElementById('close-password');
const modalPassword = document.getElementById('recover-password');
const recoverPasswordButton = document.querySelector('.recover-password-btn');

const createAccountModal = document.querySelector('.create-account');
const modalCloseAccount = document.getElementById('close-example');
const modalAccount = document.getElementById('create-account');
const createAccountNextButton = document.querySelector('.create-account-btn-1');
const createAccountButton = document.querySelector('.create-account-btn-2');

const overlay = document.querySelector('.modal-overlay');

// Forgot Password button

forgotPasswordModal.addEventListener('click', () => {
    modalPassword.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

recoverPasswordButton.addEventListener('click', () => {
    document.querySelector('.recover-password-heading').classList.add('hidden');
    document.querySelector('.recover-password-paragraph').classList.add('hidden');
    document.querySelector('.recover-password-email').classList.add('hidden');
    document.querySelector('.recover-password-btn').classList.add('hidden');
    document.querySelector('.recover-password-heading-2').classList.remove('hidden');
});

modalClosePassword.addEventListener('click', () => {
    modalPassword.classList.add('hidden');
    overlay.classList.add('hidden');
    document.querySelector('.recover-password-heading').classList.remove('hidden');
    document.querySelector('.recover-password-paragraph').classList.remove('hidden');
    document.querySelector('.recover-password-email').classList.remove('hidden');
    document.querySelector('.recover-password-btn').classList.remove('hidden');
    document.querySelector('.recover-password-heading-2').classList.add('hidden');
});

// Create Account button

createAccountModal.addEventListener('click', () => {
    modalAccount.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

createAccountNextButton.addEventListener('click', () => {
    document.querySelector('.create-account-heading-1').classList.add('hidden');
    document.querySelector('.create-account-input-username').classList.add('hidden');
    document.querySelector('.create-account-input-email').classList.add('hidden');
    document.querySelector('.create-account-heading-2').classList.add('hidden');
    document.querySelector('.create-account-input-birthday').classList.add('hidden');
    document.querySelector('.create-account-btn-1').classList.add('hidden');
    document.querySelector('.create-account-heading-3').classList.remove('hidden');
    document.querySelector('.create-account-paragraph-2').classList.remove('hidden');
    document.querySelector('.create-account-input-password').classList.remove('hidden');
    document.querySelector('.create-account-btn-2').classList.remove('hidden');
});

modalCloseAccount.addEventListener('click', () => {
    modalAccount.classList.add('hidden');
    overlay.classList.add('hidden');
    document.querySelector('.create-account-heading-1').classList.remove('hidden');
    document.querySelector('.create-account-input-username').classList.remove('hidden');
    document.querySelector('.create-account-input-email').classList.remove('hidden');
    document.querySelector('.create-account-heading-2').classList.remove('hidden');
    document.querySelector('.create-account-input-birthday').classList.remove('hidden');
    document.querySelector('.create-account-btn-1').classList.remove('hidden');
    document.querySelector('.create-account-heading-3').classList.add('hidden');
    document.querySelector('.create-account-paragraph-2').classList.add('hidden');
    document.querySelector('.create-account-input-password').classList.add('hidden');
    document.querySelector('.create-account-btn-2').classList.add('hidden');
});

createAccountButton.addEventListener('click', () => {
    modalAccount.classList.add('hidden');
    overlay.classList.add('hidden');
    document.querySelector('.create-account-heading-1').classList.remove('hidden');
    document.querySelector('.create-account-input-username').classList.remove('hidden');
    document.querySelector('.create-account-input-email').classList.remove('hidden');
    document.querySelector('.create-account-heading-2').classList.remove('hidden');
    document.querySelector('.create-account-input-birthday').classList.remove('hidden');
    document.querySelector('.create-account-btn-1').classList.remove('hidden');
    document.querySelector('.create-account-heading-3').classList.add('hidden');
    document.querySelector('.create-account-paragraph-2').classList.add('hidden');
    document.querySelector('.create-account-input-password').classList.add('hidden');
    document.querySelector('.create-account-btn-2').classList.add('hidden');
});