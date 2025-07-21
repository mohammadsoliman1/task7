let products = JSON.parse(localStorage.getItem("products") || "[]")
const slider = document.getElementById("productSlider")
const search = document.getElementById("search")
const categoryFilter = document.getElementById("categoryFilter")
const priceSort = document.getElementById("priceSort")
const leftBtn = document.querySelector(".left")
const rightBtn = document.querySelector(".right")

let currentIndex = 0
let productsFiltered = products

const displayProducts = (data) => {
    slider.innerHTML = ""
    let visible = data.slice(currentIndex, currentIndex + 3)
    visible.forEach(p => {
        slider.innerHTML += `
            <div class="slide">
                <img src="${p.image}" width="100">
                <h3>${p.name}</h3>
                <p>$${p.price}</p>
            </div> `
    })
}


leftBtn.addEventListener("click", () => {
    if (currentIndex + 3 < productsFiltered.length) {
        currentIndex += 3
    } else {
        currentIndex = 0 
    }
    displayProducts(productsFiltered)
})


rightBtn.addEventListener("click", () => {
    if (currentIndex - 3 >= 0) {
        currentIndex -= 3
    } else {
        currentIndex = Math.floor((productsFiltered.length - 1) / 3) * 3
    }
    displayProducts(productsFiltered)
})


const filterAndShow = () => {
    currentIndex = 0
    let filtered = products
    let searchValue = search.value.toLowerCase()
    let categoryValue = categoryFilter.value
    let sortValue = priceSort.value



    if (searchValue) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchValue))
    }
    if (categoryValue !== "all") {
        filtered = filtered.filter(p => p.category === categoryValue)
    }
    if (sortValue === "asc") {
        filtered.sort((a, b) => a.price - b.price)
    } else if (sortValue === "desc") {
        filtered.sort((a, b) => b.price - a.price)
    }



    productsFiltered = filtered
    displayProducts(filtered)
}

search.addEventListener("input", filterAndShow)
categoryFilter.addEventListener("change", filterAndShow)
priceSort.addEventListener("change", filterAndShow)

filterAndShow()
