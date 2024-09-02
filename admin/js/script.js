document
	.getElementById("question-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();

		const question = document.getElementById("question").value;
		const options = document.getElementById("options").value.split(",");
		const answer = parseInt(document.getElementById("answer").value);
		const region = document.getElementById("region").value;

		const newQuestion = {
			question: question,
			options: options,
			answer: answer,
			region: region,
		};

		// Fetch existing questions
		fetch("../data/questions.json")
			.then((response) => response.json())
			.then((data) => {
				data.push(newQuestion);

				// Save the updated questions list
				fetch("../data/questions.json", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}).then(() => {
					document.getElementById("message").textContent =
						"Question added successfully!";
					document.getElementById("question-form").reset();
				});
			});
	});
