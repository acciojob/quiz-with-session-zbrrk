// your JS code here

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];


const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Render questions
function renderQuestions() {
  questionsDiv.innerHTML = "";
  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<p>${q.question}</p>`;
    q.choices.forEach(choice => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${index}`;
      input.value = choice;
      qDiv.appendChild(input);
      qDiv.appendChild(document.createTextNode(choice));
    });
    questionsDiv.appendChild(qDiv);
  });

  // Restore previous selections if any
  questions.forEach((q, index) => {
    const saved = localStorage.getItem(`question${index}`);
    if (saved) {
      const radios = document.getElementsByName(`question${index}`);
      radios.forEach(r => {
        if (r.value === saved) r.setAttribute("checked", "true");
      });
    }
  });
}

// Save answer in localStorage
questionsDiv.addEventListener("change", e => {
  if (e.target && e.target.type === "radio") {
    const name = e.target.name;
    localStorage.setItem(name, e.target.value);
  }
});

// Calculate score
submitBtn.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, index) => {
    const saved = localStorage.getItem(`question${index}`);
    if (saved === q.answer) score++;
  });

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

renderQuestions();
