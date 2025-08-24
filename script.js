// helper functions for stats 
function getPlayerStats() {
    const stats = localStorage.getItem('playerStats');
    return stats ? JSON.parse(stats) : {};
}

function savePlayerStats(stats) {
    localStorage.setItem('playerStats', JSON.stringify(stats));
}

function getWins(username) {
    const stats = getPlayerStats();
    return stats[username]?.wins || 0;
}

function getLosses(username) {
    const stats = getPlayerStats();
    return stats[username]?.losses || 0;
}

function updateWins(username, newWins) {
    const stats = getPlayerStats();
    if (!stats[username]) stats[username] = { wins: 0, losses: 0 };
    stats[username].wins = newWins;
    savePlayerStats(stats);
}

function updateLosses(username, newLosses) {
    const stats = getPlayerStats();
    if (!stats[username]) stats[username] = { wins: 0, losses: 0 };
    stats[username].losses = newLosses;
    savePlayerStats(stats);
}

function resetStatsForName(username) {
    const stats = getPlayerStats();
    stats[username] = { wins: 0, losses: 0 };
    savePlayerStats(stats);
}

// register page script 
if (document.body.id === 'registerPage') {
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

                const stats = getPlayerStats();
                if (!stats[name]) {
                    resetStatsForName(name);
                }

                window.location.href = "pages/homePage.html";
            }
        });
    }
}

