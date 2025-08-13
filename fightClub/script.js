
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

const heroesContainer = document.getElementById('heroesPopContainer');
const setCharacterButtons = document.querySelectorAll('#setCharacterButton1, #setCharacterButton2');
const closeButton = document.getElementById('heroesCloseBtn');

setCharacterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        heroesContainer.classList.remove('hidden');
    });
});

closeButton.addEventListener('click', () => {
    heroesContainer.classList.add('hidden');
});

const heroPicks = document.getElementById('heroesChooseContainer');
document.addEventListener('click', function(event) {
    if (!heroPicks.contains(event.target) && ![...setCharacterButtons].includes(event.target)) {
        heroesContainer.classList.add('hidden');
    }
});

// hero choose script
const yesButtons = document.querySelectorAll('.yesButton');
const heroImg = document.querySelectorAll('.heroImg');
const choosenHero = document.querySelector('.characterInformationAvatarImage');

yesButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const selectedHero = heroImg[index].src;
        localStorage.setItem("selectedHero", selectedHero);
        choosenHero.src = selectedHero;
        heroesContainer.classList.add('hidden');
    });
});

const savedHero = localStorage.getItem("selectedHero");
if (savedHero) {
    choosenHero.src = savedHero;
}
