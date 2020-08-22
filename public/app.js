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


// delete confirmation
const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", function(event){
    const confirmation = confirm("Deseja Deletar?")
    if(!confirmation) {
        event.preventDefault()
    }
})

