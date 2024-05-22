
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}
let productData =[]
function fetchdata() {
    fetch("https://shark-tank-ges7.onrender.com/pitches")
        .then(res => res.json())
        .then((data) => {
            productData = data;
            cardlist(data)
        })
        .catch((err) => console.log(err));
}
fetchdata();
function cardlist(data) {
    let store = data.map((el) => singlecard(el.title, el.price, el.founder, el.category, el.image, el.id));
    mainSection.innerHTML = store.join("");
}

function singlecard(title, price, founder, category, image, id) {
    let card = `
    
    <div class="card" data-id="${id}">
    <a href="description.html?title=${encodeURIComponent(title)}&img=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}">
      <div class="card-img">
        <img src="${image}" alt="">
      </div>
      <div class="card-body">
        <div class="card-title">title : ${title}</div>
        <div class="card-founder">founder : ${founder}</div>
        <div class="card-category">category:${category}</div>
        <div class="card-price">price : $${price}</div>
        <a href="#" data-id="${id}" class="card-link">Edit</a>
        <button data-id="${id}" class="card-button">Delete</button>
      </div>
      </a>
    </div>
`
    return card;
}
// post(add)DATA into server

pitchCreateBtn.addEventListener("click", () => {
    const title = pitchTitleInput.value
    const price = pitchPriceInput.value
    const founder = pitchfounderInput.value
    const category = pitchCategoryInput.value
    const image = pitchImageInput.value

    let product = {
        title,
        price,
        founder,
        category,
        image
    }

    fetch("https://shark-tank-ges7.onrender.com/pitches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)

    }).then((res) => res.JSON())
        .then((data) => {
            console.log(data);
            fetchdata()
            alert("data ADDED....");
        })
        .catch((err) => {
            console.log(err);
            alert("something went wrong");
        });
         pitchTitleInput.value=""
         pitchPriceInput.value=""
         pitchfounderInput.value=""
         pitchCategoryInput.value=""
         pitchImageInput.value=""

})

// delete part

document.addEventListener("click", (e) => {
   if(e.target.classList.contains("card-button")){
    DeletePitches(e.target.dataset.id)
   }
    

});
function DeletePitches(id){
    fetch(`https://shark-tank-ges7.onrender.com/pitches/${id}`, {
        method: "DELETE"

    }).then((res)=>res.json())
    .then((data)=>{
        alert("deletd")
        fetchdata()
    })
    .catch((err)=>console.log(err))
}
// filter  part

filterFood.addEventListener("click",()=>{

    let FilterFoodData = productData.filter((el)=> el.category=== "Food");

    cardlist(FilterFoodData);
    
})

// electroincs

filterElectronics.addEventListener("click",()=>{

    let FilterElectroincsData = productData.filter((el)=>el.category=== "Electronics");

    cardlist(FilterElectroincsData)

 })
//  personalcare
 filterPersonalCare.addEventListener("click",()=>{
    let FilterPersonalCareData = productData.filter((el)=>el.category=== "Personal Care");
    cardlist(FilterPersonalCareData)
 })


//  sortlist low to high

sortAtoZBtn.addEventListener("click",()=>{
    let sortAtoZ = productData.sort((a,b)=>a.price - b.price);
    cardlist(sortAtoZ)
})

// sort high to low
sortZtoABtn.addEventListener("click",()=>{
    let sortZtoA = productData.sort((a,b)=>b.price - a.price);
    cardlist(sortZtoA)
    })
// edit data
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-link")){
        let id=e.target.dataset.id;
        editproduct(id)
    }
})

function editproduct(id){
    fetch(`https://shark-tank-ges7.onrender.com/pitches/${id}`).then((res)=>res.json()).then((data)=>{
        updatePitchIdInput.value = data.id
        updatePitchTitleInput.value = data.title
        updatePitchImageInput.value = data.image
        updatePitchfounderInput.value = data.founder
        updatePitchCategoryInput.value = data.category
        updatePitchPriceInput.value = data.price
        updatePitchBtn.addEventListener("click", ()=>{
            let dataObj = {
                "id": updatePitchIdInput.value,
                "title": updatePitchTitleInput.value,
                "image": updatePitchImageInput.value,
                "founder": updatePitchfounderInput.value,
                "category": updatePitchCategoryInput.value,
                "price": updatePitchPriceInput.value
            }
            fetch(`https://shark-tank-ges7.onrender.com/pitches/${id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataObj)
            })
        })
    }).catch((err)=>console.log(err))
    let editProduct = productData.find((el)=>el.id===id);
}
// uptate only price
