const accessKey = "BP-49lJ-1tz7FOJ8y3d7lbenAIgigNvbofodzXWDaOA";
 
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".main-img");
const showMore = document.getElementById("showMore-button");

let inputData = "";
let page = 1;

async function searchImages(){

    inputData = inputEl.value;
    // Dynamic url making
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResults.innerHtml = "";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("img-box");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++;
    if(page>1){
        showMore.style.display = "block";
    }
}
formEl.addEventListener("submit",(event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
});
showMore.addEventListener("click",() =>{
    searchImages();
});
