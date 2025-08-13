
// register page script
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('userName');

if (registerButton && usernameInput) {
    function removeDisabled() {
        if (usernameInput.value.trim() === '') {
            registerButton.classList.add('disabled');
        } else {
            registerButton.classList.remove('disabled');
        }
    }

    usernameInput.addEventListener('input', removeDisabled);
    removeDisabled();

    registerButton.addEventListener('click', function () {
        const name = usernameInput.value.trim();
        if (name !== '') {
            localStorage.setItem('username', name);
            window.location.href = "/pages/homePage.html";
        }
    });
}

// settings page script

const usernameSettingsInput = document.getElementById('inputNameSettings');

if (usernameSettingsInput) {
    usernameSettingsInput.value = localStorage.getItem('username') || "";
    usernameSettingsInput.readOnly = true;

    const saveButton = document.querySelector('.buttonContainer');
    const usernameSettingsContainer = document.querySelector('.editNameInput');

    saveButton.addEventListener('click', function () {
        if (usernameSettingsInput.readOnly) {
            usernameSettingsInput.readOnly = false;
            saveButton.textContent = 'Save';
            usernameSettingsContainer.classList.add('editable');
            usernameSettingsInput.focus();
        } else {
            const newName = usernameSettingsInput.value.trim();
            if (newName !== "") {
                localStorage.setItem('username', newName);
            }
            usernameSettingsInput.readOnly = true;
            usernameSettingsContainer.classList.remove('editable');
            saveButton.textContent = 'Edit';
        }
    });
}

// character page script

function updateDiv() {
    const divElement = document.getElementById("characterNameData");
    if (divElement) {
        divElement.innerHTML = localStorage.getItem('username') || "";
    }
}
updateDiv();

const closeButton = document.getElementById('heroesCloseBtn');
const heroesContainer = document.getElementById('heroesPopContainer');
const setCharacterButton = document.getElementById('setCharacterButton');
if (setCharacterButton) {
    setCharacterButton.addEventListener('click', function () {
        heroesContainer.classList.remove('hidden');
    });
    closeButton.addEventListener('click', function () {
        heroesContainer.classList.add('hidden');
    });
}



// hero pick script
const heroPicks = document.getElementById('heroesChooseContainer');

document.addEventListener('click', function(event) {
    if (!heroPicks.contains(event.target) && event.target !== setCharacterButton) {
        heroesContainer.classList.add('hidden');
        event.stopPropagation();
       
        
    }
});