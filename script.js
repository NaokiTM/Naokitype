const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random' 
const quoteDisplayElement = document.getElementById('quotedisplay')
const quoteInputElement = document.getElementById('quoteinput')
const timerElement = document.getElementById('timer')
let timer_started = false 

quoteInputElement.addEventListener('input', () => {  
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('') 
  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index] 
    
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct') 
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })
  if (correct == true) {
    renderNewQuote() 
    startTimer()
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() { 
  const quote = await getRandomQuote() 
  quoteDisplayElement.innerHTML = '' 
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character 
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null  
  
document.addEventListener("keydown", function(event) {
    if(!timer_started){ 
      startTimer() 
      timer_started = true 
    } 
})
};

let startTime

async function startTimer() {
  timerElement.innerText = 0
  startTime = new Date() 
  const timer_adder = setInterval(() => { 
    timer.innerText = getTimerTime()
  }, 1000) 

  // new Promise((resolve,reject)=>{ 
  //   setTimeout(()=>{
  //   timerElement.innertext = 0 
  //   clearInterval(timer_adder)
  //   resolve()
  // },20 * 1000)
  // }).then(()=>{
  //      console.log("ended!")  
  //      renderNewQuote() 
  //      //startTimer()
  // })
}

function getTimerTime() { 
  return Math.floor((new Date() - startTime) / 1000)
}
  
renderNewQuote() 


