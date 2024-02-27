let numPlayers;
let nameFirstPlayer;
let nameSecondPlayer;
let numberRounds;
let newArray = []
let numTurno = 1
let currentRound = 1
let points1 = 0
let points2 = 0
let winnerName 
let shapeWinner
let choice 
let evalueate = false

const nextBtn = document.getElementById('next-btn')
const exitBtn = document.getElementById('exit-btn')
const htpAnchortag = document.getElementById('htp-anchortag')

const onePlayerInput = document.getElementById('one-player-input')
const firstDiagram = document.getElementById('first-diagram')
const secondForm = document.getElementById('second-form')
const gameSection = document.getElementById('game-section')

/* CLASSES DEFINITIONS*/
class Rock {
    constructor(){
        this._parShapeName = "Rock"
        this._arrayOfImages = ["images/player1Rock.png","images/player2Rock.png"]
    }
    defeats(shapeOponent){
        if(shapeOponent == "Scissors"){
            return true
        }else if(shapeOponent == "Rock"){
            return null
        }else{
            return false
        }
    }
    getArrayOfImages(){
        return this._arrayOfImages
    }
}

class Paper {
    constructor(){
        this._parShapeName = "Paper"
        this._arrayOfImages = ["images/player1Paper.png","images/player2Paper.png"]
    }
    defeats(shapeOponent){
        if(shapeOponent == "Rock"){
            return true
        }else if(shapeOponent == "Paper"){
            return null
        }else{
            return false
        }
    }
    getArrayOfImages(){
        return this._arrayOfImages
    }
}
class Scissors {
    constructor(){
        this._parShapeName = "Scissors"
        this._arrayOfImages = ["images/player1Scissors.png","images/player2Scissors.png"]
    }
    defeats(shapeOponent){
        if(shapeOponent == "Paper"){
            return true
        }else if(shapeOponent == "Scissors"){
            return null
        }else{
            return false
        }
    }
    getArrayOfImages(){
        return this._arrayOfImages
    }
}

class Player{
    constructor(name, score){
        this._name = name
        this._score = score;
    }
    setScore(value){
        return this._score = value
    }
    setName(inName){
        return this._name = inName
    }
    getName(){
        return this._name
    }
    getScore(){
        return this._score
    }
}

class Turn{
    constructor(parPlayer, parShape){
        this._parPlayer = parPlayer
        this._parShape = parShape
    }

    getPlayer(){return this._parPlayer}
    getShape(){return this._parShape}

    setPlayer(player){
        return this._parPlayer = player
    }
    setShape(shape){
        return this._parShape = shape
    }

}

class Round {
    constructor(currentRoundNumber, roundWinner){
        this._currentRoundNumber = currentRoundNumber
        this._arrayOfTurns = []
        this._roundWinner = roundWinner
    }

    getRoundNumber() {return this._currentRoundNumber}
    getArrayOfTurns(){return this._arrayOfTurns}
    getRoundWinner(){return this._roundWinner}

    setRoundNumber(number){
        return this._currentRoundNumber = number
    }
    pushArrayOfTurns(anyTurn){
        return this._arrayOfTurns.push(anyTurn)
    }
    setRoundWinner(result){
        if(result == null){
            return this._roundWinner = null
        }else if(result){
            return this._roundWinner = 1
        }else{
            return this._roundWinner = 2
        }
    }
}

class Game{
    constructor(number){
        this._totalNumberOfRounds = number
        this._arrayOfRounds = []
    }
    pushRound(round){
        return this._arrayOfRounds.push(round)
    }
    getArrayOfRounds(){
        return this._arrayOfRounds
    }
    setNumberOfRounds(value){
        return this._totalNumberOfRounds = value
    }
}

/* FUNCTIONS */
/* Function that reload the page to the begining */
exitBtn.addEventListener("click", function(){
    location.reload()
})

/* Function for the first button, creates the second window for the name and round selection */
nextBtn.addEventListener("click", function(){
    let a = ''
    if(onePlayerInput.checked){
        numPlayers = 1
        a = `<form class="one-player-form" id="one-player-form">
                <label for="name1">Enter name player 1 </label> <br>
                <input id="name1" type="text" required>       
            </form>`
    }else{
        numPlayers = 2
        a = `<form class="two-players-form"id="two-players-form">
                    <label for="name1">Enter name player 1 </label> <br>
                    <input id="name1" type="text" required> <br>

                    <label for="name2">Enter name player 2 </label> <br>
                    <input id="name2" type="text" required>
                </form>`
    }
    firstDiagram.style.display = 'none'
    secondForm.innerHTML = a + formRounds() 
    secondForm.style.display = 'block'
    secondFormFunction()

})

