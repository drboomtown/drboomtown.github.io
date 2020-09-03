const dropdowns = document.querySelectorAll('.dropdown');
const inputs = document.querySelectorAll('.input-field');
const shareBTN = document.getElementById('shareButton');
window.onload = () => {
    let entries = urlInputs();
    updateurlInputs(entries);
    doTheThing();
};
shareBTN.addEventListener('click', () => share());
$(function () {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();
});
$('[data-toggle="popover"]').popover().click(function () {
    setTimeout(function () {
        $('[data-toggle="popover"]').popover('hide');
    }, 2000);
});
for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('click', e => {
        if (e.target.classList.contains('dropdown-item')) {
            e.preventDefault();
            dropdowns[i].querySelector('button').innerText = e.target.innerText;
            doTheThing();
            if (e.target.innerText === "Hardcore") {
                dropdowns[i].querySelector('button').classList.add("btn-hardcore");
            }
            else if (e.target.innerText === "Normal" && dropdowns[i].querySelector('button').classList.contains("btn-hardcore")) {
                dropdowns[i].querySelector('button').classList.remove("btn-hardcore");
            }
        }
    });
}
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', doTheThing);
    // inputs[i].addEventListener('click', doTheThing);
}
function urlInputs() {
    // https://drboomtown.github.io/?hp=500&dr=65&ae=2&style=Ranged&mode=Hardcore
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.entries();
}
function share() {
    let copyURL = `https://drboomtown.github.io/?hp=${document.getElementById('currHealth').value.trim()}&dr=${document.getElementById('currDR').value.trim()}&ae=${document.getElementById('autoEatDropDown').innerText.trim()}&style=${document.getElementById('combatStyleDropDown').innerText.trim()}&mode=${document.getElementById('gameModeDropDown').innerText.trim()}`;
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = copyURL;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
function updateurlInputs(entries) {
    for (let entry of entries) {
        if (entry[0] === 'hp' && +entry[1] >= 100 && +entry[1] <= 1030) {
            document.getElementById('currHealth').value = entry[1];
        }
        if (entry[0] === 'dr' && +entry[1] >= 0 && +entry[1] <= 85) {
            document.getElementById('currDR').value = entry[1];
        }
        if (entry[0] === 'ae' && +entry[1] >= 1 && +entry[1] <= 3) {
            document.getElementById('autoEatDropDown').innerText = entry[1];
        }
        if (entry[0] === 'style' && entry[1] === "Melee" || entry[1] === "Ranged" || entry[1] === "Magic") {
            document.getElementById('combatStyleDropDown').innerText = entry[1];
        }
        if (entry[0] === 'style' && entry[1] === "Normal" || entry[1] === "Hardcore") {
            document.getElementById('gameModeDropDown').innerText = entry[1];
            if (entry[1] === "Hardcore") {
                document.querySelector("#gameModeDropDown").classList.add("btn-hardcore");
            }
        }
    }
}
function calcMinDR(autoEatThreshold, combatTriangle, combatStyle) {
    let currHP = document.getElementById('currHealth').value;
    DUNGEONS.forEach(dungeon => {
        dungeon.monsters.forEach(monster => {
            // monster.minDR = Math.max(0, Math.ceil(Math.ceil((monster.maxHit - (currHP * autoEatThreshold)) / monster.maxHit * 100) / combatTriangle[combatStyle][monster.attackType]));
            monster.minDR = Math.max(0, Math.ceil(Math.ceil(100 - currHP / monster.maxHit * (100 * autoEatThreshold)) / combatTriangle[combatStyle][monster.attackType]));
        });
    });
}
function calcReducedMaxHit(combatTriangle, combatStyle) {
    let currDR = document.getElementById('currDR').value;
    DUNGEONS.forEach(dungeon => {
        dungeon.monsters.forEach(monster => {
            let damageModifier = Math.floor(currDR * combatTriangle[combatStyle][monster.attackType]);
            monster.reducedMaxHit = monster.maxHit - Math.floor(monster.maxHit * damageModifier / 100);
        });
    });
}
function calcHPneeded(combatTriangle, combatStyle, autoEatThreshold) {
    let currDR = document.getElementById('currDR').value;
    DUNGEONS.forEach(dungeon => {
        dungeon.monsters.forEach(monster => {
            let damageModifier = Math.floor(currDR * combatTriangle[combatStyle][monster.attackType]);
            monster.reqHP = Math.max(100, Math.ceil((monster.maxHit - Math.floor(monster.maxHit * damageModifier / 100)) / autoEatThreshold / 10) * 10);
        });
    });
}
function updateDungeonTable() {
    // find highest dr monster in dungeon, return that monsters object, use to update table.
    const table = document.querySelectorAll('.dungeon-table tbody tr');
    let toughestFoeList = [];
    let combatStyleSelect = ["Melee", "Ranged", "Magic"];
    let currDR = document.getElementById('currDR').value;
    DUNGEONS.forEach(dungeon => {
        let highestDR = Math.max(...dungeon.monsters.map(monster => monster.minDR));
        let highestReqHP = Math.max(...dungeon.monsters.map(monster => monster.reqHP));
        let highestHit = Math.max(...dungeon.monsters.map(monster => monster.reducedMaxHit));
        let toughestFoe;
        toughestFoe = dungeon.monsters.find(monster => monster.reducedMaxHit === highestHit);
        toughestFoe.dungHighDr = highestDR;
        toughestFoe.dungHighHit = highestReqHP;
        toughestFoeList.push(toughestFoe);
    });
    toughestFoeList.forEach((monster, i) => {
        let tablerow = table[i].querySelectorAll('td');
        tablerow[0].textContent = monster.dungHighDr;
        tablerow[1].textContent = monster.dungHighHit;
        tablerow[3].textContent = monster.name;
        tablerow[4].textContent = combatStyleSelect[monster.attackType];
        tablerow[5].textContent = monster.maxHit;
        tablerow[6].textContent = monster.reducedMaxHit;
        // i want to change this so apply to entire row, not just each individual cell
        if (monster.minDR <= currDR) {
            tablerow.forEach(element => element.classList.add("idleable"));
        }
        else if (monster.minDR > currDR && tablerow[0].classList.contains("idleable")) {
            tablerow.forEach(element => element.classList.remove("idleable"));
        }
    });
    // 
    // tablerow[0].textContent = '99';
}
function updatePlayerTable(autoEatThreshold, combatTriangle, combatStyle) {
    const table = document.querySelectorAll('.player-table tbody tr td');
    let currDR = document.getElementById('currDR').value;
    let currHP = document.getElementById('currHealth').value;
    table[1].textContent = currHP * autoEatThreshold;
    table[3].textContent = Math.ceil(currDR * combatTriangle[combatStyle][0]);
    table[5].textContent = Math.ceil(currDR * combatTriangle[combatStyle][1]);
    table[7].textContent = Math.ceil(currDR * combatTriangle[combatStyle][2]);
}
function getAutoEatThreshold(autoEatLevel) {
    switch (autoEatLevel) {
        case "0":
            return 0;
        case "1":
            return 0.2;
        case "2":
            return 0.3;
        case "3":
            return 0.4;
    }
}
function getCombatTriangle(gameMode) {
    switch (gameMode) {
        case "Normal":
            return [[1, 1.25, 0.5], [0.95, 1, 1.25], [1.25, 0.85, 1]];
        case "Hardcore":
            return [[1, 1.25, 0.25], [0.75, 1, 1.25], [1.25, 0.75, 1]];
    }
}
function getCombatStyle(style) {
    switch (style) {
        case "Melee":
            return 0;
        case "Ranged":
            return 1;
        case "Magic":
            return 2;
    }
}
function doTheThing() {
    let autoEatThreshold = getAutoEatThreshold(document.getElementById('autoEatDropDown').innerText.trim());
    let combatStyle = getCombatStyle(document.getElementById('combatStyleDropDown').innerText.trim());
    let combatTriangle = getCombatTriangle(document.getElementById('gameModeDropDown').innerText.trim());
    calcMinDR(autoEatThreshold, combatTriangle, combatStyle);
    calcReducedMaxHit(combatTriangle, combatStyle);
    calcHPneeded(combatTriangle, combatStyle, autoEatThreshold);
    updateDungeonTable();
    updatePlayerTable(autoEatThreshold, combatTriangle, combatStyle);
}
/*
TODO
X make shit go colourfull if you have enough DR equipt
X input arrows not submit form,
X letter spacing, center collumn text (do i want this?)
X colour striping with green overlay (working but i want to do it better)
X stop shit moving about, fix width of columns
X If multiple monsters have 0 DR, show the one with the highest reduced max hit
X trim whitespace on URLgenerator
X change DR and HP needed columns to always show the highest in the dungeon, base toughest foe column off highest max hit monster

pop over tables of all dungeon monsters when you mouse over toughest foe or dungeon name
see if i can improve minDR equation
 -- table of output info, autoeat threshold + DR%s after combat triangle for all styles (done but need to place it somewhere)
Improve style
Save previous settings
make code less shit
tabs with other calcs?
*/
// DUNGEONS.forEach(dungeon => {
//     let highestDR = Math.max(...dungeon.monsters.map(monster => monster.minDR));
//     let toughestFoe: object;
//     if(highestDR === 0){
//         let highestHit = Math.max(...dungeon.monsters.map(monster => monster.reducedMaxHit));
//         toughestFoe = dungeon.monsters.find(monster => monster.reducedMaxHit === highestHit);
//     } else {
//         toughestFoe = dungeon.monsters.find(monster => monster.minDR === highestDR);
//     }
//     toughestFoeList.push(toughestFoe);
//     });
//# sourceMappingURL=app.js.map