// settings page script 
if (document.body.id === 'settingsPage') {
    const usernameSettingsInput = document.getElementById('inputNameSettings');

    if (usernameSettingsInput) {
        usernameSettingsInput.value = localStorage.getItem('username') || "";
        usernameSettingsInput.readOnly = true;

        const saveButton = document.querySelector('.buttonContainer');
        const usernameSettingsContainer = document.querySelector('.editNameInput');
        if (saveButton) {
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
    }
}

// character page script 
if (document.body.id === 'characterPage') {

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

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            heroesContainer.classList.add('hidden');
        });
    }

    const heroPicks = document.getElementById('heroesChooseContainer');
    document.addEventListener('click', function (event) {
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

    const username = localStorage.getItem('username') || '';
    document.getElementById("wins").textContent = `Wins: ${getWins(username)}`;
    document.getElementById("looses").textContent = `Losses: ${getLosses(username)}`;
}

// fight page script 
if (document.body.id === 'fightPage') {
    const enemies = [
        { id: 'enemy1', name: 'Noob', health: 100, maxHealth: 100, imgSrc: '/assets/images/opps/opp1.png' },
        { id: 'enemy2', name: 'Scorpion', health: 120, maxHealth: 120, imgSrc: '/assets/images/opps/opp2.png' },
        { id: 'enemy3', name: 'Baraka', health: 160, maxHealth: 160, imgSrc: '/assets/images/opps/opp3.png' },
        { id: 'enemy4', name: 'Jade', health: 180, maxHealth: 180, imgSrc: '/assets/images/opps/opp4.png' },
        { id: 'enemy5', name: 'Shao Kahn', health: 1000, maxHealth: 1000, imgSrc: '/assets/images/opps/opp5.png' },
    ];
    const fightButton = document.getElementById('fightButton');
    const defenceChbs = document.querySelectorAll('input[type="checkbox"]');
    const attackRadio = document.getElementsByName('attackZone');
    let battleEnded = false;

    const zones = ['Head', 'Neck', 'Body', 'Balls', 'Legs'];

    const logContainer = document.querySelector('.logContainer');

    function addLog(message) {
        if (logContainer) {
            const logEntry = document.createElement('p');
            logEntry.textContent = message;
            logContainer.appendChild(logEntry);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
    }

    function updateFightButton() {
        let checkedCount = 0;
        defenceChbs.forEach(function (chb) {
            if (chb.checked) checkedCount++;
        });
        if (checkedCount === 2) {
            fightButton.classList.remove('disabled');
        } else {
            fightButton.classList.add('disabled');
        };
    };
    updateFightButton();
    defenceChbs.forEach(function (chb) {
        chb.addEventListener('change', updateFightButton)
    });

    const choosedHeroImg = document.querySelector('.unitPicHero');
    const savedHero = localStorage.getItem("selectedHero");
    if (choosedHeroImg) {
        choosedHeroImg.src = localStorage.getItem("selectedHero");
    }
    // change enemy
    const setEnemyButtons = document.querySelectorAll('#setEnemyButton1, #setEnemyButton2');
    const enemyContainer = document.querySelector('.enemyContainer');
    const closeEnemyButton = document.getElementById('enemyCloseBtn');

    setEnemyButtons.forEach(enemybtn => {
        enemybtn.addEventListener('click', () => {
            enemyContainer.classList.remove('hidden');
        });
    });

    if (closeEnemyButton) {
        closeEnemyButton.addEventListener('click', () => {
            enemyContainer.classList.add('hidden');
        });
    }

    const enemyPicks = document.getElementById('enemyChooseContainer');
    document.addEventListener('click', function (event) {
        if (!enemyPicks.contains(event.target) && ![...setEnemyButtons].includes(event.target)) {
            enemyContainer.classList.add('hidden');
        }
    })

    const yesButtons = document.querySelectorAll('.yesButton');
    const enemyImg = document.querySelectorAll('.enemyImg');
    const choosenEnemy = document.getElementById('choosenEnemy');

    const savedEnemy = localStorage.getItem("selectedEnemy");
    if (savedEnemy) {
        choosenEnemy.src = savedEnemy;
    }

    const username = localStorage.getItem('username') || '';
    const heroName = document.querySelector('.unitNameHero');
    if (heroName) {
        heroName.textContent = username;
    }

    const enemyName = document.querySelector('.unitNameEnemy');
    const enemyHealthBar = document.querySelector('.enemyHealthBar');
    const enemyHealthDigits = document.querySelector('.enemyHealthDigits');
    const chosenEnemyImg = document.getElementById('choosenEnemy');

    function updateEnemy(enemyId) {
        const enemy = enemies.find(e => e.id === enemyId);
        if (!enemy) return;
        enemyName.textContent = enemy.name;
        enemyHealthBar.max = enemy.maxHealth;
        enemyHealthBar.value = enemy.health;
        enemyHealthDigits.textContent = `${enemy.health} / ${enemy.maxHealth}`;
        chosenEnemyImg.src = enemy.imgSrc;
    }
    const popupImages = document.querySelectorAll('.enemyImg');

    popupImages.forEach(img => {
        img.addEventListener("click", function () {
            const enemyId = img.dataset.enemy;
            enemyContainer.classList.add('hidden');
            updateEnemy(enemyId);
        });
    });

    const heroHealth = document.querySelector('.heroHealthDigits');
    const heroHealthBar = document.querySelector('.healthBarHero');
    const loosePopup = document.querySelector('.loosePopup');
    const winPopup = document.querySelector('.winPopup');
    const resultOfBattle = document.querySelector('.resultOfBattle');
    const looseBtn = document.getElementById('looseCloseBtn');
    const winBtn = document.getElementById('winCloseBtn');
    const editEnemy = document.getElementById('setEnemyButton2')

    let wins = getWins(username);
    let losses = getLosses(username);

    heroHealth.textContent = `${heroHealthBar.value} / ${heroHealthBar.max}`;
    const enemyImgContainer = document.querySelector('.unitContainerEnemy');
    const bgMusic = document.getElementById('bgMusic');
    let firstClickDone = false;
    fightButton.addEventListener('click', function () {
        if (battleEnded) return;
        if (!firstClickDone) {
            enemyImgContainer.classList.add('disabled_2');
            editEnemy.classList.add('disabled_2')
            addLog('Battle started!'); logContainer.innerHTML = '';
            alert('Fight Started!');
            bgMusic.currentTime = 12;
            bgMusic.play();
            firstClickDone = true;
            return;
        }

        const selectedAttack = document.querySelector('input[name="attackZone"]:checked');
        if (!selectedAttack) {
            alert('Please select an attack zone!');
            return;
        }
        const playerAttackZone = selectedAttack.value;

        const playerDefenses = Array.from(defenceChbs)
            .filter(chb => chb.checked)
            .map(chb => chb.value)

        const enemyAttackZone = zones[Math.floor(Math.random() * zones.length)];
        const enemyDefenses = [];
        while (enemyDefenses.length < 2) {
            const randomZone = zones[Math.floor(Math.random() * zones.length)];
            if (!enemyDefenses.includes(randomZone)) {
                enemyDefenses.push(randomZone);
            }
        }

        let basePlayerDamage = Math.floor(Math.random() * 25) + 1;
        let playerDamage = enemyDefenses.includes(playerAttackZone) ? Math.floor(basePlayerDamage / 2) : basePlayerDamage;
        let defendedPlayer = enemyDefenses.includes(playerAttackZone);

        let baseEnemyDamage = Math.floor(Math.random() * 25) + 1;
        let enemyDamage = playerDefenses.includes(enemyAttackZone) ? Math.floor(baseEnemyDamage / 2) : baseEnemyDamage;
        let defendedEnemy = playerDefenses.includes(enemyAttackZone);

        heroHealthBar.value = Math.max(0, heroHealthBar.value - enemyDamage);
        heroHealth.textContent = `${heroHealthBar.value} / ${heroHealthBar.max}`;
        enemyHealthBar.value = Math.max(0, enemyHealthBar.value - playerDamage);
        enemyHealthDigits.textContent = `${enemyHealthBar.value} / ${enemyHealthBar.max}`;

        function addLog(message) {
            if (logContainer) {
                const logEntry = document.createElement('p');
                logEntry.innerHTML = message;
                logContainer.appendChild(logEntry);
                logContainer.scrollTop = logContainer.scrollHeight;
            }
        }

        let playerLog = `You attacked the enemy's <span class="log-zone">${playerAttackZone}</span> for <span class="log-damage">${playerDamage}</span> damage.`;
        if (defendedPlayer) {
            playerLog += ` (but it was defended, reduced from <span class="log-damage">${basePlayerDamage}</span>)`;
        }
        addLog('<span class="log-player">' + playerLog + '</span>');

        let enemyLog = `Enemy attacked your <span class="log-zone">${enemyAttackZone}</span> for <span class="log-damage">${enemyDamage}</span> damage.`;
        if (defendedEnemy) {
            enemyLog += ` (but it was defended, reduced from <span class="log-damage">${baseEnemyDamage}</span>)`;
        }
        addLog('<span class="log-enemy">' + enemyLog + '</span>');



        if (heroHealthBar.value > 0 && enemyHealthBar.value <= 0) {
            battleEnded = true;
            wins++;
            updateWins(username, wins);
            winPopup.classList.remove('hidden');
        } else if (enemyHealthBar.value > 0 && heroHealthBar.value <= 0) {
            battleEnded = true;
            losses++;
            updateLosses(username, losses);
            loosePopup.classList.remove('hidden');
        } else if (enemyHealthBar.value === 0 && heroHealthBar.value === 0) {
            battleEnded = true;
            alert('Unbelievable! That is a draw...');
            window.location.href = 'character.html';
        }
    })

    if (looseBtn || winBtn) {
        looseBtn.addEventListener('click', () => {
            alert('You loose!');
            loosePopup.classList.add('hidden');
            bgMusic.pause();
            bgMusic.currentTime = 12;
            window.location.href = 'character.html'
        });
        winBtn.addEventListener('click', () => {
            alert('You win!');
            winPopup.classList.add('hidden');
            bgMusic.pause();
            bgMusic.currentTime = 12;
            window.location.href = 'character.html'
        });
    }

    const looseWindow = document.querySelector('.loosePopupContent');
    if (looseWindow) {
        document.addEventListener('click', function (event) {
            if (!looseWindow.contains(event.target) && event.target !== looseBtn) {
                resultOfBattle.classList.add('hidden');
            }
        });
    }

    const winWindow = document.querySelector('.winPopupContent');
    if (winWindow) {
        document.addEventListener('click', function (event) {
            if (!winWindow.contains(event.target) && event.target !== winBtn) {
                resultOfBattle.classList.add('hidden');
            }
        });
    }
}