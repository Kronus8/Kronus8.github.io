const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.querySelector("button");

function randomQuote () {
    newQuoteButton.innerText = "Loading Quote..."
    // https://github.com/lukePeavey/quotable#get-random-quote
    fetch('http://api.quotable.io/random').then(response => response.json()).then(result => {
        quoteElement.innerHTML = result.content;
        authorElement.innerHTML = result.author;
        newQuoteButton.innerText = 'New Quote';
    });
}

newQuoteButton.addEventListener("click", randomQuote);