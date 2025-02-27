let score = 0;
let timeLeft = 900; // 15 minutes in seconds
let totalQuestions = 25; // Set to a maximum of 25 questions
let currentQuestion = 0;
let timer;

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('submit-answer').addEventListener('click', checkAnswer);
document.getElementById('reset-game').addEventListener('click', resetGame);

function startGame() {
    score = 0;
    currentQuestion = 0;
    timeLeft = 900; // Reset time to 15 minutes
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('result').innerText = '';
    document.getElementById('reset-game').style.display = 'none';
    generateQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0 || currentQuestion >= totalQuestions) {
            clearInterval(timer);
            document.getElementById('result').innerText = "Game Over! Your score: " + score;
            document.getElementById('reset-game').style.display = 'block';
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function generateQuestion() {
    if (currentQuestion < totalQuestions) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operation = Math.floor(Math.random() * 4); // 0: add, 1: subtract, 2: multiply, 3: divide
        let question;
        let correctAnswer;

        switch (operation) {
            case 0: // Addition
                question = `What is ${num1} + ${num2}?`;
                correctAnswer = num1 + num2;
                break;
            case 1: // Subtraction
                // Ensure num1 is greater than num2 to avoid negative results
                if (num1 < num2) {
                    [num1, num2] = [num2, num1];
                }
                question = `What is ${num1} - ${num2}?`;
                correctAnswer = num1 - num2;
                break;
            case 2: // Multiplication
                question = `What is ${num1} × ${num2}?`;
                correctAnswer = num1 * num2;
                break;
            case 3: // Division
                // Ensure that num1 is a multiple of num2 for whole number results
                num2 = Math.floor(Math.random() * 9) + 1; // num2 should be between 1 and 9
                const multiple = Math.floor(Math.random() * 10) + 1; // Ensure num1 is a multiple of num2
                num1 = num2 * multiple; // num1 is now a multiple of num2
                question = `What is ${num1} ÷ ${num2}?`;
                correctAnswer = num1 / num2; // Result is a whole number
                break;
        }

        document.getElementById('question').innerText = question;
        document.getElementById('answer').value = '';
        document.getElementById('answer').focus();

        // Store the correct answer
        document.getElementById('submit-answer').dataset.correctAnswer = correctAnswer;
        currentQuestion++;
    } else {
        document.getElementById('result').innerText = "You completed all questions!";
        clearInterval(timer);
    }
}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const correctAnswer = parseFloat(document.getElementById('submit-answer').dataset.correctAnswer);

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        document.getElementById('result').innerText = "Correct!";
    } else {
        document.getElementById('result').innerText = "Wrong!";
    }
    
    generateQuestion();
}

function resetGame() {
    score = 0;
    timeLeft = 900; // Reset time to 15 minutes
    currentQuestion = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    updateTimerDisplay();
    document.getElementById('result').innerText = '';
    document.getElementById('reset-game').style.display = 'none';
}
