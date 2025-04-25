// common.js

// Function to validate the login form
function validateLoginForm() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Both username and password are required.");
        return false;
    }

    return true;
}

// Function to validate the registration form
function validateRegisterForm() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (username === "" || password === "" || confirmPassword === "") {
        alert("All fields are required.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    return true;
}

// Function to display a success message on the dashboard
function displaySuccessMessage(message) {
    const successMessageDiv = document.getElementById('successMessage');
    successMessageDiv.textContent = message;
    successMessageDiv.style.display = 'block';
    setTimeout(() => {
        successMessageDiv.style.display = 'none';
    }, 3000);
}

// Function to handle the daily eco-action logging form submission
function logEcoAction() {
    const ecoActionForm = document.getElementById('ecoActionForm');
    const actions = ecoActionForm.querySelectorAll('input[type="checkbox"]:checked');
    const ecoPoints = {
        carpooling: 1,
        reusedContainer: 1.5,
        skippedMeat: 2,
        usedPublicTransport: 1,
        noPlasticDay: 1.5
    };

    let totalPoints = 0;
    actions.forEach(action => {
        totalPoints += ecoPoints[action.value];
    });

    alert("You earned " + totalPoints + " eco-points today!");
    return false;
}

// Common function to handle form submission and validation for login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateLoginForm()) {
        alert('Login successful!');
        window.location.href = '/dashboard';  // Redirect to the dashboard after login
    }
});

// Common function to handle form submission and validation for register
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateRegisterForm()) {
        alert('Registration successful!');
        window.location.href = '/login';  // Redirect to login page after registration
    }
});

// Eco action form submission handler for the dashboard page
document.getElementById('ecoActionForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    logEcoAction();
    displaySuccessMessage("Your eco-action has been logged successfully!");
});
