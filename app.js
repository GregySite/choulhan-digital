// Configuration de Fuse.js pour la recherche floue
const fuseOptions = {
    keys: ['title', 'keywords', 'summary', 'siman'],
    threshold: 0.3, // Plus c'est bas, plus c'est strict. 0.3 permet "ftila" -> "tefila"
    distance: 100
};

const fuse = new Fuse(shulchanIndex, fuseOptions);
const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('clearSearch');
const resultsDiv = document.getElementById('results');

function displayResults(list) {
    resultsDiv.innerHTML = '';
    clearBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<h3>${item.title}</h3><p>${item.summary}</p>`;
        div.onclick = () => openSefaria(item);
        resultsDiv.appendChild(div);
    });
}

// Initialisation
displayResults(shulchanIndex);

// Recherche
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    if (!query) {
        displayResults(shulchanIndex);
        return;
    }
    const result = fuse.search(query).map(r => r.item);
    displayResults(result);
});

clearBtn.onclick = () => {
    searchInput.value = '';
    displayResults(shulchanIndex);
};

async function openSefaria(item) {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalText').innerHTML = "Chargement...";

    try {
        const response = await fetch(`https://www.sefaria.org/api/texts/${item.ref}?context=0`);
        const data = await response.json();
        const content = Array.isArray(data.he) ? data.he.flat() : [data.he];
        document.getElementById('modalText').innerHTML = content.map(line => `<div class="hebrew-text">${line}</div>`).join('');
    } catch (e) {
        document.getElementById('modalText').innerHTML = "Erreur de chargement.";
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
