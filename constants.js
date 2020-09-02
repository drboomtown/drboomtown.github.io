const DUNGEONS = [
    {
        "name": "Chicken Coop",
        "monsters": [
            {
                "name": "Chicken",
                "attackType": 0,
                "maxHit": 11,
            },
            {
                "name": "Chick",
                "attackType": 0,
                "maxHit": 10,
            },
            {
                "name": "Mumma Chicken",
                "attackType": 0,
                "maxHit": 52,
            }
        ]
    },
    {
        "name": "Undead Graveyard",
        "monsters": [
            {
                "name": "Zombie Hand",
                "attackType": 0,
                "maxHit": 42,
            },
            {
                "name": "Zombie",
                "attackType": 0,
                "maxHit": 52,
            },
            {
                "name": "Ghost",
                "attackType": 0,
                "maxHit": 62,
            },
            {
                "name": "Zombie Leader",
                "attackType": 0,
                "maxHit": 106,
            }
        ]
    },
    {
        "name": "Bandit Base",
        "monsters": [
            {
                "name": "Bandit Trainee",
                "attackType": 1,
                "maxHit": 42,
            },
            {
                "name": "Bandit",
                "attackType": 1,
                "maxHit": 82,
            },
            {
                "name": "Bandit Leader",
                "attackType": 1,
                "maxHit": 174,
            }
        ]
    },
    {
        "name": "Hall of Wizards",
        "monsters": [
            {
                "name": "Wizard",
                "attackType": 2,
                "maxHit": 120,
            },
            {
                "name": "Master Wizard",
                "attackType": 2,
                "maxHit": 170,
            },
            {
                "name": "Dark Wizard",
                "attackType": 2,
                "maxHit": 210,
            },
            {
                "name": "Elder Wizard",
                "attackType": 2,
                "maxHit": 210,
            }
        ]
    },
    {
        "name": "Spider Forest",
        "monsters": [
            {
                "name": "Spider",
                "attackType": 0,
                "maxHit": 72,
            },
            {
                "name": "Spider",
                "attackType": 0,
                "maxHit": 72,
            },
            {
                "name": "Evil Spider",
                "attackType": 0,
                "maxHit": 102,
            },
            {
                "name": "Spider King",
                "attackType": 0,
                "maxHit": 142,
            }
        ]
    },
    {
        "name": "Deep Sea Ship",
        "monsters": [
            {
                "name": "Pirate",
                "attackType": 0,
                "maxHit": 84,
            },
            {
                "name": "First Mate",
                "attackType": 0,
                "maxHit": 131,
            },
            {
                "name": "Pirate Captain",
                "attackType": 0,
                "maxHit": 177,
            },
            {
                "name": "The Kraken",
                "attackType": 0,
                "maxHit": 204,
            }
        ]
    },
    {
        "name": "Frozen Cove",
        "monsters": [
            {
                "name": "Ice Monster",
                "attackType": 0,
                "maxHit": 92,
            },
            {
                "name": "Ice Troll",
                "attackType": 0,
                "maxHit": 102,
            },
            {
                "name": "Ice",
                "attackType": 0,
                "maxHit": 102,
            },
            {
                "name": "Protector of Ice",
                "attackType": 0,
                "maxHit": 172,
            }
        ]
    },
    {
        "name": "Dragons Den",
        "monsters": [
            {
                "name": "Green Dragon",
                "attackType": 0,
                "maxHit": 143,
            },
            {
                "name": "Blue Dragon",
                "attackType": 0,
                "maxHit": 168,
            },
            {
                "name": "Red Dragon",
                "attackType": 0,
                "maxHit": 212,
            },
            {
                "name": "Black Dragon",
                "attackType": 0,
                "maxHit": 268,
            },
            {
                "name": "Elder Dragon",
                "attackType": 0,
                "maxHit": 470,
            }
        ]
    },
    {
        "name": "Volcanic Cave",
        "monsters": [
            {
                "name": "Bat",
                "attackType": 0,
                "maxHit": 52,
            },
            {
                "name": "Big Bat",
                "attackType": 0,
                "maxHit": 82,
            },
            {
                "name": "The Eye",
                "attackType": 2,
                "maxHit": 140,
            },
            {
                "name": "Resurrected Eye",
                "attackType": 2,
                "maxHit": 240,
            },
            {
                "name": "Vicious Serpent",
                "attackType": 1,
                "maxHit": 282,
            },
            {
                "name": "Fire Spirit",
                "attackType": 2,
                "maxHit": 340,
            },
            {
                "name": "Prat, the Protector of Secrets",
                "attackType": 1,
                "maxHit": 501,
            },
            {
                "name": "Malcs, the Guardian of Melvor",
                "attackType": 0,
                "maxHit": 520,
            }
        ]
    },
    {
        "name": "Air God Dungeon",
        "monsters": [
            {
                "name": "Air Guard",
                "attackType": 1,
                "maxHit": 340,
            },
            {
                "name": "Air Monster",
                "attackType": 0,
                "maxHit": 441,
            },
            {
                "name": "Air Golem",
                "attackType": 1,
                "maxHit": 650,
            },
            {
                "name": "Aleron",
                "attackType": 0,
                "maxHit": 699,
            },
            {
                "name": "Voltaire",
                "attackType": 1,
                "maxHit": 713,
            },
            {
                "name": "Aeris",
                "attackType": 1,
                "maxHit": 650,
            }
        ]
    },
    {
        "name": "Water God Dungeon",
        "monsters": [
            {
                "name": "Water Guard",
                "attackType": 2,
                "maxHit": 370,
            },
            {
                "name": "Water Monster",
                "attackType": 0,
                "maxHit": 650,
            },
            {
                "name": "Water Golem",
                "attackType": 2,
                "maxHit": 845,
            },
            {
                "name": "Lissia",
                "attackType": 2,
                "maxHit": 720,
            },
            {
                "name": "Murtia",
                "attackType": 0,
                "maxHit": 733,
            },
            {
                "name": "Glacia",
                "attackType": 2,
                "maxHit": 1080,
            }
        ]
    },
    {
        "name": "Earth God Dungeon",
        "monsters": [
            {
                "name": "Earth Guard",
                "attackType": 1,
                "maxHit": 320,
            },
            {
                "name": "Earth Monster",
                "attackType": 0,
                "maxHit": 650,
            },
            {
                "name": "Earth Golem",
                "attackType": 0,
                "maxHit": 850,
            },
            {
                "name": "Mistral",
                "attackType": 2,
                "maxHit": 680,
            },
            {
                "name": "Ophidia",
                "attackType": 0,
                "maxHit": 699,
            },
            {
                "name": "Terran",
                "attackType": 0,
                "maxHit": 950,
            }
        ]
    },
    {
        "name": "Fire God Dungeon",
        "monsters": [
            {
                "name": "Fire Guard",
                "attackType": 0,
                "maxHit": 650,
            },
            {
                "name": "Fire Monster",
                "attackType": 0,
                "maxHit": 487,
            },
            {
                "name": "Fire Golem",
                "attackType": 2,
                "maxHit": 580,
            },
            {
                "name": "Pyra",
                "attackType": 2,
                "maxHit": 900,
            },
            {
                "name": "Ignis",
                "attackType": 0,
                "maxHit": 900,
            },
            {
                "name": "Ragnar",
                "attackType": 2,
                "maxHit": 1300,
            }
        ]
    }
];
//# sourceMappingURL=constants.js.map