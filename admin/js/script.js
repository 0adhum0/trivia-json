document
	.getElementById("question-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();

		const formData = new FormData(document.getElementById("question-form"));

		fetch("add_question.php", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				document.getElementById("message").textContent = data.message;
				if (data.status === "success") {
					document.getElementById("question-form").reset();
				}
			})
			.catch((error) => {
				document.getElementById("message").textContent =
					"An error occurred: " + error;
			});
	});
