//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
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

// Display the quiz questions and choices
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  questionsElement.innerHTML = "";
  questions.forEach((q, index) => {
    const div = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    div.appendChild(questionText);
    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;
      if (userAnswers[index] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true");
      }
      input.addEventListener("change", (e) => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
        const radios = document.querySelectorAll(`input[name="question-${index}"]`);
        radios.forEach(r => {
          r.removeAttribute("checked");
          r.checked = false;
        });
        e.target.checked = true;
        e.target.setAttribute("checked", "true");
      });
      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });
    questionsElement.appendChild(div);
  });
}

submitBtn.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) score++;
  });
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

renderQuestions();
