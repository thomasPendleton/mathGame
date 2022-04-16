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
const questionEl = document.createElement('div')

const operators = ['+', '-']

let totalScore = 0
let maxNumber = 20
let wrong = 0
let answer
let countDownTime = 10

function randomOperator() {
  const operator = Math.floor(Math.random() * operators.length)
  return operators[operator]
}
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
  if (guess.value === '') {
    console.log('no value')
    return
  }
  if (e.key === 'Enter') {
    if (+guess.value === answer) {
      totalScore++
      score.innerHTML = `${totalScore}`
      scoreContainer.classList.add('correct')
    } else {
      wrong++
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
}

function playNow() {
  clearScores()
  timerEl.removeEventListener('click', playNow)
  timeLeft = countDownTime
  const interval = setInterval(() => {
    timeLeft--
    timerEl.innerHTML = ` Time left : <span id="time">${timeLeft}</span>`
    console.log(countDownTime)
    if (timeLeft < 1) {
      clearInterval(interval)
      questionEl.innerHTML = `
      <h2 style='color: white; font-size: 2rem'>Times Up!</h2>
      <br>
      <h3 style='color: white; font-size: 1.7rem'>You got ${totalScore} out of ${totalScore + wrong} right! `
      timerEl.innerHTML = `Play Again`
      timerEl.addEventListener('click', playNow)
    }
  }, 1000)

  play()
}

timerEl.addEventListener('click', playNow)
