// query the NY Times book API
function queryAPI(value) {

  // http object
  const http = new XMLHttpRequest();

  // NY Times API key
  const key = 'api-key=TXSKC02xZokeRfJYlL4sfCVTDIGe0o8c';

  // base URL for accessing data
  const baseURL = 'https://api.nytimes.com/svc/books/v3/lists.json?';

  // user input
  let userGenre = '';

  // set userGenre to query format based on user input
  if (value === 'fiction') {
    userGenre = 'combined-print-and-e-book-fiction';
  } else {
    userGenre = 'combined-print-and-e-book-nonfiction';
  }

  // query URL based that includes user input
  let url = baseURL + key + '&list=' + userGenre;

  http.open('GET', url);
  http.send();

  http.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      // clear any existing content
      $("#ny-times-list-area").empty();

      // Parse response from string to JSON
      let response = JSON.parse(http.responseText);

      // log response.results for now to help traverse the obect
      console.log(response);

      // Iterate over response and list book titles
      for (let i = 0; i < response.num_results; i++) {
        let bookISBN = "";
        let bookTitle = response.results[i].book_details[0].title;
        let bookAuthor = response.results[i].book_details[0].author;
        let bookDescription = response.results[i].book_details[0].description;

        // checks if there is value other than "None" for isbn10, if not it used isbn13
        if (response.results[i].isbns[0].isbn10 !== "None") {
          bookISBN = response.results[i].isbns[0].isbn10;
        } else {
          bookISBN = response.results[i].isbns[0].isbn13;
        }

        let bookImageURL = "http://covers.openlibrary.org/b/isbn/" + bookISBN + "-M.jpg";

        console.log(bookImageURL);

        let testDiv = `<div class="media mt-5 pb-3 border-bottom">
                         <img src="` + bookImageURL + `" class="mr-3 book-cover ">
                         <div class="media-body">
                           <h5 class="mt-0">` + bookTitle + `</h5>
                           <p>by ` + bookAuthor + `</p>
                           <p>` + bookDescription + `</p>
                           <button type="button" class="btn btn-dark btn-sm">Add to Reading List</button>
                           <button type="button" class="btn btn-outline-dark btn-sm">Learn More</button>
                         </div>
                       </div>`

        $("#ny-times-list-area").append(testDiv);

      }
    }
  }
};
