import React from 'react';
import { Cost, EquipmentItem, HeroType, League, Translations } from "./types";

export const ORE_IMAGES = {
    shiny: 'https://static.wikia.nocookie.net/clashofclans/images/d/da/Shiny_Ore.png/revision/latest/scale-to-width-down/100?cb=20231214003018',
    glowy: 'https://static.wikia.nocookie.net/clashofclans/images/7/72/Glowy_Ore.png/revision/latest/scale-to-width-down/100?cb=20231214002947',
    starry: 'https://static.wikia.nocookie.net/clashofclans/images/0/07/Starry_Ore.png/revision/latest/scale-to-width-down/100?cb=20231214002537'
};

export const HERO_META: Record<HeroType, { name: string, image: string, colorFrom: string, colorTo: string, accent: string, imgStyle?: React.CSSProperties, imgClass?: string }> = {
    BK: {
        name: "Barbarian King",
        image: "https://static.wikia.nocookie.net/clashofclans/images/e/ec/Barbarian_King_info.png/revision/latest/scale-to-width-down/400",
        colorFrom: "from-orange-600/20",
        colorTo: "to-red-900/20",
        accent: "text-orange-500",
        imgClass: "h-[135%] -bottom-2 -left-4"
    },
    AQ: {
        name: "Archer Queen",
        image: "https://static.wikia.nocookie.net/clashofclans/images/4/4b/Archer_Queen_info.png/revision/latest/scale-to-width-down/400?cb=20170927231550",
        colorFrom: "from-fuchsia-600/20",
        colorTo: "to-purple-900/20",
        accent: "text-fuchsia-500",
        imgClass: "h-[145%] -bottom-4 -left-2"
    },
    GW: {
        name: "Grand Warden",
        image: "https://static.wikia.nocookie.net/clashofclans/images/a/a1/Grand_Warden_info.png/revision/latest/scale-to-width-down/250?cb=20190621204515",
        colorFrom: "from-purple-500/20",
        colorTo: "to-indigo-900/20",
        accent: "text-purple-400",
        imgClass: "h-[130%] bottom-0 -left-2"
    },
    RC: {
        name: "Royal Champion",
        image: "https://static.wikia.nocookie.net/clashofclans/images/b/b0/Royal_Champion_info.png/revision/latest/scale-to-width-down/250?cb=20260204172250",
        colorFrom: "from-teal-600/20",
        colorTo: "to-emerald-900/20",
        accent: "text-emerald-500",
        imgClass: "h-[135%] -bottom-2 -left-4"
    },
    MP: {
        name: "Minion Prince",
        image: "https://static.wikia.nocookie.net/clashofclans/images/8/81/Minion_Prince_info.png/revision/latest/scale-to-width-down/400?cb=20250928024718",
        colorFrom: "from-blue-600/20",
        colorTo: "to-slate-900/20",
        accent: "text-blue-500",
        imgClass: "h-[130%] bottom-0 -left-4"
    },
    DD: {
        name: "Dragon Duke",
        image: "https://static.wikia.nocookie.net/clashofclans/images/2/2e/Dragon_Duke_info.png/revision/latest/scale-to-width-down/250?cb=20260224173534",
        colorFrom: "from-red-600/20",
        colorTo: "to-orange-900/20",
        accent: "text-red-500",
        imgClass: "h-[130%] bottom-0 -left-2"
    }
};

export const RAID_SHOP = {
    starry: { cost: 350, amount: 5 },
    glowy: { cost: 300, amount: 50 },
    shiny: { cost: 350, amount: 500 }
};

// Daily production per level (1-10)
export const GEM_MINE_PRODUCTION = [0, 2.4, 2.8, 3.3, 3.8, 4.3, 4.8, 5.2, 5.7, 6.2, 6.7];

export const TRADER_SHOP = {
    glowy: { gems: 275, amount: 600 },
    starry: { gems: 275, amount: 10 }
};

export const WAR_LOOT_BY_TH: Record<number, { shiny: number, glowy: number, starry: number }> = {
    8: { shiny: 380, glowy: 15, starry: 0 },
    9: { shiny: 410, glowy: 18, starry: 0 },
    10: { shiny: 460, glowy: 21, starry: 3 },
    11: { shiny: 560, glowy: 24, starry: 3 },
    12: { shiny: 610, glowy: 27, starry: 4 },
    13: { shiny: 710, glowy: 30, starry: 4 },
    14: { shiny: 810, glowy: 33, starry: 4 },
    15: { shiny: 960, glowy: 36, starry: 5 },
    16: { shiny: 1110, glowy: 39, starry: 6 },
    17: { shiny: 1110, glowy: 39, starry: 6 },
    18: { shiny: 1110, glowy: 39, starry: 6 } // Assuming same as 16-17 for now
};

