// app.js
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const modal = document.getElementById('modal');

// Fonction de recherche dans l'index local
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    resultsDiv.innerHTML = '';

    if(query.length < 2) return;

    const filtered = shulchanIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.keywords.some(k => k.includes(query))
    );

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <small>Source: ${item.section} - Siman ${item.siman}</small>
        `;
        div.onclick = () => openSefaria(item);
        resultsDiv.appendChild(div);
    });
});

// Appel à l'API Sefaria
async function openSefaria(item) {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalText').innerHTML = "Chargement du texte sacré...";

    try {
        const response = await fetch(`https://www.sefaria.org/api/texts/${item.sefariaRef}?context=0`);
        const data = await response.json();
        
        // Sefaria renvoie le texte dans data.he (tableau de chaînes)
        let fullText = "";
        if (data.he) {
            fullText = data.he.map(line => `<div class="hebrew-text">${line}</div>`).join('');
        } else {
            fullText = "Texte non trouvé sur l'API.";
        }
        
        document.getElementById('modalText').innerHTML = fullText;
    } catch (error) {
        document.getElementById('modalText').innerHTML = "Erreur de connexion à Sefaria.";
    }
}

function closeModal() {
    modal.style.display = 'none';
}
