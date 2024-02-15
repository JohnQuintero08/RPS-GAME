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

const nextBtn = document.getElementById('next-btn')
const exitBtn = document.getElementById('exit-btn')

const onePlayerInput = document.getElementById('one-player-input')
const firstDiagram = document.getElementById('first-diagram')
const secondForm = document.getElementById('second-form')
const gameSection = document.getElementById('game-section')

/* CLASSES */
class Rock {
    constructor(){
        this._parShapeName = "Rock"
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
}

class Paper {
    constructor(){
        this._parShapeName = "Paper"
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
}
class Scissors {
    constructor(){
        this._parShapeName = "Scissors"
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
            console.log("Draw")
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
                <input id="name1" type="text">       
            </form>`
    }else{
        numPlayers = 2
        a = `<form class="two-players-form"id="two-players-form">
                    <label for="name1">Enter name player 1 </label> <br>
                    <input id="name1" type="text"> <br>

                    <label for="name2">Enter name player 2 </label> <br>
                    <input id="name2" type="text">
                </form>`
    }
    firstDiagram.style.display = 'none'
    secondForm.innerHTML = a + formRounds() 
    secondForm.style.display = 'block'
    secondFormFunction()

})

/* Function that allows to insert the name and select the number of rounds */
function secondFormFunction(){
    const startGameBtn = document.getElementById('start-game-btn') /* POR QUE DEBO DECLARAR ACA EL BOTON Y NO ARRIBA */
    startGameBtn.addEventListener("click", function(){
        nameFirstPlayer = document.getElementById('name1').value
        if(numPlayers === 2){
            nameSecondPlayer = document.getElementById('name2').value
        }
        numberRounds = document.querySelector('input[name="round"]:checked').value
        secondForm.style.display = 'none'
        gameSection.style.display = 'block'
        game.setNumberOfRounds(numberRounds)
        printBoardGame(0,0)
        gameFunction()
    })
}

let game = new Game()

function gameFunction(){
    let player1 = new Player(nameFirstPlayer, 0)
    let player2 = new Player(nameSecondPlayer, 0)   
    
    document.querySelectorAll('[data-figure]').forEach(button => {
        button.addEventListener("click", function(){
            let choice 
            let turno = new Turn()
            choice = button.getAttribute('data-figure')
            if(numTurno==1){
                turno.setPlayer(player1.getName())
                turno.setShape(choice)
                newArray.push(turno) 
                numTurno++
            }else if(numTurno==2){
                turno.setPlayer(player2.getName())
                turno.setShape(choice)
                newArray.push(turno)

                let result = cambiarForma(newArray[0]._parShape).defeats(newArray[1]._parShape)
                let round = new Round()
                round.setRoundNumber(currentRound)
                round.pushArrayOfTurns(newArray)
                round.setRoundWinner(result)

                if(round.getRoundWinner()== 1){
                    points1++
                }else if(round.getRoundWinner() == 2){
                    points2++
                }

                game.pushRound(round)

                if(currentRound == numberRounds){
                    console.log("hey")
                    if(points1 > points2){
                        winnerName = nameFirstPlayer
                    }else if(points1 < points2){
                        winnerName = nameSecondPlayer
                    }else{
                        winnerName = "DRAW"
                    }
                    printBoardGame(points1, points2)
                    const rpsSelector = document.getElementById("rps-selector").style.display = 'none'
                    const winnerBoard = document.getElementById("winner-board")
                    winnerBoard.style.display = 'block'
                    winnerBoard.innerHTML = `
                                            <h1>GAME WINNER:</h1>
                                            <h3>${winnerName}</h3>
                                            <h3>GAME OVER!</h3>
                                            <h3>THANK YOU FOR PLAYING</h3>
                                            `
                }else{
                    printBoardGame(points1,points2)
                }

                console.log(game)
                console.log(currentRound + ' ' + numberRounds)
                newArray =  []
                numTurno = 1
                currentRound++
                gameFunction()
            }
        })
    })

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
                <input type="radio" name="round" value="1" id="one-rounds"  > ONE   <br>
                <input type="radio" name="round" value="3" id="three-rounds"> THREE <br>
                <input type="radio" name="round" value="5" id="five-rounds" > FIVE  <br>
                <input type="radio" name="round" value="7" id="seven-rounds"> SEVEN <br>   
            </div>
            <button id="start-game-btn"> START GAME </button>`
}

/* Function that writes the main game window */
function printBoardGame(a, b){
    gameSection.innerHTML =`<h1>Round # of # </h1>
                        <h3>SCORE</h3>
                        <div class="name-score">
                            <p> ${nameFirstPlayer} : ${a}</p>
                            <P> ${nameSecondPlayer}: ${b}</P>
                        </div>
                        <h3> NAME - PLEASE LOOK AWAY </h3>
                        <p> NAME Turn</p>
                        <p>Select the shape:</p>
                        <div id="rps-selector" class="rps-selector">
                            <button id="rock-button"     data-figure="Rock"    > ROCK    </button>
                            <button id="paper-button"    data-figure="Paper"   > PAPER   </button>
                            <button id="scissors-button" data-figure="Scissors"> SCISSORS</button>
                        </div>
                        <button id="next-turn-button"> NEXT TURN</button>
                        <div id="winner-board" class="winner-board"> </div>`
}
