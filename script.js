{
    let rockButton = document.querySelector(".js-rockButton");
    let paperButton = document.querySelector(".js-paperButton");
    let scissorButton = document.querySelector(".js-scissorButton");
    let resultElement = document.querySelector(".js-resultElement");

    let userWins = 0;
    let computerWins = 0;

    const printResult = (userPickParameter, computerPickParameter, resultParameter) => {
        resultElement.innerHTML =
            `You picked: ${userPickParameter}<br>
             Computer picked: ${computerPickParameter}<br><br>
             ${resultParameter.toUpperCase()}<br><br>
             Score: 
             You: ${userWins} Computer:${computerWins}`;
    }

    const generateComputerChoice = () => {
        const randomNumber = Math.random();
        let computerChoice = "";

        if (randomNumber >= 0 && randomNumber <= 0.33) computerChoice = "rock"
        else if (randomNumber > 0.33 && randomNumber <= 0.66) computerChoice = "paper";
        else if (randomNumber > 0.66 && randomNumber <= 1) computerChoice = "scissor";

        return computerChoice;
    }

    const playGame = (userChoiceParameter) => {
        let resultText = "";
        const computerChoice = generateComputerChoice();

        if (userChoiceParameter === computerChoice) resultText = "Draw! Try again"
        else {
            if (userChoiceParameter === "rock") (computerChoice === "paper") ? resultText = "You lost!" : resultText = "You win!";
            if (userChoiceParameter === "paper") (computerChoice === "rock") ? resultText = "You win!" : resultText = "You lost!";
            if (userChoiceParameter === "scissor") (computerChoice === "paper") ? resultText = "You win!" : resultText = "You lost!";
        }
        if (resultText !== "Draw! Try again") {
            if (resultText === 'You win!') userWins += 1
            else computerWins += 1;
        }

        printResult(userChoiceParameter, computerChoice, resultText);
    }

    const userButtonClick = () => {

        rockButton.addEventListener("click", () => { playGame("rock") });
        paperButton.addEventListener("click", () => { playGame("paper") });
        scissorButton.addEventListener("click", () => { playGame("scissor") });
    }

    const init = () => {

        userButtonClick();
    }

    init();
}