export const EQUIP_DB: Record<HeroType, EquipmentItem[]> = {
    BK: [
        { id: 'bk_gauntlet', name: 'Giant Gauntlet', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/2/27/Giant_Gauntlet.png/revision/latest/scale-to-width-down/100?cb=20231218115547' },
        { id: 'bk_ball', name: 'Spiky Ball', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/d/d9/Spiky_Ball.png/revision/latest/scale-to-width-down/100?cb=20251009104454' },
        { id: 'bk_snake', name: 'Snake Bracelet', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/5/56/Snake_Bracelet.png/revision/latest/scale-to-width-down/100?cb=20250205152701' },
        { id: 'bk_stick', name: 'Stick Horse', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/c/c7/Stick_Horse.png/revision/latest/scale-to-width-down/200?cb=20260206172629' },
        { id: 'bk_rage', name: 'Rage Vial', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/8/89/Rage_Vial.png/revision/latest/scale-to-width-down/100?cb=20240101094305' },
        { id: 'bk_boots', name: 'Earthquake Boots', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/4/4b/Earthquake_Boots.png/revision/latest/scale-to-width-down/100?cb=20231211153708', unlockTh: 8 },
        { id: 'bk_barb', name: 'Barbarian Puppet', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/9/96/Barbarian_Puppet.png/revision/latest/scale-to-width-down/100?cb=20231211153430' },
        { id: 'bk_vamp', name: 'Vampstache', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/6/6d/Vampstache.png/revision/latest/scale-to-width-down/100?cb=20231211153806', unlockTh: 10 }
    ],
    AQ: [
        { id: 'aq_mirror', name: 'Magic Mirror', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/1/1d/Magic_Mirror.png/revision/latest/scale-to-width-down/100?cb=20240807161619' },
        { id: 'aq_frozen', name: 'Frozen Arrow', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/2/23/Frozen_Arrow.png/revision/latest/scale-to-width-down/100?cb=20240207193559' },
        { id: 'aq_action', name: 'Action Figure', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/7/70/Action_Figure.png/revision/latest/scale-to-width-down/100?cb=20250407081928' },
        { id: 'aq_monolith', name: 'Monolith Arrow', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/3/3b/Monolith_Arrow.png/revision/latest/scale-to-width-down/200?cb=20260602070115' },
        { id: 'aq_invis', name: 'Invis Vial', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/0/08/Invisibility_Vial.png/revision/latest/scale-to-width-down/100?cb=20240101094313' },
        { id: 'aq_giant', name: 'Giant Arrow', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/b/bb/Giant_Arrow.png/revision/latest/scale-to-width-down/100?cb=20231211154034', unlockTh: 9 },
        { id: 'aq_archer', name: 'Archer Puppet', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/d/d4/Archer_Puppet.png/revision/latest/scale-to-width-down/100?cb=20231211153910' },
        { id: 'aq_healer', name: 'Healer Puppet', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/d/dd/Healer_Puppet.png/revision/latest/scale-to-width-down/100?cb=20231211154103', unlockTh: 12 }
    ],
    MP: [
        { id: 'mp_meteor', name: 'Meteor Staff', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/0/07/Meteor_Staff.png/revision/latest/scale-to-width-down/100?cb=20251011040708' },
        { id: 'mp_crown', name: 'Dark Crown', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/7/7e/Dark_Crown.png/revision/latest/scale-to-width-down/100?cb=20250603163058' },
        { id: 'mp_darkorb', name: 'Dark Orb', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/c/cc/Dark_Orb.png/revision/latest/scale-to-width-down/100?cb=20241124131856' },
        { id: 'mp_hench', name: 'Henchman Puppet', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/d/dc/Henchmen_Puppet.png/revision/latest/scale-to-width-down/100?cb=20241124131856' },
        { id: 'mp_iron', name: 'Noble Iron', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/4/4b/Noble_Iron.png/revision/latest/scale-to-width-down/100?cb=20250323130911' },
        { id: 'mp_pants', name: 'Metal Pants', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/0/04/Metal_Pants.png/revision/latest/scale-to-width-down/100?cb=20250209131331' }
    ],
    GW: [
        { id: 'gw_lavaloon', name: 'Lavaloon Puppet', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/b/b6/Lavaloon_Puppet.png/revision/latest/scale-to-width-down/100?cb=20241011154209' },
        { id: 'gw_fireball', name: 'Fireball', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/4/49/Fireball_Equipment.png/revision/latest/scale-to-width-down/100?cb=20240311163556' },
        { id: 'gw_torch', name: 'Heroic Torch', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/8/8a/Heroic_Torch.png/revision/latest/scale-to-width-down/100?cb=20250805185630' },
        { id: 'gw_tome', name: 'Eternal Tome', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/2/29/Eternal_Tome.png/revision/latest/scale-to-width-down/100?cb=20231211154154' },
        { id: 'gw_life', name: 'Life Gem', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/f/fe/Life_Gem.png/revision/latest/scale-to-width-down/100?cb=20231212145821' },
        { id: 'gw_heal', name: 'Healing Tome', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/5/5e/Healing_Tome.png/revision/latest/scale-to-width-down/100?cb=20231211154223', unlockTh: 13 },
        { id: 'gw_rage', name: 'Rage Gem', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/8/8f/Rage_Gem.png/revision/latest/scale-to-width-down/100?cb=20231211154245', unlockTh: 11 }
    ],
    RC: [
        { id: 'rc_frost', name: 'Frost Flake', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/4/4c/Frost_Flake.png/revision/latest/scale-to-width-down/100?cb=20251210120859' },
        { id: 'rc_rocket', name: 'Rocket Spear', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/0/00/Rocket_Spear.png/revision/latest/scale-to-width-down/100?cb=20240608113451' },
        { id: 'rc_electro', name: 'Electro Boots', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/e/ed/Electro_Boots.png/revision/latest/scale-to-width-down/100?cb=20241211095239' },
        { id: 'rc_shield', name: 'Seeking Shield', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/3/36/Seeking_Shield.png/revision/latest/scale-to-width-down/100?cb=20231211154339' },
        { id: 'rc_haste', name: 'Haste Vial', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/b/b1/Haste_Vial.png/revision/latest/scale-to-width-down/100?cb=20240225143859', unlockTh: 15 },
        { id: 'rc_royal', name: 'Royal Gem', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/b/b9/Royal_Gem.png/revision/latest/scale-to-width-down/100?cb=20231211154310' },
        { id: 'rc_hog', name: 'Hog Puppet', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/3/32/Hog_Rider_Puppet.png/revision/latest/scale-to-width-down/100?cb=20240225143837', unlockTh: 14 }
    ],
    DD: [
        { id: 'dd_rocket', name: 'Rocket Backpack', type: 'epic', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/8/8f/Rocket_Backpack.png/revision/latest/scale-to-width-down/200?cb=20260409103804', unlockTh: 15 },
        { id: 'dd_fireheart', name: 'Fire Heart', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/8/86/Fire_Heart.png/revision/latest/scale-to-width-down/200?cb=20260227182842', unlockTh: 15 },
        { id: 'dd_flameblower', name: 'Flame Blower', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/8/89/Flame_Blower.png/revision/latest/scale-to-width-down/200?cb=20260227182817', unlockTh: 15 },
        { id: 'dd_stunblaster', name: 'Stun Blaster', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/3/34/Stun_Blaster.png/revision/latest/scale-to-width-down/200?cb=20260227182901', unlockTh: 15 },
        { id: 'dd_electro', name: 'Electro Fangs', type: 'common', imageUrl: 'https://static.wikia.nocookie.net/clashofclans/images/2/2c/Electro_Fangs.png/revision/latest/scale-to-width-down/200?cb=20260426121243', unlockTh: 15 }
    ]
};

export const MAX_LEVELS = {
    common: 18,
    epic: 27
};

export const TH_CAPS: Record<number, { common: number, epic: number }> = {
    8: { common: 9, epic: 12 },
    9: { common: 9, epic: 12 },
    10: { common: 12, epic: 15 },
    11: { common: 12, epic: 15 },
    12: { common: 15, epic: 18 },
    13: { common: 15, epic: 18 },
    14: { common: 18, epic: 21 },
    15: { common: 18, epic: 24 },
    16: { common: 18, epic: 27 },
    17: { common: 18, epic: 27 },
    18: { common: 18, epic: 27 }
};

// Index 0 represents upgrade from Level 1 to Level 2
export const COMMON_UPGRADE_COSTS: Cost[] = [
    { shiny: 120, glowy: 0, starry: 0 },    // 1->2
    { shiny: 240, glowy: 20, starry: 0 },   // 2->3
    { shiny: 400, glowy: 0, starry: 0 },    // 3->4
    { shiny: 600, glowy: 0, starry: 0 },    // 4->5
    { shiny: 840, glowy: 100, starry: 0 },  // 5->6
    { shiny: 1120, glowy: 0, starry: 0 },   // 6->7
    { shiny: 1440, glowy: 0, starry: 0 },   // 7->8
    { shiny: 1800, glowy: 200, starry: 0 }, // 8->9
    { shiny: 1900, glowy: 0, starry: 0 },   // 9->10
    { shiny: 2000, glowy: 0, starry: 0 },   // 10->11
    { shiny: 2100, glowy: 400, starry: 0 }, // 11->12
    { shiny: 2200, glowy: 0, starry: 0 },   // 12->13
    { shiny: 2300, glowy: 0, starry: 0 },   // 13->14
    { shiny: 2400, glowy: 600, starry: 0 }, // 14->15
    { shiny: 2500, glowy: 0, starry: 0 },   // 15->16
    { shiny: 2600, glowy: 0, starry: 0 },   // 16->17
    { shiny: 2700, glowy: 600, starry: 0 }  // 17->18
];

// Index 0 represents upgrade from Level 1 to Level 2
// UPDATED BASED ON USER INPUT
export const EPIC_UPGRADE_COSTS: Cost[] = [
    { shiny: 120, glowy: 0, starry: 0 },     // 1->2
    { shiny: 240, glowy: 20, starry: 0 },     // 2->3
    { shiny: 400, glowy: 0, starry: 0 },    // 3->4
    { shiny: 600, glowy: 0, starry: 0 },     // 4->5
    { shiny: 840, glowy: 100, starry: 0 },     // 5->6
    { shiny: 1120, glowy: 0, starry: 0 },   // 6->7
    { shiny: 1440, glowy: 0, starry: 0 },    // 7->8
    { shiny: 1800, glowy: 200, starry: 10 }, // 8->9
    { shiny: 1900, glowy: 0, starry: 0 },    // 9->10
    { shiny: 2000, glowy: 0, starry: 0 },    // 10->11
    { shiny: 2100, glowy: 400, starry: 20 },  // 11->12
    { shiny: 2200, glowy: 0, starry: 0 },    // 12->13
    { shiny: 2300, glowy: 0, starry: 0 },    // 13->14
    { shiny: 2400, glowy: 600, starry: 30 }, // 14->15
    { shiny: 2500, glowy: 0, starry: 0 },    // 15->16
    { shiny: 2600, glowy: 0, starry: 0 },    // 16->17
    { shiny: 2700, glowy: 600, starry: 50 },  // 17->18
    { shiny: 2800, glowy: 0, starry: 0 },    // 18->19
    { shiny: 2900, glowy: 0, starry: 0 },    // 19->20
    { shiny: 3000, glowy: 600, starry: 100 },// 20->21
    { shiny: 3100, glowy: 0, starry: 0 },    // 21->22
    { shiny: 3200, glowy: 0, starry: 0 },    // 22->23
    { shiny: 3300, glowy: 600, starry: 120 },  // 23->24
    { shiny: 3400, glowy: 0, starry: 0 },    // 24->25
    { shiny: 3500, glowy: 0, starry: 0 },    // 25->26
    { shiny: 3600, glowy: 1000, starry: 150 }// 26->27
];

export const TOTAL_COSTS = {
    common: { shiny: 27260, glowy: 1920, starry: 0 },
    epic: { shiny: 56060, glowy: 3720, starry: 480 }
};

export const NEW_EQUIP_COST: Cost = { shiny: 28000, glowy: 1860, starry: 240 };

export const LEAGUES: League[] = [
    { id: 1, name: "Skeleton 1", shiny: 300, glowy: 20, starry: 0 },
    { id: 2, name: "Skeleton 2", shiny: 325, glowy: 21, starry: 0 },
    { id: 3, name: "Skeleton 3", shiny: 350, glowy: 22, starry: 0 },
    { id: 4, name: "Barbarian 4", shiny: 375, glowy: 23, starry: 0 },
    { id: 5, name: "Barbarian 5", shiny: 400, glowy: 24, starry: 0 },
    { id: 6, name: "Barbarian 6", shiny: 425, glowy: 25, starry: 0 },
    { id: 7, name: "Archer 7", shiny: 450, glowy: 26, starry: 0 },
    { id: 8, name: "Archer 8", shiny: 475, glowy: 27, starry: 1 },
    { id: 9, name: "Archer 9", shiny: 500, glowy: 29, starry: 1 },
    { id: 10, name: "Wizard 10", shiny: 525, glowy: 31, starry: 1 },
    { id: 11, name: "Wizard 11", shiny: 550, glowy: 33, starry: 1 },
    { id: 12, name: "Wizard 12", shiny: 575, glowy: 35, starry: 1 },
    { id: 13, name: "Valkyrie 13", shiny: 600, glowy: 37, starry: 1 },
    { id: 14, name: "Valkyrie 14", shiny: 625, glowy: 39, starry: 1 },
    { id: 15, name: "Valkyrie 15", shiny: 650, glowy: 41, starry: 1 },
    { id: 16, name: "Witch 16", shiny: 675, glowy: 43, starry: 1 },
    { id: 17, name: "Witch 17", shiny: 725, glowy: 45, starry: 1 },
    { id: 18, name: "Witch 18", shiny: 775, glowy: 47, starry: 1 },
    { id: 19, name: "Golem 19", shiny: 825, glowy: 49, starry: 1 },
    { id: 20, name: "Golem 20", shiny: 875, glowy: 51, starry: 1 },
    { id: 21, name: "Golem 21", shiny: 900, glowy: 53, starry: 1 },
    { id: 22, name: "P.E.K.K.A 22", shiny: 925, glowy: 54, starry: 1 },
    { id: 23, name: "P.E.K.K.A 23", shiny: 950, glowy: 55, starry: 1 },
    { id: 24, name: "P.E.K.K.A 24", shiny: 963, glowy: 56, starry: 1 },
    { id: 25, name: "Titan 25", shiny: 1000, glowy: 57, starry: 1 },
    { id: 26, name: "Titan 26", shiny: 1010, glowy: 58, starry: 1 },
    { id: 27, name: "Titan 27", shiny: 1020, glowy: 59, starry: 1 },
    { id: 28, name: "Dragon 28", shiny: 1030, glowy: 60, starry: 1 },
    { id: 29, name: "Dragon 29", shiny: 1040, glowy: 61, starry: 1 },
    { id: 30, name: "Dragon 30", shiny: 1050, glowy: 62, starry: 1 },
    { id: 31, name: "Electro 31", shiny: 1060, glowy: 62, starry: 2 },
    { id: 32, name: "Electro 32", shiny: 1070, glowy: 63, starry: 2 },
    { id: 33, name: "Electro 33", shiny: 1080, glowy: 64, starry: 2 },
    { id: 34, name: "Legend", shiny: 1100, glowy: 65, starry: 2 }
];

export const MIN_LEAGUE_MAP: Record<number, number> = { 
    7: 1,  // Skeleton 1
    8: 2,  // Skeleton 2
    9: 3,  // Skeleton 3
    10: 4, // Barbarian 4
    11: 6, // Barbarian 6
    12: 8, // Archer 8
    13: 11, // Wizard 11
    14: 14, // Valkyrie 14
    15: 17, // Witch 17
    16: 21, // Golem 21
    17: 25, // Titan 25
    18: 25  // Titan 25
};

export const I18N: Record<string, Translations> = {
    it: { 
        app_title: "Clash Equipment Calc", section_strategy: "Strategia", label_medals: "Raid Medals", label_war: "Clan War", opt_war_nonstop: "Non-Stop (Sempre)", opt_war_casual: "Casual (2/settimana)", opt_war_rare: "Rara (Solo weekend)", opt_war_never: "Mai", label_winrate: "Win Rate Guerra", opt_win_0: "0% (Sconfitta)", opt_win_50: "50% (Media)", opt_win_100: "100% (Vittoria)", label_cwl: "Partecipa alla CWL", desc_cwl: "Lega Guerra tra Clan", label_pass: "Pass Evento (Gold)", desc_pass: "Costo mensile (~8€)", label_shop: "Negozio Evento (Medaglie Bonus)", opt_shop_skin: "Skin / Decorazioni (No Ores)", opt_shop_ores: "Compra Ores (Max Profit)", section_equip: "Gestione Equipaggiamento", btn_edit_equip: "Modifica Livelli", title_equip_manager: "Equipaggiamento", btn_copy: "Copia Configurazione", btn_import: "Incolla Configurazione", section_resources: "Risorse Mancanti", badge_auto: "Auto-Calcolato", result_title: "Tempo Stimato", result_subtitle: "Basato sulle tue entrate giornaliere", label_new_releases: "Nuove Uscite", table_title: "Dettaglio Mensile", col_source: "Fonte", row_bonus: "Bonus Stella", row_event: "Evento (Pass + F2P)", row_cost: "Costi Nuove Uscite", row_net: "NETTO MENSILE", msg_deficit: "DEFICIT", msg_ok: "Tempo stimato per recuperare l'arretrato.", months: "Mesi", month: "Mese", days: "Giorni", day: "Giorno", less_than_month: "< 1 Mese", never: "MAI", calculating: "Calcolo...",
        title_priority: "Priorità Upgrade", desc_priority: "Metti in ordine gli equipaggiamenti che vuoi maxare prima.", time_to_max: "Tempo per Maxare", empty_priority: "Nessun equipaggiamento prioritario selezionato.",
        res_view_all: "Tutto", res_view_unlocked: "Sbloccati", res_view_priority: "Priorità",
        raid_title: "Strategia Raid Medals", raid_desc: "Pianifica come spendere le tue medaglie ogni settimana.", raid_income: "Medals Earned", raid_budget: "Weekly Budget", raid_remaining: "Residuo", raid_over_budget: "Budget Superato!",
        gems_title: "Gem Economy & Trader", gems_income: "Entrate Mensili", gems_expense: "Spese Trader", gems_balance: "Bilancio",
        label_gem_mine: "Gem Mine Level", label_obstacles: "Clear Obstacles", label_clan_games: "Clan Games (max)",
        label_trader: "Weekly Trader Buys", trader_glowy: "Glowy (600x)", trader_starry: "Starry (10x)",
        raid_convert: "Convert excess to Gems", raid_convert_desc: "Buy/Sell Potions"
    },
    en: { 
        app_title: "Clash Equipment Calc", section_strategy: "Strategy", label_medals: "Raid Medals", label_war: "Clan War", opt_war_nonstop: "Non-Stop (Always)", opt_war_casual: "Casual (2/week)", opt_war_rare: "Rare (Weekends only)", opt_war_never: "Never", label_winrate: "War Win Rate", opt_win_0: "0% (Loss)", opt_win_50: "50% (Average)", opt_win_100: "100% (Win)", label_cwl: "CWL Participation", desc_cwl: "Clan War League", label_pass: "Event Pass (Gold)", desc_pass: "Monthly Cost (~$8)", label_shop: "Event Shop (Bonus Medals)", opt_shop_skin: "Cosmetics (No Ores)", opt_shop_ores: "Buy Ores (Max Profit)", section_equip: "Equipment Manager", btn_edit_equip: "Edit Levels", title_equip_manager: "Equipment Manager", btn_copy: "Copy Config", btn_import: "Paste Config", section_resources: "Missing Resources", badge_auto: "Auto-Calculated", result_title: "Estimated Time", result_subtitle: "Based on daily income", label_new_releases: "New Releases", table_title: "Monthly Breakdown", col_source: "Source", row_bonus: "Star Bonus", row_event: "Event (Pass + F2P)", row_cost: "New Release Cost", row_net: "MONTHLY NET", msg_deficit: "DEFICIT", msg_ok: "Estimated time to catch up.", months: "Months", month: "Month", days: "Days", day: "Day", less_than_month: "< 1 Month", never: "NEVER", calculating: "Calculating...",
        title_priority: "Upgrade Priority", desc_priority: "Order the equipment you want to max first.", time_to_max: "Time to Max", empty_priority: "No priority equipment selected.",
        res_view_all: "All", res_view_unlocked: "Unlocked", res_view_priority: "Priority",
        raid_title: "Raid Medals Strategy", raid_desc: "Plan how to spend your medals each week.", raid_income: "Medals Earned", raid_budget: "Weekly Budget", raid_remaining: "Remaining", raid_over_budget: "Over Budget!",
        gems_title: "Gem Economy & Trader", gems_income: "Monthly Income", gems_expense: "Trader Expenses", gems_balance: "Balance",
        label_gem_mine: "Gem Mine Level", label_obstacles: "Clear Obstacles", label_clan_games: "Clan Games (max)",
        label_trader: "Weekly Trader Buys", trader_glowy: "Glowy (600x)", trader_starry: "Starry (10x)",
        raid_convert: "Convert excess to Gems", raid_convert_desc: "Buy/Sell Potions"
    }
};