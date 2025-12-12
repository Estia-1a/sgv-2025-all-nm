/* FICHIER: script.js */

// Clé de sauvegarde unique
const KEY_CANDIDATURES = 'estia_housing_favoris';

// 1. FONCTION : AJOUTER AUX FAVORIS (Candidater)
function ajouterAuxFavoris(titre, prix, lieu, image) {
    // Récupérer la liste actuelle
    let liste = JSON.parse(localStorage.getItem(KEY_CANDIDATURES)) || [];

    // Vérifier si déjà présent
    let existe = liste.some(item => item.titre === titre);
    
    if (existe) {
        alert("⚠️ Vous avez déjà candidaté à ce logement !");
    } else {
        // Ajouter
        liste.push({ titre: titre, prix: prix, lieu: lieu, image: image });
        localStorage.setItem(KEY_CANDIDATURES, JSON.stringify(liste));
        
        // Confirmation simple et efficace
        alert("✅ Candidature ajoutée dans l'onglet 'Favoris' !");
    }
}
// 2. FONCTION : AFFICHER LES FAVORIS (Sur la page favoris.html)
function afficherFavoris() {
    const container = document.getElementById('listeFavoris');
    const messageVide = document.getElementById('messageVide');

    // Si on n'est pas sur la page favoris, on arrête
    if (!container) return;

    // Récupérer les données
    let liste = JSON.parse(localStorage.getItem(KEY_CANDIDATURES)) || [];

    container.innerHTML = ""; // Vider

    if (liste.length === 0) {
        messageVide.style.display = 'block';
    } else {
        messageVide.style.display = 'none';

        // Générer le HTML pour chaque favori
        liste.forEach((item, index) => {
            let card = `
                <div class="card">
                    <img src="${item.image}" alt="${item.titre}">
                    <div class="card-content">
                        <h3>${item.titre}</h3>
                        <span class="location">📍 ${item.lieu}</span>
                        <p class="price">${item.prix}</p>
                        <div style="background:#e8f5e9; color:#155724; padding:5px; margin:10px 0; border-radius:5px; text-align:center; font-weight:bold;">
                            ✔ Dossier Transmis
                        </div>
                        <button class="delete-btn" onclick="supprimerFavori(${index})">Retirer de la liste</button>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }
}
// 3. FONCTION : SUPPRIMER UN FAVORI
function supprimerFavori(index) {
    if(confirm("Supprimer cette candidature ?")) {
        let liste = JSON.parse(localStorage.getItem(KEY_CANDIDATURES)) || [];
        liste.splice(index, 1); // Retirer l'élément
        localStorage.setItem(KEY_CANDIDATURES, JSON.stringify(liste));
        afficherFavoris(); // Recharger la zone
    }
}
