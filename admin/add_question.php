<?php
header('Content-Type: application/json');

// Path to the JSON file
$jsonFilePath = '../data/questions.json';

// Read the existing questions
if (!file_exists($jsonFilePath)) {
    echo json_encode(['status' => 'error', 'message' => 'File not found']);
    exit;
}

$jsonData = file_get_contents($jsonFilePath);
$questions = json_decode($jsonData, true);

// Get the new question data from the POST request
$newQuestion = [
    'question' => $_POST['question'],
    'options' => explode(',', $_POST['options']),
    'answer' => intval($_POST['answer']),
    'region' => $_POST['region']
];

// Add the new question to the existing questions array
$questions[] = $newQuestion;

// Save the updated questions back to the JSON file
if (file_put_contents($jsonFilePath, json_encode($questions, JSON_PRETTY_PRINT))) {
    echo json_encode(['status' => 'success', 'message' => 'Question added successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to write to file']);
}
?>
