const http = new XMLHttpRequest();

// NY Times API key
const key = 'api-key=TXSKC02xZokeRfJYlL4sfCVTDIGe0o8c';
// Base URL for accessing data
const baseURL = 'https://api.nytimes.com/svc/books/v3/lists';

let url = baseURL + '.json?' + key + '&list=paperback-nonfiction';

http.open('GET', url);
http.send();

http.onreadystatechange = function() {

  if (this.readyState == 4 && this.status == 200) {

    // Parse response from string to JSON
    let response = JSON.parse(http.responseText);

    // log response.results for now to help traverse the obect
    console.log(response);

    // Iterate over response and list book titles
    for (let i = 0; i < response.num_results; i++) {
      let title = response.results[i].book_details[0].title;
      let description = response.results[i].book_details[0].description;
      console.log(title + '\n' + description + '\n' + '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    }
  }
}
