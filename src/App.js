import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import COLORS_ARRAY from "./colorsArray.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let quoteDBUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {

  const [quote, setQuote] = useState("You've got nothing to lose but your chains.");
  const [author, setAuthor] = useState("Karl Marx");
  const [quotesArray, setQuotesArray] = useState(0);
  const [color, setBackgroundColor] = useState('#16a085');

  const generateRandomQuote = () => {
    let randomIndex = Math.floor(quotesArray.length * Math.random())
    setQuote(quotesArray[randomIndex].quote)
    setAuthor(quotesArray[randomIndex].author)
    setBackgroundColor(COLORS_ARRAY[randomIndex])
  }
  
  const fetchQuotes = async (url) => {
    const response = await fetch (url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl]);

  return (
    <div className="App">
      <header className="App-header" style={ {backgroundColor: color, color: color }}>
        <div id="quote-box">
          <div id="text">
              <span>"{ quote }"</span>
          </div>
          <p id="author">- { author }</p>
          <div id="functions">
            <a id="tweet-quote" style={ {backgroundColor: color} } href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)} target="_blank">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <button id="new-quote" onClick={() => {generateRandomQuote()} } style={ {backgroundColor: color} }>New Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
