let hp = 100;
let gold = 50;
let xp = 0;
let dmg = 0;
let currentWeapon = 0;
let buffDuration = 0; 

let inventory = ["Fist"]

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
    {
        name: "Town", 
        buttonText: ["Shop", "Explore", "Challenge"], 
        buttonFunctions: [goShop, goExplore, goChallenge],
        text: "Current location: Town."
    },
    {
        name: "Store", 
        buttonText: ["Buy Potion \n(-10 Golds)", "Others", "Return"], 
        buttonFunctions: [buyPotion, goOthers, goTown],
        text: "Current location: Store."
    }, 
    {
        name: "Others",
        buttonText: ["Buy Weapon buff \n(-15 Golds)", "Buy Weapons \n (-25 Golds)", "Return"],  
        buttonFunctions: [buyBuff, buySword, goTown],
        text: "Current location: Store."
    },
    {
        name: "Explore", 
        buttonText: ["Adventure", "Tower", "Return"], 
        buttonFunctions: [goAdventure, goTower, goTown],
        text: "Which way to explore? or Return to the town.",
    },
    {
        name: "Adventure", 
        buttonText: ["Fight Goblin","Fight Malenia Blade of Miquella","Return"], 
        buttonFunctions: [goGoblin, goKYS , goTown],
        text: "Adventure!"
    },
    {
        name: "battle",
        "Button Text": ["Attack", "Dodge", "Run"],
        "Button Functions": [goAttack, goDodge, goTown],
        "Text": "Battle Initiated!"

    }
];

let currentLocationIndex = 0;

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

//Shopping/////////////////////////////////////////////////////////////////////////

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
    }
    else{
        text.innerText = "You don't have enough gold!";
    }
}

function goOthers(){
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
        buffDuration = 1; // Set the buff duration to 1 turn
        buffCooldown = true;

        // Set a timeout for the cooldown duration (e.g., 3 seconds)
        setTimeout(() => {
            buffCooldown = false;
        }, 30000);

        updateUI();
        text.innerText = "You applied a weapon buff!\n (-15 Gold)";
    }
}
function buySword() {
    if (currentWeapon < weapons.length -1){
        if (gold >= 25) {
            gold -= 25;
            currentWeapon ++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You bought a " + newWeapon +"\n(-25 Gold)";
            inventory.push(newWeapon);
            text.innerText += "In your inventory you have: " + inventory;
        } else {
            text.innerText = "You don't have enough gold!";
        }
        updateUI();
    }
    else{
        text.innerText = "You already got busted weapon!";
        button2.innerText = "Sell Weapon (+20 Golds)";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
            gold += 20;
            goldText.innerText = gold;
            let currentWeapon = inventory.shift();
            text.innerText = "You sold a " + currentWeapon +"\n(+20 Gold)";
            inventory.pop(newWeapon);
            text.innerText += "In your inventory you have: " + inventory;
            updateUI();
    }
    else{
        text.innerText = "You don't have any weapon!";
        button2.innerText = "Buy Weapon (-15 Golds)";
        button2.onclick = buySword;
    }
}
//Shopping/////////////////////////////////////////////////////////////////////////
function goExplore() {
    currentLocationIndex = 3;
    update();
    console.log("Proceeding to explore...");
}

function goAdventure() {
    currentLocationIndex = 4;
    update();
}

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
function goKYS() { //this Malenia BTW and KYS meaning is KILL YOURSELF//
    battle = 4;
    goBattle();
}

//ENEMIES///////////////////////////////////////////////////////////////////////////////////

//Battle///////////////////////////////////////////////////////////////////////////////////
function goAttack() {
    console.log("Proceeding to attack...");
}

function goDodge() {
    console.log("Proceeding to dodge...");
}
function goTower() {
    console.log("Proceeding to tower...");
}

function goChallenge() {
    console.log("Proceeding to challenge...");
}

function goBattle(){

}

function updateUI() {
    hpText.textContent = hp;
    goldText.textContent = gold;
    xpText.textContent = xp;
    dmgText.textContent = dmg;
}

// Function to simulate turns and decrease buff duration
function simulateTurn() {
    if (buffDuration > 0) {
        buffDuration--;
        if (buffDuration === 20000) {
            dmg += 20; // Remove the buff when duration reaches 0 
            updateUI();
            text.innerText = "Weapon buff has worn off!";
        }
    }
}

// Call simulateTurn() to decrease buff duration on each turn
setInterval(simulateTurn, 3000); // Adjust the interval as needed

// Initial update to set the UI to the default location
update();
