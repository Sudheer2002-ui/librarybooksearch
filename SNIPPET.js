let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function append(search) {
    let due = document.createElement("div");
    spinnerEl.classList.add("d-none");
    searchResults.appendChild(due);
    let {
        author,
        imageLink,
    } = search;
    let img = document.createElement("img");
    img.src = imageLink;
    img.classList.add("w-100", "p-2");
    due.appendChild(img);
    let para = document.createElement("p");
    para.classList.add("pa", "text-center");
    para.textContent = author;
    due.appendChild(para);
    due.classList.add("col-6", "mb-2");
}
let h1El = document.createElement('h1');

function vetuku(search_results) {
    if (search_results.length === 0) {
        h1El.textContent = "No Results Found";
        searchResults.appendChild(h1El);
    } else {
        for (let search of search_results) {
            append(search);
        }
    }
}
searchInput.addEventListener("keydown", function(event) {
    if (event.target.value !== "" && event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/book-store" + "?title=" + event.target.value;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                vetuku(search_results);
            });
    }
});