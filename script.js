// your JS code here

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Python", "Java", "C", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Highlevel Text Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<js>", "<javascript>", "<scripting>", "<script>"],
    answer: "<script>"
  }
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
