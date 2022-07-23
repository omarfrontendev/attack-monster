const monster = document.querySelector(".monster-health");
const player = document.querySelector(".player-health");
const attackBtn = document.querySelector(".attack-btn");
const strongAttackBtn = document.querySelector(".strong-attack-btn");
const healBtn = document.querySelector(".heal-btn");
const monster_Wins = document.querySelector(".monster-wins");
const player_Wins = document.querySelector(".player-wins");

const attack_VAlue = 10;
const strong_attack_Value = 17;
const attack_Monster_VAlue = 13;
const strong_attack_Monster_VAlue = 15;
const playerHeal = 20;

let maxLife = 100;
let currentPlayerHealth = maxLife;
let currentMonsterHealth = maxLife;
let monsterWins = 0;
let youWins = 0;
let playerHealCounter = 0

function getHealthBar(element) {
    element.style.width = element.dataset.width + "%";
};

getHealthBar(monster);
getHealthBar(player);

function dealtDamage(damage,element) {
    const dealtDamage = Math.random() * damage;
    element.dataset.width -= dealtDamage;
    getHealthBar(element);
};

function finalConditions(string, ele1, ele2) {
    alert(string);
    ele1.style.width = 0 + "px";
    ele2.style.width = 0 + "px";
};

function endRound() {
    currentPlayerHealth = player.dataset.width;
    currentMonsterHealth = monster.dataset.width;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {

        finalConditions("You Won!", monster, player);
        youWins++
        player_Wins.innerHTML = youWins;

    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {

        finalConditions("You Lost!", monster, player);
        monsterWins++
        monster_Wins.innerHTML = monsterWins;

    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {

        finalConditions("You Have a Draw!", monster, player);

    };
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        setTimeout(() => {
            monster.dataset.width = 100;
            player.dataset.width = 100;
            getHealthBar(monster);
            getHealthBar(player);
            healBtn.classList.remove("out");
            playerHealCounter = 0;
        }, 1000)
    }
};

function fight(attackPlayerValue, attackMonsterValue) {
    dealtDamage(attackPlayerValue, monster); 
    dealtDamage(attackMonsterValue, player);
    endRound();
    healBtn.classList.remove("disabled");
};

function attackHandel() {
    fight(attack_VAlue, attack_Monster_VAlue);
};

function strongAttackHandel() {
    fight(strong_attack_Value, strong_attack_Monster_VAlue);
};

function healPlayerHandel() {
    if (player.dataset.width >= 100) {
        alert("You Can't Heal Now");
    } else if (player.dataset.width <= 100 - playerHeal) {
        healBtn.classList.add("disabled");
        dealtDamage(attack_Monster_VAlue, player);
        currentPlayerHealth = +player.dataset.width + playerHeal;
        player.dataset.width = currentPlayerHealth;
        playerHealCounter++
        getHealthBar(player);
        endRound();
    }
    if (playerHealCounter == 2) {
        healBtn.classList.add("out");
    };
};

attackBtn.addEventListener("click", attackHandel);
strongAttackBtn.addEventListener("click", strongAttackHandel);
healBtn.addEventListener("click", healPlayerHandel);

