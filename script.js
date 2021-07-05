const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes =[];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;

}

//Show NEw Quote
function newQuote(){ 
    showLoadingSpinner();
    //Choose random quote
    let quote = apiQuotes[Math.trunc(Math.random()*apiQuotes.length)+1];

    //Check if author exists
    !quote.author ?  authorText.textContent = 'Unknown': authorText.textContent = quote.author;

    //Check if text is too long
    !quote.text.length > 80 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}
//Get Quotes From API
async function getQuotes(){ 
    const apiUrl = 'https://type.fit/api/quotes';
    try { 
        showLoadingSpinner();
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
       
    }catch(error){
        //Catch Error Here
    }
}
//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On Load
getQuotes();
