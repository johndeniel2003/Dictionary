const URL_PATH = 'https://api.api-ninjas.com/v1/dictionary';
const API_KEY = 'f3/s6hyU50f/aU4VhxY7CQ==oHh637ejE5eHMPJy';
const searchBtn = document.querySelector('#search');
const inputField = document.querySelector('#floatingInput');
const loader = document.querySelector('.loader-container');
const suggestions = document.querySelectorAll('#suggestion');



const getDictionary = () => {
    const word = inputField.value.trim();

    if (word === '') {
        alert('Please enter a word to search.');
        return;
    }

    const fullURL = `${URL_PATH}?word=${word}`;

    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': API_KEY,
            'Content-Type': 'application/json'
        }
    };

    loader.style.display = 'flex';
    fetch(fullURL, options)
        .then(response => response.json())
        .then(data => handleData(data))
        .catch(error => console.error('Error fetching data:', error))
        .finally(()=>{
            loader.style.display = 'none';
        });
};

suggestions.forEach(itm =>{
    itm.addEventListener('click',(e)=>{
        inputField.value = e.target.textContent;
        getDictionary();    
    })
})


searchBtn.addEventListener('click', getDictionary);

const handleData = (data) => {
    const link = document.querySelector('#link');
    const searchedWord = data.word;
    const wikiLink = `https://en.wikipedia.org/wiki/${searchedWord}`;
    const wordDescription = document.querySelector('#word-description');

    const resultLabel = document.querySelectorAll('#resultLabel');
    resultLabel.forEach(label => { label.textContent = searchedWord.toUpperCase() });

    link.setAttribute('href', wikiLink);
    wordDescription.textContent = (data.definition === '') ?
        `"We couldn't find a definition for the term you searched "${searchedWord}". However, language is constantly evolving, and new words are added regularly. Please check back later, or try searching for another word. Thank you for using our dictionary app!"` :
        data.definition;
};
