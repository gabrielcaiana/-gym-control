//active menu
const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for(item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    } 
}

//Botão voltar
back = document.querySelector(".back")

back.addEventListener("click", function(){
    window.history.back()
})

//Paginação
// [1,...,13, 14, 15, 16, 17, ..., 20]
let totalPages = 20,
    selectedPages = 15
    pages = []

for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
    pages.push(currentPage)
}

console.log(pages)






