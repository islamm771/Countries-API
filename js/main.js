let drop_down = document.querySelector(".drop-down");
let Items = document.querySelectorAll(".drop p");
import countries from "../json/data.json" assert { type: "json" };

let btn_switch = document.querySelector(".switch");
btn_switch.onclick = function(){
  this.classList.toggle("dark")
  if (this.querySelector("span").textContent == "Dark Mode") {
    this.querySelector("span").textContent = "Light Mode";
  }else{
    this.querySelector("span").textContent = "Dark Mode";
  }
  document.querySelector("body").classList.toggle("dark")
}

console.log(countries);
function displayCountries(Countries) {
  document.querySelectorAll(".row .country").forEach((div) => {
      div.remove();

  });
Countries.forEach((obj) => {
    const markup = `<div class="country col-md-4 col-lg-3 all ${obj.region}">
                            <div>
                              <img class="img-fluid" src=${obj.flags.png} />
                              <div class="country-info">
                                  <h5>${obj.name}</h5>
                                  <p><b>Population:</b> ${obj.population}</p>
                                  <p><b>Region:</b> ${obj.region}</p>
                                  <p><b>Capital:</b> ${obj.capital}</p>
                              </div>
                            </div>
                        </div>`;
    document
    .querySelector(".countries .row").insertAdjacentHTML("beforeend", markup);
    });
}
displayCountries(countries);


let FoundCountires;
function FindCountry(name){
  FoundCountires = []
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
        FoundCountires.push(countries[i]);
      }
    }
    return FoundCountires;
}

function displayCountry(country){
    let Country = country[0]
    let texts = document.querySelectorAll('.country-details .row p');
    document.querySelector(".heading-name").innerText = Country.name;
    document.querySelector(".flag-img").setAttribute("src", Country.flag);
    texts[0].innerText = `Native name: ${Country.nativeName}`;
    texts[1].innerText = `Population:  ${Country.population}`;
    texts[2].innerText = `Region: ${Country.region}`;
    texts[3].innerText = `Sub Region: ${Country.subregion}`;
    texts[4].innerText = `Capital: ${Country.capital ? Country.capital : 'No Capital'}`;
    texts[5].innerText = `Top Level Domain: ${Country.topLevelDomain[0]}`;

    var currencies = ""
    for (let curren in Country.currencies[0]) {
      currencies += Country.currencies[0][curren] + " ";
    }
    texts[6].innerText = `Currencies: ${
      currencies ? currencies : 'No Currencies'
    }`;

    var languages = ""
    for (let lang in Country.languages[0]) {
      languages += Country.languages[0][lang] + " ";
    }
    texts[7].innerText = `Languages: ${languages ? languages : 'No Languages'}`;
}


let scroll;
document.addEventListener("click" , function(e){
    if(e.target.tagName == "H5"){
        let name = e.target.innerText;
        scroll = e.target.offsetTop;
        document.querySelector(".country-details").classList.add('show')
        document.querySelector(".countries").classList.add('d-none')
        document.querySelector(
          ".country-details"
        ).style.cssText = `left:0;top:64px;z-index:10`;
        displayCountry(FindCountry(name));
        window.scrollTo(0,0);
    }
})


let btnBack = document.querySelector(".back");
btnBack.onclick = function(){
    document.querySelector(".country-details").classList.remove("show");
    document.querySelector(".countries").classList.remove("d-none");
    document.querySelector(
      ".country-details"
    ).style.cssText = `top:0;z-index:-1`;
    window.scrollTo({
      left: 0,
      top: scroll - 270,
      behavior: "smooth",
    });
}


drop_down.onclick = function(){
  document.querySelector(".drop").classList.toggle("d-none");
};


Items.forEach((item) =>{
  item.addEventListener("click" , removeActive);
  item.addEventListener("click", mangeCountry);
})

function removeActive() {
  Items.forEach((item) => {
    item.classList.remove("active");
    this.classList.add("active");
  });
}


function mangeCountry(){
  let countries = document.querySelectorAll(".countries .row .country");
  countries.forEach((country) => {
    if (!country.classList.contains(this.dataset.cat)) {
      country.style.display = "none";
    } else {
      country.style.display = "inline";
    }
  });
}


let search = document.querySelector(".search-bar");
let search_btn = document.querySelector(".search");
search_btn.onclick = function(){
  // console.log(FindCountry(search.value));
  displayCountries(FindCountry(search.value));
}
