const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('clearSearch');
const resultsDiv = document.getElementById('results');

// --- FONCTION DE TOLÉRANCE AUX FAUTES (Distance de Levenshtein simple) ---
function isSimilar(str1, str2) {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    if (s1.includes(s2) || s2.includes(s1)) return true;
    
    // Si l'utilisateur tape au moins 4 lettres, on autorise une erreur
    if (s1.length > 3) {
        let mistakes = 0;
        let i = 0, j = 0;
        while (i < s1.length && j < s2.length) {
            if (s1[i] !== s2[j]) mistakes++;
            i++; j++;
        }
        return mistakes <= 1; // Autorise 1 lettre de différence
    }
    return false;
}

function displayResults(dataToDisplay) {
    resultsDiv.innerHTML = '';
    clearBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';

    dataToDisplay.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <span class="source-tag">${item.title_he || ''}</span>
            <h3>${item.title}</h3>
            <p>${item.summary || ''}</p>
        `;
        div.onclick = () => openSefaria(item);
        resultsDiv.appendChild(div);
    });
}

// Gestion de la croix de nettoyage
clearBtn.onclick = () => {
    searchInput.value = '';
    displayResults(shulchanIndex);
    searchInput.focus();
};

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
        displayResults(shulchanIndex);
        return;
    }

    const filtered = shulchanIndex.filter(item => {
        const matchTitle = isSimilar(item.title, query);
        const matchKeywords = item.keywords.some(k => isSimilar(k, query));
        return matchTitle || matchKeywords;
    });

    displayResults(filtered);
});

// Initialisation
displayResults(shulchanIndex);
