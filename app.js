// app.js

const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const modal = document.getElementById('modal');

// --- 1. FONCTION D'AFFICHAGE ---
function displayResults(dataToDisplay) {
    resultsDiv.innerHTML = ''; // On vide les résultats actuels

    if (dataToDisplay.length === 0) {
        resultsDiv.innerHTML = '<p style="text-align:center; color:#999;">Aucun résultat trouvé...</p>';
        return;
    }

    dataToDisplay.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <span class="source-tag">${item.title_he || ''}</span>
            <h3>${item.title}</h3>
            <p>${item.summary || ''}</p>
            <div style="margin-top:10px;">
                ${item.keywords.map(k => `<span style="font-size:0.7rem; background:#eee; padding:2px 6px; margin-right:5px; border-radius:10px;">#${k}</span>`).join('')}
            </div>
        `;
        div.onclick = () => openSefaria(item);
        resultsDiv.appendChild(div);
    });
}

// --- 2. INITIALISATION (Au chargement du site) ---
// On affiche tout l'index dès le départ
displayResults(shulchanIndex);

// --- 3. LOGIQUE DE FILTRE ---
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    // Si le champ est vide, on réaffiche tout
    if (query === "") {
        displayResults(shulchanIndex);
        return;
    }

    // Sinon, on filtre sur plusieurs champs
    const filtered = shulchanIndex.filter(item => {
        return item.title.toLowerCase().includes(query) || 
               (item.summary && item.summary.toLowerCase().includes(query)) ||
               item.keywords.some(k => k.toLowerCase().includes(query)) ||
               (item.title_he && item.title_he.includes(query));
    });

    displayResults(filtered);
});

// --- 4. APPEL API SEFARIA ---
async function openSefaria(item) {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalText').innerHTML = "Chargement du texte depuis Sefaria...";

    try {
        // Nettoyage de la ref pour l'API (remplacer les espaces par des underscores)
        const cleanRef = item.ref.replace(/ /g, "_");
        const response = await fetch(`https://www.sefaria.org/api/texts/${cleanRef}?context=0`);
        const data = await response.json();
        
        let fullText = "";
        if (data.he) {
            // Sefaria peut renvoyer un tableau simple ou un tableau de tableaux
            const lines = Array.isArray(data.he) ? data.he.flat() : [data.he];
            fullText = lines.map(line => `<div class="hebrew-text">${line}</div>`).join('');
        } else {
            fullText = "Désolé, le texte hébreu n'est pas disponible pour cette section.";
        }
        
        document.getElementById('modalText').innerHTML = fullText;
    } catch (error) {
        document.getElementById('modalText').innerHTML = "Erreur de connexion. Vérifiez votre réseau.";
    }
}

function closeModal() {
    modal.style.display = 'none';
}
