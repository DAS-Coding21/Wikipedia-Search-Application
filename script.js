let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function displaySearchResult(result) {
    let {
        link,
        title,
        description
    } = result;

    let displaySearchContainer = document.createElement("div");
    displaySearchContainer.classList.add("result-item");

    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    displaySearchContainer.appendChild(titleEl);

    let titleElBreak = document.createElement("br");
    displaySearchContainer.appendChild(titleElBreak);

    let linkEl = document.createElement('a');
    linkEl.classList.add("result-url");
    linkEl.href = link;
    linkEl.target = "_blank";
    linkEl.textContent = link;
    linkEl.classList.add("result-link");
    displaySearchContainer.appendChild(linkEl);

    let linkElBreak = document.createElement("br");
    displaySearchContainer.appendChild(linkElBreak);

    let linkDescription = document.createElement("p");
    linkDescription.textContent = description;
    linkDescription.classList.add("link-description");
    displaySearchContainer.appendChild(linkDescription);

    searchResultsEl.appendChild(displaySearchContainer);
}

function getEeachSerach(search_results) {
    spinnerEl.classList.add("d-none");
    for (let result of search_results) {
        displaySearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInputElValue = searchInputEl.value;

        let URL = "https://apis.ccbp.in/wiki-search?search=" + searchInputElValue;

        let OPTIONS = {
            method: "GET"
        };

        fetch(URL, OPTIONS)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                getEeachSerach(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);