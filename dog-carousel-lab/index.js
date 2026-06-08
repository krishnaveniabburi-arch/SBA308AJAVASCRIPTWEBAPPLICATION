import * as Carousel from "./Carousel.js";
import { API_KEY } from "./keys.js";


// import axios from "axios";


// import axios from "axios";

// The breed selection input element.
const breedselect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key in the keys.js file.


// 1. Create an async function "initialLoad" that does the following:

async function initialLoad() {

  //  Retrieve a list of breeds from the cat API using fetch().

  const response = await fetch(" https://api.thedogapi.com/v1/breeds", { headers: { 'x-api-key': API_KEY } });
  const breeds = await response.json();
  console.log(breeds);

  // Create new <options> for each of these breeds, and append them to breedSelect.

  breeds.forEach((breed) => {
    const option = document.createElement("option");
    // Each option should have a value attribute equal to the id of the breed.

    option.value = breed.id;

    // Each option should display text equal to the name of the breed.

    option.text = breed.name;

    //  This function should execute immediately.
    breedselect.appendChild(option);

  });
}
initialLoad()

breedSelect.addEventListener("change", async (e) => {
      getBreed(e.target.value);
});
  

async function getBreed(breedId){
  
  try{

    Carousel.clear();
    Carousel.start();
  //const breedId = e.target.value;
  const response = await fetch(`https://api.thedogapi.com/v1/facts?limit=1' \\
  --header 'x-api-key: YOUR-API-KEY'breed_ids=${breedId}&limit=10`,
  {
    headers: {
      "x-api-key": API_KEY,
    },
  });

const pics = await response.json();
console.log(pics);
carouselInner.innerHTML = "";
pics.forEach((img, index) => {
  const item = document.createElement("div");
  item.classList.add("carousel-item");
  if (index === 0) {
    item.classList.add("active");

  }
  item.innerHTML = `<img src="${img.url}" width="500" height="600" alt="Cat"/>`;
  carouselInner.appendChild(item);
});

//display cat pics
  const breedPic = pics[0]?.breeds[0];
if(breedPic)
  {
      infoDump.innerHTML=`<h1>${breedPic.name}</h1>
                          <p>${breedPic.description}</p>
                          <p>${breedPic.origin}</p>
                          <p>${breedPic.temperament}</p>`;


}
  }

catch(error){
  console.error("Unable to Display:",error);
}

