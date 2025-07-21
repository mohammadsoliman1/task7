let products = JSON.parse(localStorage.getItem("products") || "[]")
const form = document.getElementById("productForm")
const table = document.getElementById("productTable")


const read = () => {
    table.innerHTML = ""
    products.forEach((p, i) => {
        table.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>$${p.price}</td>
                <td>${p.category}</td>
                <td>
                    <button onclick="editProduct(${i})">Edit</button>
                    <button onclick="deleteProduct(${i})">Delete</button>
                </td>
            </tr> `
    })
}

const saveToLocal = () => {
    localStorage.setItem("products", JSON.stringify(products))
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let newProduct = {
        name: form.name.value,
        price: parseFloat(form.price.value),
        category: form.category.value,
        image: form.image.value
    }
    products.push(newProduct)
    saveToLocal()
    read()
    form.reset()
})





const deleteProduct = (index) => {
    products.splice(index, 1)
    saveToLocal()
    read()
}



const editProduct = (index) => {
    let p = products[index]
    form.name.value = p.name
    form.price.value = p.price
    form.category.value = p.category
    form.image.value = p.image
    deleteProduct(index)
}

read()