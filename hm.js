const wordE1= document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup= document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const words = ['hey', 'bye', 'shwiya', 'mull', 'no', 'dragged', 'tediously', 'translation', 'invent', 'surface', 'prespective', 'python', 'javascript', 'enviormental', 'beyond', 'salut', 'vous', 'ce', 'plat', 'je', 'veux', 'carrot', 'gagosian', 'shoreditch', 'alkaline', 'plato', 'allergic', 'reaction', 'biotechlonogy', 'genetically', 'motified', 'monsanto', 'software', 'development'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters =[];
const wrongLetters =[];

//show hidden word
function displayWord(){
  wordE1.innerHTML = `
  ${selectedWord
  .split('')
  .map(
    letter=>`
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </span>
    `
  )
  .join('')}
  `;
  const innerWord = wordE1.innerText.replace(/\n/g, '');
  if(innerWord=== selectedWord){
    finalMessage.innerText = 'Very Nice! 👍 Great Success!';
    popup.style.display= 'flex';
  }
}

//update wrong letters
function updateWrongLetterE1(){
  //display wrong letter
  wrongLettersE1.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>( ͡° ͟ʖ ͡°) Wrong</p>' : ''};
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  
  //display parts
  figureParts.forEach((part,index) => {
    const errors = wrongLetters.length;
    if(index<errors){
      part.style.display = 'block';
    }
    else{
      part.style.display='none';
    }
});
  
  // check in lost
  if(wrongLetters.length === figureParts.length){
    finalMessage.innerText = 'MURDERER!!!!  ಥ_ಥ';
    popup.style.display = 'flex';
  }
}

// show notification
function showNotification(){
  notification.classList.add('show');
  
  setTimeout(()=>{
    notification.classList.remove('show');
  }, 2000);
}

//keydown letter press
window.addEventListener('keydown', e=>{
  if(e.keyCode >= 65 && e.keyCode <99){
    const letter = e.key;
    if(selectedWord.includes(letter)){
      if(!correctLetters.includes(letter)){
          correctLetters.push(letter);
          displayWord();
      } else{
        showNotification();
      }
    } else{
      if(!wrongLetters.includes(letter)){
          wrongLetters.push(letter);
        updateWrongLetterE1();
      }
    }
  }
});

//restart
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  
  updateWrongLetterE1();
  popup.style.display ='none';
}) ;
displayWord();