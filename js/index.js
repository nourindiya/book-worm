// Error text
const errorText = document.getElementById('error-text');
errorText.style.display = 'none';

// No match
const noMatch = document.getElementById('no-result');
noMatch.style.display = 'none';

const loadBooks = () => {
    const inputFeild = document.getElementById('input-feild');
    const input = inputFeild.value;
    inputFeild.value = "";
    // console.log(input);

    // Error Text
    const errorText = document.getElementById('error-text');
    errorText.style.display = 'none';
    // No match
    const noMatch = document.getElementById('no-result');
    noMatch.style.display = 'none';

    const url = `https://openlibrary.org/search.json?q=${input}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
        .catch(error => displayError(error))
};

const displayError = () => {
    const errorText = document.getElementById('error-text');
    errorText.style.display = 'block';
};

const displayBooks = (booksContainer) => {
    const commonContainer = document.getElementById('common-container');


    // Search Result
    const searchResult = document.createElement('div');
    searchResult.innerHTML = `
    <h4>Total Result: ${booksContainer.numFound}</h4>
    `;

    // Display did not found Text
    if (booksContainer.numFound === 0) {
        const noMatch = document.getElementById('no-result');
        noMatch.style.display = 'block';
    };


    // find Books
    const books = booksContainer.docs;
    console.log(books);

    // Creat Book Card
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('row')

    // loop on books
    books.forEach(book => {
        const bookBox = document.createElement('div');
        bookBox.classList.add('text-center', 'col-md-3', 'g-4');
        bookBox.innerHTML = `
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid">
        <h5 class="text-center mt-3">${book.tittle.slice(0, 25)}</h5>
        <h6>Author Name:${book.author_name}</h6>
        <h6>First Published:${book.first_publish_year}</h6>

        `;
        bookContainer.appendChild(bookBox);

    });
    commonContainer.textContent = '';
    commonContainer.appendChild(searchResult);
    commonContainer.appendChild(bookContainer);


};