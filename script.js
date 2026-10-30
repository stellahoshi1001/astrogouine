const FIELDS = [
  ["age", "Age"],
  ["activity", "Activity"],
  ["gender", "Gender"],
  ["favorite_color", "Favorite color"],
  ["favorite_food", "Favorite food"],
  ["love_language", "Love Language"],
  ["communication_style", "Communication style"],
  ["qualities", "Qualities"],
  ["flaws", "Flaws"],
  ["physical", "Physical attributes"],
];

const submissionBox = document.getElementById("submission");
const resultText = document.getElementById("result");
const nextButton = document.getElementById("next");

let all = [];
let current = null;
let answered = false;

async function loadSubmissions() {
  resultText.textContent = "Loading...";
  const { data, error } = await db.from("submissions").select("*");

  if (error) {
    console.error(error);
    resultText.textContent = "Could not load submissions: " + error.message;
    return;
  }

  all = data;
  showRandomSubmission();
}

function showRandomSubmission() {
  submissionBox.innerHTML = "";
  resultText.textContent = "";
  nextButton.hidden = true;
  answered = false;

  if (all.length === 0) {
    current = null;
    resultText.textContent = "No submissions yet. Fill out the form first!";
    return;
  }

  current = all[Math.floor(Math.random() * all.length)];

  FIELDS.forEach(([key, label]) => {
    const p = document.createElement("p");
    p.textContent = label + ": " + current[key];
    submissionBox.appendChild(p);
  });
}

document.querySelectorAll(".astro-button[id]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!current || answered) return;
    answered = true;

    if (button.id === current.sign) {
      resultText.textContent = "Correct! It was " + current.sign + "!";
    } else {
      resultText.textContent = "Nope, it was " + current.sign + ".";
    }
    nextButton.hidden = false;
  });
});

nextButton.addEventListener("click", showRandomSubmission);

loadSubmissions();
