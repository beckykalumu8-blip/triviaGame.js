const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  {
    question: "What is the capital of Kenya?",
    options: ["A) London", "B) Berlin", "C) Nairobi", "D) Mombasa"],
    correct: "C"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["A) Venus", "B) Mars", "C) Jupiter", "D) Saturn"],
    correct: "B"
  },
  {
    question: "What is 2 + 2?",
    options: ["A) 3", "B) 4", "C) 5", "D) 6"],
    correct: "B"
  },
  {
    question: "Who wrote 'My life in crime'?",
    options: ["A) John Kiriamiti", "B) Ken Walibora", "C) Walah Bin Walah", "D) Ngugi wa Thiong'o"],
    correct: "A"
  },
  {
    question: "What is the longest river in Kenya?",
    options: ["A) Athi", "B) Mara", "C) Nzoia", "D) Tana"],
    correct: "D"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let results = [];
let gameTimer;
let questionTimer;
const totalTime = 60;
const questionTime = 10;


function startGame() {
  console.log("Welcome to the Trivia Quiz!");
  console.log(`You have ${totalTime} seconds total. Each question has ${questionTime} seconds.`);
  console.log("Type A, B, C, or D to answer.\n");
  
  let timeLeft = totalTime;
  gameTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      endGame("Time's up! Game over.");
    }
  }, 1000);

  displayQuestion();
}

function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame("All questions answered!");
    return;
  }
  
  const q = questions[currentQuestionIndex];
  console.log(`Question ${currentQuestionIndex + 1}: ${q.question}`);
  q.options.forEach(option => console.log(option));
  
  let qTimeLeft = questionTime;
  questionTimer = setInterval(() => {
    qTimeLeft--;
    if (qTimeLeft <= 0) {
      console.log("Time's up for this question! Moving to next.");
      results.push(false);
      currentQuestionIndex++;
      clearInterval(questionTimer);
      setTimeout(displayQuestion, 1000);
    }
  }, 1000);
  
  rl.question("Your answer: ", (answer) => {
    clearInterval(questionTimer);
    checkAnswer(answer.toUpperCase());
  });
}

function checkAnswer(answer) {
  const q = questions[currentQuestionIndex];
  if (answer === q.correct) {
    console.log("Correct! Well done.\n");
    score++;
    results.push(true);
  } else {
    console.log(`Incorrect. The correct answer is ${q.correct}.\n`);
    results.push(false);
  }
  currentQuestionIndex++;
  setTimeout(displayQuestion, 1000);
}

function endGame(message) {
  clearInterval(gameTimer);
  clearInterval(questionTimer);
  console.log(message);
  
  const correctAnswers = results.filter(result => result).length;
  console.log(`You answered ${correctAnswers} out of ${questions.length} questions correctly.`);
  console.log(`Final Score: ${score}/${questions.length}`);
  rl.close();
}

rl.question("Press Enter to start the trivia quiz: ", () => {
  startGame();
});