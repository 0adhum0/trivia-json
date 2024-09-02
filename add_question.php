<?php
header('Content-Type: application/json');

// Load existing questions
$filename = 'questions.json';
if (!file_exists($filename)) {
    file_put_contents($filename, json_encode([]));
}

$questions = json_decode(file_get_contents($filename), true);

// Get new question from POST data
$input = file_get_contents('php://input');
$newQuestion = json_decode($input, true);

// Validate the new question
if (!isset($newQuestion['type']) || !isset($newQuestion['question']) || 
    ($newQuestion['type'] === 'multiple' && (!isset($newQuestion['answers']) || !isset($newQuestion['correct_answer']))) ||
    ($newQuestion['type'] === 'boolean' && !isset($newQuestion['correct_answer']))) {
    echo json_encode(['success' => false, 'message' => 'Invalid question format.']);
    exit;
}

// Add new question
$questions[] = $newQuestion;
file_put_contents($filename, json_encode($questions, JSON_PRETTY_PRINT));

echo json_encode(['success' => true]);
?>
