let resetBtn = document.querySelector('.reset-btn')
let modal = document.querySelector('.modal')
let scoreCounter = document.querySelector('.score-counter')
let selectLevel = document.querySelector('.select-level')
let word = document.querySelector('.word')
let formInput = document.querySelector('.form-input')
let timeCounter = document.querySelector('.time-counter')

let randomWord
let gameScore = 0
let gameTime = 15
let api = 'https://random-words-api.vercel.app/word'

if(localStorage.getItem('level')) {
    selectLevel.value = localStorage.getItem('level')
} else {
    selectLevel.value = 'medum'
}

function bar() {
    fetch(api).then((word)=> {
        return word.json()
    }).then(getWord)
    
    function getWord(e) {
        randomWord = e[0].word.toLowerCase()
        word.textContent = randomWord
    }
}

bar()

formInput.addEventListener('input', (e)=> {
    if(randomWord == formInput.value) {
        bar()
        formInput.value = ''
        gameScore++
        scoreCounter.textContent = gameScore
        if(selectLevel.value == 'easy') {
            gameTime += 8
        } else if(selectLevel.value == 'medium') {
            gameTime += 5
        } else {
            gameTime +=3
        }
    }
})
formInput.addEventListener("input", ()=> {
    if(randomWord === formInput.value) {
        formInput.value = ''
        gameScore++
        scoreCounter.textContent = gameScore
        if(selectLevel.value == 'easy') {
            gameTime +=8
        } else if(selectLevel.value == 'medium') {
            gameTime +=5
        } else {
            gameTime +=3
        }
        bar()
    }
})

setInterval(()=> {
    if(gameTime) {
        gameTime--
        timeCounter.textContent = gameTime
    } else {
        modal.classList.remove('hidden')
    }
}, 1000)

resetBtn.addEventListener("click", ()=> {
    bar()
    gameTime = 15
    modal.classList.add('hidden')
})

selectLevel.addEventListener('change', ()=> {
   localStorage.setItem('level', selectLevel.value)
})