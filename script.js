const searchInput = document.getElementById("search-input");
const resultArtists = document.getElementById("results-artist");
const resultPlayList = document.getElementById("result-playlists");

function requestApi(searchTerm) {
    const url = "http://localhost:5000/artists";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("🔍 Dados recebidos:", data); // Log dos dados recebidos

            if (!Array.isArray(data)) {
                console.error("❌ Erro: API não retornou uma lista.");
                return;
            }

            const searchLower = searchTerm.toLowerCase();
            const filteredResults = data.filter(artist => 
                artist.name.toLowerCase().includes(searchLower)
            );

            console.log("🎯 Resultados filtrados:", filteredResults);
            displayResults(filteredResults);
        })
        .catch(error => console.error("❌ Erro na requisição:", error));
}

function displayResults(results) {
    resultArtists.innerHTML = "";

    if (results.length === 0) {
        resultArtists.innerHTML = "<li>Nenhum artista encontrado</li>";
        return;
    }

    results.forEach(artist => {
        const li = document.createElement("li");
        li.textContent = artist.name;
        resultArtists.appendChild(li);
    });

    resultPlayList.classList.add("hidden");
    resultArtists.classList.remove("hidden");
}

// Evento de digitação no input
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim();
    requestApi(searchTerm);
});
