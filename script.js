{
    let rockButton = document.querySelector(".js-rockButton");
    let paperButton = document.querySelector(".js-paperButton");
    let scissorButton = document.querySelector(".js-scissorButton");
    let resultElement = document.querySelector(".js-resultElement");
    let resetButton = document.querySelector(".js-scoreResetBtn");

    let score = JSON.parse(localStorage.getItem('localStorageScore')) ||
    {
        userWins: 0,
        computerWins: 0
    }

    const saveLocalStorage = () => {
        localStorage.setItem('localStorageScore', JSON.stringify(score));
    }

    const printResult = (userPickParameter = '...', computerPickParameter = '...', resultParameter = 'Have a Pick!') => {
        resultElement.innerHTML =
            `<p>You picked: ${userPickParameter}</p>
             Computer picked: ${computerPickParameter}
             <p class="winLostParagraph">${resultParameter.toUpperCase()}<p>
             <p class="scoreHeader">Score:</p> 
             You: ${score.userWins} 
             <p>Computer: ${score.computerWins}</p>`;
    }

    const generateComputerChoice = () => {
        const randomNumber = Math.random();
        let computerChoice = "";

        if (randomNumber >= 0 && randomNumber <= 0.33) computerChoice = "rock"
        else if (randomNumber > 0.33 && randomNumber <= 0.66) computerChoice = "paper";
        else if (randomNumber > 0.66 && randomNumber <= 1) computerChoice = "scissors";

        return computerChoice;
    }

    const playGame = (userChoiceParameter) => {
        let resultText = "";
        const computerChoice = generateComputerChoice();

        if (userChoiceParameter === computerChoice) resultText = "Draw!"
        else {
            if (userChoiceParameter === "rock") (computerChoice === "paper") ? resultText = "You lost!" : resultText = "You win!";
            if (userChoiceParameter === "paper") (computerChoice === "rock") ? resultText = "You win!" : resultText = "You lost!";
            if (userChoiceParameter === "scissors") (computerChoice === "paper") ? resultText = "You win!" : resultText = "You lost!";
        }
        if (resultText !== "Draw!") {
            if (resultText === 'You win!') score.userWins += 1
            else score.computerWins += 1;
        }

        saveLocalStorage();

        printResult(userChoiceParameter, computerChoice, resultText);
    }

    const setReset = () => {
        score.userWins = 0;
        score.computerWins = 0;
        printResult('...', '...');
        localStorage.removeItem('localStorageScore');
    }

    const userButtonClick = () => {

        rockButton.addEventListener("click", () => playGame("rock"));
        paperButton.addEventListener("click", () => playGame("paper"));
        scissorButton.addEventListener("click", () => playGame("scissors"));
        resetButton.addEventListener("click", () => setReset());
    }

    const init = () => {
        printResult();
        userButtonClick();
    }

    init();
}