/* Function that allows to insert the name and select the number of rounds */
function secondFormFunction(){
    const startGameBtn = document.getElementById('start-game-btn') 
    startGameBtn.addEventListener("click", function(){
        nameFirstPlayer = document.getElementById('name1').value
        if(nameFirstPlayer){
            numberRounds = document.querySelector('input[name="round"]:checked').value
            game.setNumberOfRounds(numberRounds)
            if(numPlayers === 2){
                nameSecondPlayer = document.getElementById('name2').value
                if(nameSecondPlayer){
                    secondForm.style.display = 'none'
                    gameSection.style.display = 'block'
                    printBoardGame(0,0,1)
                    gamePlay()
                    /* gameFunction() */
                }
                else{
                    document.getElementById("emergency").style.display = 'block'
                    secondFormFunction()
                }
            }else{
                secondForm.style.display = 'none'
                gameSection.style.display = 'block'
                nameSecondPlayer = "Computer"
                printBoardGame(0,0,1)
                gamePlay()
                /* soloPlayer() */
            }
        }else{
            document.getElementById("emergency").style.display = 'block'
            secondFormFunction()
        }   
    })
}

let game = new Game()

function gamePlay(){
    let player1 = new Player(nameFirstPlayer, 0)
    let player2 = new Player(nameSecondPlayer, 0)   
    if(numPlayers == 2){
        turnSingLayout()
        buttonImage(numTurno)
    }else{
        buttonImage(1)
    }
    document.querySelectorAll('[data-figure]').forEach(button => {
        button.addEventListener("click", function(){
            choice = button.getAttribute('data-figure')
            if(numPlayers == 2){
                let turno = new Turn()
                if(numTurno==1){
                    turno.setPlayer(player1.getName())
                    turno.setShape(choice)
                    newArray.push(turno) 
                    numTurno++
                    turnSingLayout()
                    buttonImage(numTurno)
                }else if(numTurno==2){
                    turno.setPlayer(player2.getName())
                    turno.setShape(choice)
                    newArray.push(turno)
                    evalueate = true 
                }
            }
            else{
                let turno1 = new Turn()
                let turnoPC = new Turn()
                choice = button.getAttribute('data-figure')
                turno1.setPlayer(player1.getName())
                turno1.setShape(choice)
                newArray.push(turno1) 
                
                turnoPC.setPlayer(player2.getName())
                turnoPC.setShape(randomShape())
                newArray.push(turnoPC)
                evalueate = true
            }

            if(evalueate){
                let result = cambiarForma(newArray[0]._parShape).defeats(newArray[1]._parShape)
                let round = new Round()
                round.setRoundNumber(currentRound)
                round.pushArrayOfTurns(newArray)
                round.setRoundWinner(result)
    
                if(round.getRoundWinner()== 1){
                    shapeWinner = round.getArrayOfTurns()[0][0].getShape()
                    roundWinner = nameFirstPlayer
                    points1++
                }else if(round.getRoundWinner() == 2){
                    shapeWinner = round.getArrayOfTurns()[0][1].getShape()
                    roundWinner = nameSecondPlayer
                    points2++
                }else{
                    shapeWinner = round.getArrayOfTurns()[0][0].getShape()
                    roundWinner = "DRAW"
                }
    
                game.pushRound(round)
    
                printBoardGame(points1,points2,currentRound)
                const winnerBoard = document.getElementById("winner-board")
                document.getElementById("button-board").style.display = 'none'
                winnerBoard.style.display = 'block'
                winnerBoard.innerHTML = turnWinnerLayout(roundWinner,round.getArrayOfTurns()[0][0].getShape(),round.getArrayOfTurns()[0][1].getShape())
                document.getElementById("result-place1").style.backgroundImage = `url('${cambiarForma(round.getArrayOfTurns()[0][0].getShape()).getArrayOfImages()[0]}')`
                document.getElementById("result-place2").style.backgroundImage = `url('${cambiarForma(round.getArrayOfTurns()[0][1].getShape()).getArrayOfImages()[1]}')`
                const nextTurnButton = document.getElementById("next-turn-button")
    
                if(currentRound >= numberRounds){
                    nextTurnButton.textContent = "SHOW WINNER"
                    nextTurnButton.addEventListener("click", function(){
                        printBoardGame(points1, points2,currentRound)
                        document.getElementById("button-board").style.display = 'none'
                        const winnerBoard = document.getElementById("winner-board")
                        winnerBoard.style.display = 'block'
                        if(points1 == points2){
                            winnerBoard.innerHTML = evenBoardLayout()
                            document.getElementById("tiebreaker-button").addEventListener("click",function(){
                                currentRound++
                                printBoardGame(points1, points2,currentRound)
                                gamePlay()
                            })
                        }else{
                            if(points1 > points2){
                                winnerName = nameFirstPlayer
                            }else if(points1 < points2){
                                winnerName = nameSecondPlayer
                            }
                            winnerBoard.innerHTML = winnerBoardLayout(winnerName)
                            document.getElementById("new-game-button").addEventListener("click", function(){
                                location.reload()
                            })
                        }
                    })
                }else{
                    nextTurnButton.addEventListener("click",function(){
                        currentRound++
                        printBoardGame(points1,points2,currentRound)
                        gamePlay()
                    })
                }
                newArray =  []
                numTurno = 1
                evalueate = false
            }
        })
    })

}


