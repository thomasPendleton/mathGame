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
const highScore = document.getElementById('high-score')
const highScoresContainer = document.getElementById('high-scores-container')
const highNumberInput = document.getElementById('high-number')

const questionEl = document.createElement('div')

const operators = ['+', '-']

let totalScore = 0
let wrong = 0
let maxNumber = 15
let countDownTime = 120
let playerName = 'Player 1'
let answer

//change maxNumber function
function changeMaxNumber(e) {
  maxNumber = e.target.value
  if (maxNumber > 9999) {
    maxNumber = 9999
  }
  highNumberInput.value = maxNumber
}
highNumberInput.addEventListener('input', changeMaxNumber)

//change timeGiven function
function changeCountDownTime(e) {
  countDownTime = e.target.value
  if (countDownTime > 500) {
    countDownTime = 500
  }
  time.value = countDownTime
}
time.addEventListener('input', changeCountDownTime)

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
      <input inputmode="numeric" pattern="[0-9]*" type="text" class="answer" id="guess" />
  `
    gameEl.appendChild(questionEl)
  }
  guess.focus()
  document.addEventListener('keydown', enterEventHandler)
  guess.addEventListener('touchstart', enterEventHandler)
  guess.focus()
}

function enterEventHandler(e) {
  const guess = document.getElementById('guess')
  if (guess.value === '' || guess.value === null) {
    return
  }
  // console.log(e.which)
  if (e.key === 'Enter' || e.key === 'Next' || e.which === 0) {
    if (+guess.value === answer) {
      correctSound.play()
      totalScore++
      addHearts(2)
      score.innerHTML = `${totalScore}`
      scoreContainer.classList.add('correct')
    } else {
      wrongSound.play()
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

// clears scores and removes click listener for the timer
function clearScores() {
  wrong = 0
  totalScore = 0
  timerEl.removeEventListener('click', playNow)
}

function playNow() {
  clearScores()
  modalEl.style.transform = 'translateY(-600px)'
  highScoresContainer.classList.remove('show')

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
      <br> With ${wrong} wrong. `
      timerEl.innerHTML = `Play Again`
      timerEl.addEventListener('click', playNow)
      document.removeEventListener('keyup', enterEventHandler)
      addLocalStorage()
      //   toggleHighScores()
      if (totalScore > 5) {
        congratsSound.play()
      }
    }
  }, 1000)

  play()
}

timerEl.addEventListener('click', playNow)

// creates the heart element and randomly places the heart on the body
function addHeart() {
  const heart = document.createElement('i')
  heart.classList.add('fas', 'fa-heart')
  // heart.classList.add('fa-heart')
  let rect = document.body.getBoundingClientRect()
    console.log(rect.top, rect.right, rect.bottom, rect.left)
  heart.style.top = `${randomMath(rect.bottom - 350)}px`
  heart.style.left = `${randomMath(rect.right)}px`
  document.body.appendChild(heart)
  setTimeout(() => {
    heart.remove()
  }, 1500)
}



let rect = document.body.getBoundingClientRect()
 console.log(rect.top, rect.right, rect.bottom, rect.left)


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

//Adds a high score or new player to local storage.
function addLocalStorage() {
  if (!localStorage.getItem(playerName)) {
    console.log('new player added')
    localStorage.setItem(
      playerName,
      JSON.stringify({
        totalScore,
        countDownTime,
      })
    )
  }

  if (totalScore > JSON.parse(localStorage.getItem(playerName)).totalScore) {
    console.log('new high score')
    localStorage.removeItem(playerName)
    localStorage.setItem(
      playerName,
      JSON.stringify({
        totalScore,
        countDownTime,
      })
    )
  }
  addHighScores()
}

closeBtn.addEventListener('click', () => {
  modalEl.style.transform = 'translateY(-600px)'
})

settingsBtn.addEventListener('click', () => {
  modalEl.style.transform = 'translateY(0px)'
  highScoresContainer.classList.remove('show')
})

// toggleHighScores()
highScore.addEventListener('click', () => {
  modalEl.style.transform = 'translateY(-600px)'
  highScoresContainer.classList.toggle('show')
})

const playerObject = {}
addHighScores()

//clears high scores container and re-adds the updated local storage
// in descending order. creates the element to display on page.
function addHighScores() {
  highScoresContainer.innerHTML = '<h3>--High Scores--</h3>'
  for (let player = 0; player < localStorage.length; player++) {
    const name = localStorage.key(player)
    playerObject[name] = JSON.parse(localStorage.getItem(name))
  }
  sortedPlayer = Object.keys(playerObject).sort((a, b) => {
    return playerObject[b].totalScore - playerObject[a].totalScore
  })

  for (let i = 0; i < sortedPlayer.length; i++) {
    const highScorePlayer = document.createElement('h3')

    highScorePlayer.innerHTML = `
       ${sortedPlayer[i]} - ${playerObject[sortedPlayer[i]].totalScore}
       right in ${playerObject[sortedPlayer[i]].countDownTime} seconds
      `

    highScoresContainer.appendChild(highScorePlayer)
  }
  if (!highScore.classList.contains('show')) {
    highScore.classList.add('show')
  } else {
    highScore.classList.remove('show')
  }
}

const correctSound = document.getElementById('correct-sound')
const wrongSound = document.getElementById('wrong-sound')
const congratsSound = document.getElementById('congrats-sound')
