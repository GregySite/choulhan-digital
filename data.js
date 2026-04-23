// data.js
const rawThemes = [
    { start: 1, end: 7, title: "Conduite du matin", keywords: ["reveil", "matin", "habillage", "mains"] },
    { start: 8, end: 24, title: "Lois du Tsitsit", keywords: ["tsitsit", "talit", "franges"] },
    { start: 25, end: 46, title: "Lois des Téfilines", keywords: ["tefillin", "phylacteres", "bras", "tete"] },
    { start: 47, end: 57, title: "Bénédictions du matin", keywords: ["berakhot", "torah", "chaharit"] },
    { start: 58, end: 88, title: "Lecture du Chéma", keywords: ["shema", "kriat shema", "soir", "matin"] },
    { start: 89, end: 127, title: "La Prière (Amida)", keywords: ["priere", "tefila", "amida", "kavana", "ftila"] }, // "ftila" ajouté ici en keyword pour aider
    { start: 157, end: 165, title: "Lavage des mains", keywords: ["netilat yadaim", "mains", "repas", "eau"] },
    { start: 242, end: 416, title: "Lois de Chabbat", keywords: ["shabbat", "cuisson", "melakha", "repos", "bougies"] },
    { start: 670, end: 685, title: "Lois de Hanoucca", keywords: ["hanoucca", "bougies", "miracle", "huile"] },
    { start: 686, end: 697, title: "Lois de Pourim", keywords: ["pourim", "meguila", "cadeaux", "repas"] }
];

// On génère l'index complet (697 entrées)
const shulchanIndex = [];
for (let i = 1; i <= 697; i++) {
    // On cherche si le Siman appartient à un thème connu
    const theme = rawThemes.find(t => i >= t.start && i <= t.end);
    shulchanIndex.push({
        siman: i,
        title: theme ? `${theme.title} (Siman ${i})` : `Choulhan Aroukh - Siman ${i}`,
        ref: `Shulchan_Arukh,_Orach_Chayim.${i}`,
        keywords: theme ? [...theme.keywords, i.toString()] : [i.toString()],
        summary: theme ? `Section : ${theme.title}` : "Détails de la loi"
    });
}
