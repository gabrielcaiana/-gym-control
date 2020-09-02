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
    selectedPages = 6,
    pages = [],
    oldPage

for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
    
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPages + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPages - 2

    if(firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {

        if(oldPage && currentPage - oldPage >2 ) {
            pages.push("...")
        }

        if(oldPage && currentPage - oldPage == 2) {
            pages.push(currentPage - 1)
        }

        pages.push(currentPage)
        oldPage = currentPage
    }
    console.log(oldPage)
}

console.log(pages)






