const rawThemes = [
    { 
        start: 1, end: 7, 
        title: "Conduite du matin", 
        keywords: ["reveil", "matin", "habillage", "mains", "toilette", "habiller", "netilat"] 
    },
    { 
        start: 8, end: 24, 
        title: "Lois du Tsitsit", 
        keywords: ["tsitsit", "talit", "franges", "vetement"] 
    },
    { 
        start: 25, end: 46, 
        title: "Lois des Téfilines", 
        keywords: ["tefillin", "phylacteres", "bras", "tete", "parchemin"] 
    },
    { 
        start: 89, end: 127, 
        title: "La Prière (Amida)", 
        keywords: ["priere", "tefila", "amida", "kavana", "ftila", "parler", "interruption", "repondre", "amen", "chuchoter"] 
    },
    { 
        start: 157, end: 201, 
        title: "Lois du Repas", 
        keywords: ["manger", "pain", "netilat", "table", "sel", "parler", "boire", "birkat", "mazone"] 
    },
    { 
        start: 242, end: 416, 
        title: "Lois de Chabbat", 
        keywords: ["shabbat", "cuisson", "feu", "electricite", "voiture", "parler", "mouktse", "preparer", "bougies", "kiddouch"] 
    },
    { 
        start: 429, end: 494, 
        title: "Lois de Pessah", 
        keywords: ["pessah", "matza", "hametz", "sefer", "haggada", "vin", "sedar"] 
    },
    { 
        start: 670, end: 685, 
        title: "Lois de Hanoucca", 
        keywords: ["hanoucca", "bougies", "miracle", "huile", "toupie", "menora"] 
    },
    { 
        start: 686, end: 697, 
        title: "Lois de Pourim", 
        keywords: ["pourim", "meguila", "cadeaux", "repas", "ester", "deguisement", "michloakh"] 
    }
];

const shulchanIndex = [];
for (let i = 1; i <= 697; i++) {
    const theme = rawThemes.find(t => i >= t.start && i <= t.end);
    shulchanIndex.push({
        siman: i,
        title: theme ? `${theme.title} (Siman ${i})` : `Choulhan Aroukh - Siman ${i}`,
        ref: `Shulchan_Arukh,_Orach_Chayim.${i}`,
        keywords: theme ? [...theme.keywords, i.toString()] : [i.toString()],
        summary: theme ? `Section : ${theme.title}` : "Détails de la loi"
    });
}