function randomShape(){
    let random = Math.floor(Math.random() * 3)
    if(random === 0){
        return "Rock"
    }else if(random === 1){
        return "Scissors"
    }else{
        return "Paper"
    }
}

function cambiarForma(h){
    let shape
    if(h === "Paper"){
        shape = new Paper()
    }else if(h === "Rock"){
        shape = new Rock()
    }else{
        shape = new Scissors()
    }
    return shape   
}

/* Function that writes the form of radio for the rounds */
function formRounds (){
    return `<div class="round-form" id="round-form">
                <p>Select the number of rounds:</p>
                <input type="radio" name="round" value="1" id="one-rounds"  checked> ONE   <br>
                <input type="radio" name="round" value="3" id="three-rounds"> THREE <br>
                <input type="radio" name="round" value="5" id="five-rounds" > FIVE  <br>
                <input type="radio" name="round" value="7" id="seven-rounds"> SEVEN <br>   
            </div>
            <button id="start-game-btn" class="start-game-btn"> START GAME </button>
            <p id="emergency" class="emergency"> *please fill all the blanks</p>`
}

/* Function that writes the main game window */
function printBoardGame(p1, p2, ra){
    gameSection.innerHTML =`<h1>Round ${ra} of ${numberRounds} </h1>
                        <h3>SCORE</h3>
                        <div class="name-score">
                            <p> ${nameFirstPlayer} : ${p1}</p>
                            <P> ${nameSecondPlayer}: ${p2}</P>
                        </div>
                        <div id="button-board">
                            <div id="turn-sign" class="turn-sign"></div>
                            <div id="rps-selector" class="rps-selector">
                                <p>Select the shape:</p>
                                <button class="shape-button rock-button" id="rock-button"     data-figure="Rock"    > ROCK    </button>
                                <button class="shape-button paper-button" id="paper-button"    data-figure="Paper"   > PAPER   </button>
                                <button class="shape-button scissors-button" id="scissors-button" data-figure="Scissors"> SCISSORS</button>
                            </div>
                        </div>
                        <div id="winner-board" class="winner-board"> </div>`
}

function turnSingLayout(){
    const turnSign = document.getElementById("turn-sign") 
    if(numTurno ==1 ){
        turnSign.innerHTML =`<h2 class="look-away-sign">${nameSecondPlayer} - Please Look Away</h2>
                            <p>${nameFirstPlayer}'s Turn</p>`
    }else{
        turnSign.innerHTML =`<h2>${nameFirstPlayer} - Please Look Away</h2>
                            <p>${nameSecondPlayer}'s Turn</p>`   
    }
}

function winnerBoardLayout(winnerName){
    return `
            <h1>GAME WINNER:</h1>
            <h3> -- ${winnerName} -- </h3>
            <h3>GAME OVER!</h3>
            <h3>THANK YOU FOR PLAYING</h3>
            <button class="new-game-button" id="new-game-button">NEW GAME</button>
            `
}

function evenBoardLayout(){
    return `
            <h1>GAME WINNER:</h1>
            <h3> -- DRAW -- </h3>
            <button class="tiebreaker-button" id="tiebreaker-button">PLAY TIEBREAKER ROUND</button>
            `
}

function turnWinnerLayout(winner, shape1, shape2){
    return `
                        <h3>Winner of this round: ${winner}</h3>
                        <div class="general-turn-container">
                            <div class="turn-container">
                                <h3>${nameFirstPlayer} selected:</h3>
                                <div class="result-place ${shape1}-button" id="result-place1">${shape1}</div>
                            </div>
                            <div class="turn-container">
                                <h3>${nameSecondPlayer} selected:</h3>
                                <div class="result-place ${shape2}-button" id="result-place2">${shape2}</div>
                            </div>
                        </div>
                        <button class="next-turn-button" id="next-turn-button"> NEXT TURN</button>
                        `
}

function buttonImage(player){
    player =player - 1
    document.getElementById("rock-button").style.backgroundImage = `url('${new Rock().getArrayOfImages()[player]}')`
    document.getElementById("scissors-button").style.backgroundImage = `url('${new Scissors().getArrayOfImages()[player]}')`
    document.getElementById("paper-button").style.backgroundImage = `url('${new Paper().getArrayOfImages()[player]}')`
}
