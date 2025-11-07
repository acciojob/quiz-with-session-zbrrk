//your JS code here.

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load previous score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Create options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore checked state from session storage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // On change, save selection to sessionStorage
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Handle quiz submission
submitBtn.addEventListener("click", () => {
  let score = 0;

  // Calculate score
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display and store score
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

renderQuestions();
