//active menu
const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

//Botão voltar
back = document.querySelector(".back");

back.addEventListener("click", function () {
  window.history.back();
});

//Paginação
function paginate(selectedPages, totalPages) {
  let pages = []
  let oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPages + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPages - 2

    if (firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...")
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1)
      }

      pages.push(currentPage)
      oldPage = currentPage
    }
  }
  return pages
}

const pagination = document.querySelector(".pagination");
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const pages = paginate(page, total)

let elements = ""

for(let page of pages) {
  if(String(page).includes("...")) {
    elements += `<span>${page}</span>`
  }else {
    elements += `<a href="?page=${page}">${page}</a>`
  } 
}

pagination.innerHTML = elements



