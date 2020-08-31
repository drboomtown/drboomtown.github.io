const dropdowns = document.querySelectorAll('.dropdown');
const inputs = document.querySelectorAll('.input-field');
for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('click', e => {
        if (e.target.classList.contains('dropdown-item')) {
            dropdowns[i].querySelector('button').innerText = e.target.innerText;
            doTheThing();
        }
    });
}
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', doTheThing);
}
;
function calcMinDR(autoEatThreshold, combatTriangle, combatStyle) {
    let currHP = document.getElementById('currHealth').value;
    DUNGEONS.forEach(dungeon => {
        dungeon.monsters.forEach(monster => {
            monster.minDR = Math.max(0, Math.ceil((Math.ceil((monster.maxHit - (currHP * autoEatThreshold)) / monster.maxHit * 100)) / combatTriangle[combatStyle][monster.attackType]));
        });
    });
}
function calcReducedMaxHit(combatTriangle, combatStyle) {
    let currDR = document.getElementById('currDR').value;
    DUNGEONS.forEach(dungeon => {
        dungeon.monsters.forEach(monster => {
            let damageModifier = Math.floor(currDR * combatTriangle[combatStyle][monster.attackType]);
            monster.reducedMaxHit = Math.floor((100 - damageModifier) / 100 * monster.maxHit);
        });
    });
}
function updateTable() {
    // find highest dr monster in dungeon, return that monsters object, use to update table.
    const table = document.querySelectorAll('tbody tr');
    let toughestFoeList = [];
    let combatStyleSelect = ["Melee", "Ranged", "Magic"];
    let currDR = document.getElementById('currDR').value;
    DUNGEONS.forEach(dungeon => {
        let highestDR = Math.max(...dungeon.monsters.map(monster => monster.minDR));
        let toughestFoe = dungeon.monsters.find(monster => monster.minDR === highestDR);
        toughestFoeList.push(toughestFoe);
    });
    toughestFoeList.forEach((monster, i) => {
        let tablerow = table[i].querySelectorAll('td');
        tablerow[0].textContent = monster.minDR;
        tablerow[2].textContent = monster.name;
        tablerow[3].textContent = combatStyleSelect[monster.attackType];
        tablerow[4].textContent = monster.maxHit;
        tablerow[5].textContent = monster.reducedMaxHit;
        if (monster.minDR <= currDR) {
            //table[i] to colour entire row, need to work out how to keep striping
            tablerow[1].classList.add("idleable");
        }
        else if (monster.minDR > currDR && tablerow[1].classList.contains("idleable")) {
            tablerow[1].classList.remove("idleable");
        }
    });
    // 
    // tablerow[0].textContent = '99';
}
function doTheThing() {
    let autoEatThreshold;
    switch (document.getElementById('autoEatDropDown').innerText.trim()) {
        case "0":
            autoEatThreshold = 0;
            break;
        case "1":
            autoEatThreshold = 0.2;
            break;
        case "2":
            autoEatThreshold = 0.3;
            break;
        case "3":
            autoEatThreshold = 0.4;
            break;
    }
    let combatStyle;
    switch (document.getElementById('combatStyleDropDown').innerText.trim()) {
        case "Melee":
            combatStyle = 0;
            break;
        case "Ranged":
            combatStyle = 1;
            break;
        case "Magic":
            combatStyle = 2;
            break;
    }
    let combatTriangle;
    switch (document.getElementById('gameModeDropDown').innerText.trim()) {
        case "Normal":
            combatTriangle = [[1, 1.25, 0.5], [0.95, 1, 1.25], [1.25, 0.85, 1]];
            break;
        case "Hardcore":
            combatTriangle = [[1, 1.25, 0.25], [0.75, 1, 1.25], [1.25, 0.75, 1]];
            break;
    }
    calcMinDR(autoEatThreshold, combatTriangle, combatStyle);
    calcReducedMaxHit(combatTriangle, combatStyle);
    updateTable();
}
/*
TODO
make shit go colourfull if you have enough DR equipt
input arrows not submit form,
Improve style
letter spacing, center collumn text
colour striping with green overlay
stop shit moving about, fix width of columns
If multiple monsters have 0 DR, show the one with the highest reduced max hit
Save previous settings
make code less shit
tabs with other calcs?
*/ 
//# sourceMappingURL=app.js.map