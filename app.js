const http = new XMLHttpRequest();

// NY Times API key
const key = 'api-key=TXSKC02xZokeRfJYlL4sfCVTDIGe0o8c';
// Base URL for accessing data
const baseURL = 'https://api.nytimes.com/svc/books/v3/lists';

let url = baseURL + '.json?' + key + '&list=paperback-nonfiction';

http.open('GET', url);
http.send();

setTimeout(function() {
  console.log(JSON.parse(http.responseText));
}, 3000);
