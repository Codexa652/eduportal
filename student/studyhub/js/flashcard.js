let flashcardsData = [];

// 2. DOM Elements
const card = document.getElementById('flashcard');
const questionEl = document.getElementById('questionText');
const answerEl = document.getElementById('answerText');
const counterEl = document.getElementById('cardCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const loadingEl = document.getElementById('loading');

// 3. State Management
let currentIndex = 0;

// Mock Data
const defaultData = [
    { "id": 1, "type": "flashcard", "question": "What is the capital of France?", "answer": "Paris" },
    { "id": 2, "type": "flashcard", "question": "What is 2 + 2?", "answer": "4" },
    { "id": 3, "type": "flashcard", "question": "What is the chemical symbol for Gold?", "answer": "Au" },
    { "id": 4, "type": "flashcard", "question": "Who wrote 'Romeo and Juliet'?", "answer": "William Shakespeare" },
    { "id": 5, "type": "flashcard", "question": "What is the hardest natural substance on Earth?", "answer": "Diamond" }
];

function loadFlashcardsData() {
    flashcardsData = [...defaultData];
    loadingEl.style.display = 'none';
    loadCard(currentIndex);
}

// 4. Function to load the current card's data into the HTML
function loadCard(index) {
    const currentCard = flashcardsData[index];

    // Update text
    questionEl.textContent = currentCard.question;
    answerEl.textContent = currentCard.answer;

    // Update counter
    counterEl.textContent = `${index + 1} / ${flashcardsData.length}`;

    // Manage button states (disable Prev on first card, Next on last card)
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === flashcardsData.length - 1;
}

// 5. Event Listener: Flip the card when clicked
card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
});

// 6. Event Listener: Go to Next Card
nextBtn.addEventListener('click', () => {
    if (currentIndex < flashcardsData.length - 1) {
        currentIndex++;

        // If the card is flipped to the answer, flip it back to the question first
        if (card.classList.contains('is-flipped')) {
            card.classList.remove('is-flipped');
            // Wait for the flip animation to finish before changing the text
            setTimeout(() => loadCard(currentIndex), 300);
        } else {
            loadCard(currentIndex);
        }
    }
});

// 7. Event Listener: Go to Previous Card
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;

        if (card.classList.contains('is-flipped')) {
            card.classList.remove('is-flipped');
            setTimeout(() => loadCard(currentIndex), 300);
        } else {
            loadCard(currentIndex);
        }
    }
});

// 8. Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentIndex < flashcardsData.length - 1) {
        currentIndex++;
        if (card.classList.contains('is-flipped')) {
            card.classList.remove('is-flipped');
            setTimeout(() => loadCard(currentIndex), 300);
        } else {
            loadCard(currentIndex);
        }
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        if (card.classList.contains('is-flipped')) {
            card.classList.remove('is-flipped');
            setTimeout(() => loadCard(currentIndex), 300);
        } else {
            loadCard(currentIndex);
        }
    } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
    }
});

// 8. Initialize the first card on page load
loadFlashcardsData();