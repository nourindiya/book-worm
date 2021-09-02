// Global Scopes
const inputFeild = document.getElementById('input-feild');
const searchBtn = document.getElementById('button-addon2');
const bookSection = document.getElementById('book-container');
const error = document.getElementById('error');
const result = document.getElementById('search-result');

searchBtn.addEventListener('click', function () {
    const input = inputFeild.value;

    // Empty input Error
    if (input === "") {
        error.innerText = "Input Can't be Empty"
        return;
    };

    // Clear Book section & result
    bookSection.innerHTML = "";
    result.innerHTML = "";

    // fetching
    const url = `https://openlibrary.org/search.json?q=${input}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
        .finally(() => inputFeild.value === '');
});


function displayBooks(books) {
    // Error of Invalidity
    if (books.numFound === 0) {
        error.innerText = "Use Valid Input"
    }
    else {
        error.innerText = "";
    };

    //  Search Result
    result.innerHTML = `Search Result :${books.numFound}`


    const book = books.docs;
    // Get Single Book
    book.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
         <div class="card h-100">
                 <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="...">
                 <div class="card-body">
                     <h5 class="card-title">${element.title}</h5>
                     <h6 class="author-name">Author:${element.author_name[0]}</h6>
                     <h6 class="first-publised">First Published:${element.first_publish_year}</h6>
                 </div>
             </div>
         `;
        bookSection.appendChild(div);
    });
}

