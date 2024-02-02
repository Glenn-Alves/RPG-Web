let hp = 100;
let gold = 50;
let xp = 0;
let dmg = 0;
let currentWeapon = 0;
let buffDuration = 0; 
let inventory = ["Fist"]
let monsterHP = 0;
//MY FUCKING CUNTSS IT DOESN"T WORK!!!!!!!!!!!!!
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const hpText = document.querySelector("#hpText");
const goldText = document.querySelector("#goldText");
const dmgText = document.querySelector("#dmgText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHPText = document.querySelector("#MonsterHP");

const weapons = [
    {
        name: "RustySword",
        dmg: 20,
    },
    {
        name: "IronSword",
        dmg: 35,
    },
    {
        name: "SilverSword",
        dmg: 50,
    },
    {
        name: "GoldSword",
        dmg: 75,
    },
    {
        name: "Sword of Humiliation",
        dmg: 100,
    },
]

const monster = [
    {
        name: "Goblin",
        lvl: 5,
        hp: 50
    },
    {
        name: "Reddit moderator",
        lvl: 15,
        hp: 120
    },
    {
        name: "Fat Discord moderator",
        lvl: 30,
        hp: 200
    },
    {
        name: "A fucking NPC in Twitter",
        lvl: 65,
        hp: 500
    },
    {
        name: "Malenia Blade of Miquella",
        lvl: 100,
        hp: 1000
    },
]

const locations = [
    {//0
        name: "Town", 
        buttonText: ["Shop", "Explore", "Challenge"], 
        buttonFunctions: [goShop, goExplore, goChallenge],
        text: "Current location: Town."
    },
    {//1
        name: "Store", 
        buttonText: ["Buy Potion \n(-10 Golds)", "Others", "Return"], 
        buttonFunctions: [buyPotion, goOthers, goTown],
        text: "Current location: Store."
    }, 
    {//2
        name: "Others",
        buttonText: ["Buy Weapon buff \n(-15 Golds)", "Buy Weapons \n (-25 Golds)", "Return"],  
        buttonFunctions: [buyBuff, buySword, goTown],
        text: "Current location: Store."
    },
    {//3
        name: "Explore", 
        buttonText: ["Adventure", "Tower", "Return"], 
        buttonFunctions: [goAdventure, goTower, goTown],
        text: "Which way to explore? or Return to the town.",
    },
    {//4
        name: "Adventure", 
        buttonText: ["Fight Goblin","Fight Malenia Blade of Miquella","Return"], 
        buttonFunctions: [goGoblin, goKYS , goTown],
        text: "Adventure!"
    },
    {//5
        name: "battle",
        "Button Text": ["Attack", "Dodge", "Run"],
        "Button Functions": [goAttack, goDodge, goTown],
        "Text": "Battle Initiated!"
    },
    {//6
        name: "Slay",
        "Button Text": ["Return", "Return", "Return"],
        "Button Functions": [goTown, goTown, goTown],
        "Text": "You won the battle!"
    },
    {//7
        name: "Defeated",
        "Button Text": ["Try Again?", "Try Again?", "Return"],
        "Button Functions": [restart, restart, goTown],
        "Text": "You Died!"
    },
     {//8
        name: "Victory",
        "Button Text": ["Try Again?", "Try Again?", "Return"],
        "Button Functions": [restart, restart, goTown],
        "Text": "You Defeated the Rottusy! Now buy Elden Ring!"
    }


];

let currentLocationIndex = 0;
let battle;

function update() {
    const currentLocation = locations[currentLocationIndex];

    text.innerText = currentLocation.text;
    button1.innerText = currentLocation.buttonText[0];
    button2.innerText = currentLocation.buttonText[1];
    button3.innerText = currentLocation.buttonText[2];

    button1.onclick = currentLocation.buttonFunctions[0];
    button2.onclick = currentLocation.buttonFunctions[1];
    button3.onclick = currentLocation.buttonFunctions[2];
}

function returnFromShop() {
    currentLocationIndex = 0;
    update();
}

function goTown() {
    currentLocationIndex = 0;
    update();
}

// Shopping/////////////////////////////////////////////////////////////////////////

function goShop() {
    currentLocationIndex = 1;
    update();
}

function buyPotion() {
    if (gold >= 10) {
        gold -= 10;
        hp += 25;
        updateUI();
        text.innerText = "You bought a potion!\n (-10)";
    } else {
        text.innerText = "You don't have enough gold!";
    }
}

function goOthers() {
    currentLocationIndex = 2;
    update();
}

let buffCooldown = false;
function buyBuff() {
    if (buffDuration > 0) {
        text.innerText = "The weapon buff is already active!";
    } else if (gold < 15) {
        text.innerText = "You don't have enough gold!";
    } else if (buffCooldown) {
        text.innerText = "You can't buy another buff right now.";
    } else {
        gold -= 15;
        dmg += 20;
        buffDuration = 1; 
        buffCooldown = true;
//Thanks to the guy from StackOverlow
        setTimeout(() => {
            buffCooldown = false;
        }, 30000);

        updateUI();
        text.innerText = "You applied a weapon buff!\n (-15 Gold)";
    }
}

function buySword() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 25) {
            gold -= 25;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = `You bought a ${newWeapon}\n(-25 Gold)\nIn your inventory you have: ${inventory}`;
            inventory.push(newWeapon);
        } else {
            text.innerText = "You don't have enough gold!";
        }
        updateUI();
    } else {
        text.innerText = "You already got a busted weapon!";
        button2.innerText = "Sell Weapon (+20 Golds)";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 20;
        let currentWeapon = inventory.shift();
        text.innerText = `You sold a ${currentWeapon}\n(+20 Gold)\nIn your inventory you have: ${inventory}`;
        updateUI();
    } else {
        text.innerText = "You don't have any weapon!";
        button2.innerText = "Buy Weapon (-15 Golds)";
        button2.onclick = buySword;
    }
}

