const quizData = [
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "Capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "JS stands for?",
    answers: ["JavaSource", "JavaScript", "JustScript", "JScript"],
    correct: 1
  },
  {
    question: "How many players are on the field for one team in soccer?",
    answers: ["9", "10", "11", "12"],
    correct: 2
  },
  {
    question: "Which tournament awards the FIFA World Cup trophy?",
    answers: ["Copa America", "UEFA Euro", "FIFA World Cup", "AFCON"],
    correct: 2
  },
  {
    question: "A standard soccer match lasts how long (excluding stoppage time)?",
    answers: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
    correct: 1
  },
  {
    question: "What is it called when a player scores three goals in one match?",
    answers: ["Treble", "Trifecta", "Hat-trick", "Triple play"],
    correct: 2
  },
  {
    question: "Which position is primarily responsible for guarding the goal?",
    answers: ["Striker", "Midfielder", "Goalkeeper", "Defender"],
    correct: 2
  },
  {
    question: "What is the term for restarting play from the corner of the field?",
    answers: ["Free kick", "Throw-in", "Corner kick", "Goal kick"],
    correct: 2
  },
  {
    question: "Which card means a player is sent off?",
    answers: ["Yellow", "Red", "Blue", "Green"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const liveScore = document.getElementById("liveScore");

function updateProgress() {
  const total = quizData.length;
  const current = currentQuestion + 1;
  progressText.textContent = `Question ${current} of ${total}`;
  progressBar.style.width = `${(current / total) * 100}%`;
  liveScore.textContent = score;
}

function loadQuestion() {
  selectedAnswer = null;
  const q = quizData[currentQuestion];

  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.textContent = ans;

    btn.onclick = () => {
      document.querySelectorAll(".answers button")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");
      selectedAnswer = index;
    };

    answersEl.appendChild(btn);
  });

  updateProgress();
}

nextBtn.onclick = () => {
  if (selectedAnswer === null) {
    alert("Select an answer first");
    return;
  }

  if (selectedAnswer === quizData[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.querySelector(".quiz-container").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultBox.classList.add("hidden");
  document.querySelector(".quiz-container").classList.remove("hidden");
  loadQuestion();
}

// init
loadQuestion();
