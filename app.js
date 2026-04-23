// data.js
const rawThemes = [
    { 
        start: 1, end: 7, 
        title: "Conduite du matin", 
        keywords: ["reveil", "matin", "habillage", "mains", "toilette", "habiller"] 
    },
    { 
        start: 89, end: 127, 
        title: "La Prière (Amida)", 
        keywords: ["priere", "tefila", "amida", "kavana", "ftila", "parler", "interruption", "repondre", "amen"] 
    },
    { 
        start: 157, end: 201, 
        title: "Lois du Repas", 
        keywords: ["manger", "pain", "netilat", "table", "sel", "parler", "boire"] 
    },
    { 
        start: 242, end: 344, 
        title: "Lois de Chabbat", 
        keywords: ["shabbat", "cuisson", "feu", "electricite", "voiture", "parler", "mouktse", "preparer"] 
    }
    // Ajoute d'autres thèmes ici...
];

const shulchanIndex = [];
for (let i = 1; i <= 697; i++) {
    const theme = rawThemes.find(t => i >= t.start && i <= t.end);
    shulchanIndex.push({
        siman: i,
        title: theme ? `${theme.title} (Siman ${i})` : `Choulhan Aroukh - Siman ${i}`,
        ref: `Shulchan_Arukh,_Orach_Chayim.${i}`,
        // On fusionne les mots-clés du thème avec le numéro du Siman
        keywords: theme ? [...theme.keywords, i.toString()] : [i.toString()],
        summary: theme ? `Section : ${theme.title}` : "Détails de la loi"
    });
}