// Shopping////////////////////////////////////////////////////////////
//ENEMIES///////////////////////////////////////////////////////////////////////////////////
function goGoblin() {
    battle = 0;
    goBattle();
}

function goRedditMod(){
    battle = 1;
    goBattle();
}
function goDiscordMod(){
    battle = 2;
    goBattle();
}
function goRetardedTwitterUser(){
    battle = 3;
    goBattle();
}
function goKYS() { //this Malenia BTW and KYS = Kill yourself!
    battle = 4;
    goBattle();
}

//ENEMIES///////////////////////////////////////////////////////////////////////////////////


//Battle///////////////////////////////////////////////////////////////////////////////////
function goBattle() {
    update(locations[5]);
    monsterHP = monster[battle].hp;
    monsterStats.style.display = "flex";
    monsterNameText.innerText = monster[battle].name;
    monsterHPText.innerText = monsterHP;
}
function goAttack() {
    text.innerText = "The " + monster[battle].name + " attacks.";
    text.innerText += " You attack the enemy with your " + weapons[currentWeapon].name + ".";

    hp -= monster[battle].lvl;
    monsterHP -= weapons[currentWeapon].dmg + Math.floor(Math.random() * xp) + 1;

    hpText.innerText = hp;
    monsterHPText.innerText = monsterHP;

    if (hp <= 0) {
        goDefeated();
    } else if (monsterHP <= 0) {
        battle === 4 ? winGame() : defeatMonster();
    }
}

function defeatMonster() {
    update(locations[6]);
    text.innerText = "You have defeated the " + monster[battle].name + "!";
}

function goDodge() {
    text.innerText = monster[battle].name + " missed!";
}

function winGame() {
    update(locations[8]);
}

function goVictory() {  
    gold += Math.floor(monster[battle].lvl * 5.5);
    goldText.innerText = gold;
    xp += monster[battle].lvl;
    xpText.innerText = xp;
    update(locations[6]);
    text.innerText = "You have defeated the " + monster[battle].name + "!";
}

//Battle///////////////////////////////////////////////////////////////////////////////////


function goExplore() {
    currentLocationIndex = 3;
    update();
    console.log("Proceeding to explore...");
}

function goAdventure() {
    currentLocationIndex = 4;
    update();
}
function goTower() {
    console.log("Proceeding to tower...");
}

function goChallenge() {
    console.log("Proceeding to challenge...");
}

function updateUI() {
    hpText.textContent = hp;
    goldText.textContent = gold;
    xpText.textContent = xp;
    dmgText.textContent = dmg;
}

function simulateTurn() {
    if (buffDuration > 0) {
        buffDuration--;
        if (buffDuration === 20000) {
            dmg += 20; 
            updateUI();
            text.innerText = "Weapon buff has worn off!";
        }
    }
}

function restart() {
    hp = 100;
    gold = 50;
    xp = 0;
    currentWeapon = 0;
    inventory = ["fist"];

    if (goldText && hpText && xpText) {
        goldText.innerText = gold;
        hpText.innerText = hp;
        xpText.innerText = xp;
    } else {
        console.error("Error: One or more UI elements not found.");
    }

    goTown();
}

//this is for the buff 
setInterval(simulateTurn, 3000); 
update();
