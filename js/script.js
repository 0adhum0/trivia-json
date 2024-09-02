document.addEventListener("DOMContentLoaded", function () {
	document
		.getElementById("getQuestionBtn")
		.addEventListener("click", getTriviaQuestion);

	function getTriviaQuestion() {
		fetch("questions.json")
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						"An error occurred while fetching trivia questions."
					);
				}
				return response.json();
			})
			.then((data) => {
				const questionContainer =
					document.getElementById("questionContainer");
				questionContainer.innerHTML = "";

				if (data.length === 0) {
					questionContainer.innerHTML = "No questions available.";
					return;
				}

				// Randomly select a question
				const randomIndex = Math.floor(Math.random() * data.length);
				const result = data[randomIndex];
				const questionItem = document.createElement("div");
				questionItem.classList.add("question-item");

				const questionElement = document.createElement("p");
				questionElement.innerHTML = result.question;
				questionItem.appendChild(questionElement);

				if (result.type === "multiple") {
					// Multiple Choice Question
					const answers = [...result.answers];
					shuffleArray(answers);

					answers.forEach((answer) => {
						const answerElement = document.createElement("p");
						answerElement.classList.add("answer");
						answerElement.innerHTML = answer;
						answerElement.onclick = function () {
							if (answer === result.correct_answer) {
								this.style.color = "green";
								this.innerHTML += " (Correct)";
							} else {
								this.style.color = "red";
								this.innerHTML += ` (Incorrect). The correct answer is: ${result.correct_answer}`;
							}

							document
								.querySelectorAll(".answer")
								.forEach((element) => {
									element.onclick = null;
								});
						};
						questionItem.appendChild(answerElement);
					});
				} else if (result.type === "boolean") {
					// True/False Question
					const trueButton = document.createElement("button");
					trueButton.innerHTML = "True";
					trueButton.onclick = function () {
						revealAnswer(true);
					};
					questionItem.appendChild(trueButton);

					const falseButton = document.createElement("button");
					falseButton.innerHTML = "False";
					falseButton.onclick = function () {
						revealAnswer(false);
					};
					questionItem.appendChild(falseButton);

					function revealAnswer(userAnswer) {
						const isCorrect =
							(userAnswer && result.correct_answer === "True") ||
							(!userAnswer && result.correct_answer === "False");
						questionContainer.innerHTML = `The correct answer is: ${
							result.correct_answer
						}.<br> You were ${
							isCorrect ? "correct" : "incorrect"
						}.`;
					}
				} else {
					questionContainer.innerHTML = "Unsupported question type.";
				}

				questionContainer.appendChild(questionItem);
			})
			.catch((error) => {
				console.error("Error fetching trivia question:", error);
				document.getElementById("questionContainer").innerHTML =
					error.message;
			});
	}

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
});
