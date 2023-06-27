{
    let rockButton = document.querySelector(".js-rockButton");
    let paperButton = document.querySelector(".js-paperButton");
    let scissorButton = document.querySelector(".js-scissorButton");
    let resultElement = document.querySelector(".js-resultElement");
    let resetButton = document.querySelector(".js-scoreResetBtn");

    let score = JSON.parse(localStorage.getItem('localStorageScore')) ||
    {
        userWins: 0,
        computerWins: 0,
        draws: 0
    }

    const saveLocalStorage = () => {
        localStorage.setItem('localStorageScore', JSON.stringify(score));
    }

    const printResult = (userPickParameter = '...', computerPickParameter = '...', resultParameter = 'Have a Pick!') => {
        resultElement.innerHTML =
            `You <img src="images/${userPickParameter}-emoji.png" class="resultImage">
            <img src="images/${computerPickParameter}-emoji.png" class="resultImage" > Computer
             <p class="winLostParagraph">${resultParameter.toUpperCase()}<p>
             Wins: ${score.userWins} 
             , Losses: ${score.computerWins}
             , Draws: ${score.draws}`;
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
        resetButton.removeAttribute("hidden");

        if (userChoiceParameter === computerChoice) {
            resultText = "Draw"
            score.draws += 1;
        } else {
            if (userChoiceParameter === "rock") (computerChoice === "paper") ? resultText = "You Lost" : resultText = "You win";
            if (userChoiceParameter === "paper") (computerChoice === "rock") ? resultText = "You Win" : resultText = "You Lost";
            if (userChoiceParameter === "scissors") (computerChoice === "paper") ? resultText = "You Win" : resultText = "You Lost";
        }

        if (resultText !== "Draw") {
            if (resultText === 'You Win') score.userWins += 1
            else score.computerWins += 1;
        }

        printResult(userChoiceParameter, computerChoice, resultText);
        saveLocalStorage();
    }

    const setReset = () => {
        score.userWins = 0;
        score.computerWins = 0;
        score.draws = 0;

        resultElement.innerHTML =
            `<p class="winLostParagraph">Have a Pick!<p>
        Wins: ${score.userWins} 
        , Losses: ${score.computerWins}
        , Draws: ${score.draws}`;

        resetButton.setAttribute("hidden", "hidden");
        localStorage.removeItem('localStorageScore');
    }

    const userButtonClick = () => {

        rockButton.addEventListener("click", () => playGame("rock"));
        paperButton.addEventListener("click", () => playGame("paper"));
        scissorButton.addEventListener("click", () => playGame("scissors"));
        resetButton.addEventListener("click", () => setReset());
    }

    const init = () => {
        userButtonClick();
    }

    init();
}