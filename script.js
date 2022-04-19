const score = document.getElementById('score')
const scoreContainer = document.getElementById('score-container')
const time = document.getElementById('time')
const firstNumber = document.getElementById('first-number')
const secondNumber = document.getElementById('second-number')
const operation = document.getElementById('operation')
const gameEl = document.getElementById('game')
const question = document.getElementById('question')
const wrongEl = document.getElementById('wrong')
const timerEl = document.getElementById('timer')
const closeBtn = document.getElementById('close')
const modalEl = document.getElementById('modal')
const settingsBtn = document.getElementById('settings')
const playerId = document.getElementById('player')

const questionEl = document.createElement('div')

const operators = ['+', '-']

let totalScore = 0
let maxNumber = 20
let wrong = 0
let answer
let countDownTime = 10
let playerName = 'Ari'

// Generates a random whole number, input of variable x
function randomMath(x) {
  return Math.floor(Math.random() * x)
}

//Generates a random operator for math question + -
function randomOperator() {
  const operator = Math.floor(Math.random() * operators.length)
  return operators[operator]
}

//Generates random numbers up to the max number
function randomNumber() {
  const num = Math.floor(Math.random() * maxNumber) + 1
  if (num === maxNumber + 1) {
    return maxNumber
  }
  return num
}

function play() {
  document.removeEventListener('keyup', enterEventHandler)
  score.innerHTML = `${totalScore}`
  wrongEl.innerHTML = `${wrong}`
  const first = randomNumber()
  const second = randomNumber()
  const operator = randomOperator()

  questionEl.classList.add('container')

  if (operator === '-') {
    if (first > second) {
      answer = first - second
      questionEl.innerHTML = `
        <div class="question">
            <h2 id="first-number">${first}</h2>
            <h2 id="second-number"><span id="operation">${operator}</span>${second}</h2>
        </div>
        <div class="line"></div>
        <input type="number" class="answer" id="guess" />
    `
      gameEl.appendChild(questionEl)
    } else {
      answer = second - first
      questionEl.innerHTML = `
      <div class="question">
          <h2 id="first-number">${second}</h2>
          <h2 id="second-number"><span id="operation">${operator}</span>${first}</h2>
      </div>
      <div class="line"></div>
      <input type="number" class="answer" id="guess" />
  `
      gameEl.appendChild(questionEl)
    }
  } else if (operator === '+') {
    answer = first + second
    questionEl.innerHTML = `
      <div class="question">
          <h2 id="first-number">${second}</h2>
          <h2 id="second-number"><span id="operation">${operator}</span>${first}</h2>
      </div>
      <div class="line"></div>
      <input type="number" class="answer" id="guess" />
  `
    gameEl.appendChild(questionEl)
  }
  guess.focus()
  document.addEventListener('keyup', enterEventHandler)
}

function enterEventHandler(e) {
  const guess = document.getElementById('guess')
  if (guess.value === '' || guess.value === null) {
    console.log('no value')
    return
  }
  if (e.key === 'Enter') {
    if (+guess.value === answer) {
      totalScore++
      addHearts(2)
      score.innerHTML = `${totalScore}`
      scoreContainer.classList.add('correct')
    } else {
      wrong++
      addX()
      wrongEl.innerHTML = `${wrong}`
      gameEl.classList.add('wrong')
    }
    setTimeout(() => {
      scoreContainer.classList.remove('correct')
      gameEl.classList.remove('wrong')
    }, 1000)
    gameEl.innerHTML = ``

    play()
  }
}

function clearScores() {
  wrong = 0
  totalScore = 0
  timerEl.removeEventListener('click', playNow)
}

function playNow() {
  clearScores()
  timeLeft = countDownTime
  const interval = setInterval(() => {
    timeLeft--
    timerEl.innerHTML = ` Time left : <span id="time">${timeLeft}</span>`
    if (timeLeft < 1) {
      clearInterval(interval)
      questionEl.innerHTML = `
      <h2 style='color: white; font-size: 2rem'>Times Up!</h2>
      <br>
      <h3 style='color: white; font-size: 1.7rem; text-align: center'>You got ${totalScore} correct!
      <br> and ${wrong} wrong. `
      timerEl.innerHTML = `Play Again`
      timerEl.addEventListener('click', playNow)
      document.removeEventListener('keyup', enterEventHandler)
      addLocalStorage()
    }
  }, 1000)

  play()
}

timerEl.addEventListener('click', playNow)

// creates the heart element and randomly places the heart on the body
function addHeart() {
  const heart = document.createElement('i')
  heart.classList.add('fas')
  heart.classList.add('fa-heart')
  let rect = document.body.getBoundingClientRect()
  //   console.log(rect.top, rect.right, rect.bottom, rect.left)
  heart.style.top = `${randomMath(rect.bottom - 400)}px`
  heart.style.left = `${randomMath(rect.right)}px`
  document.body.appendChild(heart)
  setTimeout(() => {
    heart.remove()
  }, 1500)
}

//adds mulitiple hearts at slightly different timing intervals
function addHearts(num) {
  let hearts = 0
  while (hearts < num) {
    hearts++
    addHeart()
    setTimeout(() => {
      addHeart()
    }, 100)
    setTimeout(() => {
      addHeart()
    }, 300)
    setTimeout(() => {
      addHeart()
    }, 200)
  }
}

// creates and appends to middle of body a red X - used when incorrect answer given
function addX() {
  const x = document.createElement('i')
  x.classList.add('fa-solid')
  x.classList.add('fa-x')
  let rect = document.body.getBoundingClientRect()
  //   console.log(rect.top, rect.right, rect.bottom, rect.left)
  x.style.top = `${rect.top + 200}px`
  x.style.left = `${rect.right / 2}px`
  document.body.appendChild(x)
  setTimeout(() => {
    x.remove()
  }, 1500)
}

//change Player input id

playerId.addEventListener('input', (e) => {
  playerName = e.target.value
})

//Adds a high score to local storage.
function addLocalStorage() {
  console.log(playerName)
  if (!localStorage.getItem(playerName)) {
    localStorage.setItem(playerName, [totalScore, countDownTime])
  }
  if (totalScore > localStorage.getItem(playerName)) {
    localStorage.setItem(playerName, [totalScore, countDownTime])
  } 
}

closeBtn.addEventListener('click', () => {
  modalEl.style.display = 'none'
})

settingsBtn.addEventListener('click', () => {
  modalEl.style.display = 'block'
})
