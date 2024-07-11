document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    const securedSection = document.getElementById('securedSection');
    const logoutButton = document.getElementById('logoutButton');
    const usernameDisplay = document.getElementById('usernameDisplay');

    let users = {};
    let loggedInUser = null;

    // Registration event
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        if (users[username]) {
            messageDiv.textContent = 'Username already exists!';
        } else {
            users[username] = password;
            messageDiv.textContent = 'User registered successfully!';
        }
    });

    // Login event
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (users[username] && users[username] === password) {
            messageDiv.textContent = '';
            loggedInUser = username;
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
            securedSection.style.display = 'block';
            usernameDisplay.textContent = username;
        } else {
            messageDiv.textContent = 'Invalid username or password!';
        }
    });

    // Logout event
    logoutButton.addEventListener('click', () => {
        loggedInUser = null;
        loginForm.style.display = 'block';
        registerForm.style.display = 'block';
        securedSection.style.display = 'none';
        messageDiv.textContent = 'Logged out successfully!';
    });
});
