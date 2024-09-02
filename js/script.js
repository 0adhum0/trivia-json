document.addEventListener("DOMContentLoaded", function () {
	const quizContainer = document.getElementById("quiz-container");
	const questionElement = document.getElementById("question");
	const optionsElement = document.getElementById("options");
	const submitButton = document.getElementById("submit");
	const resultElement = document.getElementById("result");

	let currentQuestionIndex = 0;
	let score = 0;
	let questions = [];

	// Fetch questions from the JSON file
	fetch("data/questions.json")
		.then((response) => response.json())
		.then((data) => {
			questions = data;
			displayQuestion();
		});

	function displayQuestion() {
		const question = questions[currentQuestionIndex];
		questionElement.textContent = question.question;

		optionsElement.innerHTML = "";
		question.options.forEach((option, index) => {
			const optionElement = document.createElement("div");
			optionElement.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
			optionsElement.appendChild(optionElement);
		});
	}

	submitButton.addEventListener("click", function () {
		const selectedOption = document.querySelector(
			'input[name="option"]:checked'
		);
		if (!selectedOption) {
			alert("Please select an answer");
			return;
		}

		const answer = parseInt(selectedOption.value);
		if (answer === questions[currentQuestionIndex].answer) {
			score++;
		}

		currentQuestionIndex++;
		if (currentQuestionIndex < questions.length) {
			displayQuestion();
		} else {
			showResult();
		}
	});

	function showResult() {
		resultElement.textContent = `Your score is ${score} out of ${questions.length}`;
		quizContainer.style.display = "none";
	}
});
