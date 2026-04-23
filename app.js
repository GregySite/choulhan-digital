const fuseOptions = {
    keys: ['title', 'keywords', 'summary'],
    threshold: 0.4,
    useExtendedSearch: true,
    findAllMatches: true,
    distance: 100
};

const fuse = new Fuse(shulchanIndex, fuseOptions);
const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('clearSearch');
const resultsDiv = document.getElementById('results');
const modal = document.getElementById('modal');

function displayResults(list) {
    resultsDiv.innerHTML = '';
    clearBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';

    if (list.length === 0) {
        resultsDiv.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">Aucun résultat trouvé...</p>';
        return;
    }

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<h3>${item.title}</h3><p>${item.summary}</p>`;
        div.onclick = () => openSefaria(item);
        resultsDiv.appendChild(div);
    });
}

// Initialisation au chargement
displayResults(shulchanIndex);

// Écouteur de recherche
searchInput.addEventListener('input', () => {
    let query = searchInput.value.trim();
    
    if (!query) {
        displayResults(shulchanIndex);
        return;
    }

    // Recherche multi-mots (AND logic)
    const formattedQuery = query.split(' ').map(word => `'${word}`).join(' ');
    const result = fuse.search(formattedQuery).map(r => r.item);
    displayResults(result);
});

// Bouton de nettoyage
clearBtn.onclick = () => {
    searchInput.value = '';
    displayResults(shulchanIndex);
    searchInput.focus();
};

// Gestion de Sefaria
async function openSefaria(item) {
    modal.style.display = 'block';
    document.getElementById('modalTitle').innerText = item.title;
    const textBox = document.getElementById('modalText');
    textBox.innerHTML = '<p style="text-align:center;">Chargement du texte sacré...</p>';

    try {
        const response = await fetch(`https://www.sefaria.org/api/texts/${item.ref}?context=0`);
        const data = await response.json();
        
        let fullText = "";
        if (data.he) {
            const lines = Array.isArray(data.he) ? data.he.flat() : [data.he];
            fullText = lines.map(line => `<div class="hebrew-text">${line}</div>`).join('');
        } else {
            fullText = "<p>Texte hébreu non disponible pour ce Siman.</p>";
        }
        textBox.innerHTML = fullText;
    } catch (e) {
        textBox.innerHTML = "<p>Erreur lors de la connexion à Sefaria. Vérifiez votre connexion internet.</p>";
    }
}

function closeModal() {
    modal.style.display = 'none';
}

// Fermer la modale en cliquant à l'extérieur
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
