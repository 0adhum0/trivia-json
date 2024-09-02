document.addEventListener("DOMContentLoaded", function () {
	const typeSelect = document.getElementById("type");
	const answersContainer = document.getElementById("answersContainer");

	typeSelect.addEventListener("change", function () {
		const type = typeSelect.value;
		answersContainer.innerHTML = "";

		if (type === "multiple") {
			for (let i = 0; i < 4; i++) {
				const input = document.createElement("input");
				input.type = "text";
				input.name = `answer${i}`;
				input.placeholder = `Answer ${i + 1}`;
				answersContainer.appendChild(input);
				answersContainer.appendChild(document.createElement("br"));
			}
			const correctInput = document.createElement("input");
			correctInput.type = "text";
			correctInput.id = "correct_answer";
			correctInput.name = "correct_answer";
			correctInput.placeholder = "Correct Answer";
			answersContainer.appendChild(correctInput);
		} else if (type === "boolean") {
			// No additional answers for true/false questions
		}
	});

	document
		.getElementById("questionForm")
		.addEventListener("submit", function (event) {
			event.preventDefault();

			const type = document.getElementById("type").value;
			const question = document.getElementById("question").value;
			let answers = [];
			let correctAnswer = "";

			if (type === "multiple") {
				answers = Array.from(
					document.querySelectorAll('input[name^="answer"]')
				).map((input) => input.value);
				correctAnswer = document.getElementById("correct_answer").value;
			}

			const newQuestion = {
				type,
				question,
				correct_answer: correctAnswer,
			};

			if (type === "multiple") {
				newQuestion.answers = answers;
			}

			// Append the new question to the JSON file
			fetch("add_question.php", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newQuestion),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						alert("Question added successfully!");
						document.getElementById("questionForm").reset();
					} else {
						alert("Failed to add question.");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
					alert("An error occurred while adding the question.");
				});
		});
});
