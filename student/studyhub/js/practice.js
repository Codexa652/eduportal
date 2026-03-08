// 2. DOM Elements
const definitionsContainer = document.getElementById('definitionsContainer');
const blanksContainer = document.getElementById('blanksContainer');
const loadingEl = document.getElementById('loading');

// Mock Data
const defaultData = [
    { "id": 1, "type": "definition", "term": "Photosynthesis", "content": "The process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water." },
    { "id": 2, "type": "blank", "text": "The powerhouse of the cell is the ___.", "answer": "mitochondria" },
    { "id": 3, "type": "definition", "term": "Velocity", "content": "The speed of something in a given direction." },
    { "id": 4, "type": "blank", "text": "Water boils at ___ degrees Celsius.", "answer": "100" }
];

function loadPracticeData() {
    renderContent(defaultData);
}

// 3. Render the content to the screen
function renderContent(data) {
    loadingEl.style.display = 'none';
    let defHTML = '';
    let blanksHTML = '';

    data.forEach(item => {
        if (item.type === "definition") {
            // Build Definition HTML
            defHTML += `
                <div class="def-card">
                    <div class="def-term">${item.term}</div>
                    <div class="def-content">${item.content}</div>
                </div>
            `;
        } else if (item.type === "blank") {
            // Build Fill-in-the-Blank HTML
            // We replace "___" with an actual HTML input element
            // We store the correct answer in a 'data-answer' attribute so we can check it later
            const formattedText = item.text.replace('___', `
                <input type="text" 
                       class="blank-input" 
                       data-answer="${item.answer}" 
                       placeholder="type here...">
            `);

            blanksHTML += `
                <div class="blank-question">
                    ${formattedText}
                </div>
            `;
        }
    });

    definitionsContainer.innerHTML = defHTML;
    blanksContainer.innerHTML = blanksHTML;
}

// 4. Validation Logic
function checkAnswer(inputElement) {
    // Get what the user typed and remove extra spaces
    const userAnswer = inputElement.value.trim().toLowerCase();

    // Get the correct answer we hid in the data-answer attribute
    const correctAnswer = inputElement.getAttribute('data-answer').toLowerCase();

    // Reset classes first
    inputElement.classList.remove('correct', 'incorrect');

    // Only validate if they typed something
    if (userAnswer === "") return;

    if (userAnswer === correctAnswer) {
        inputElement.classList.add('correct');
        inputElement.blur(); // Unfocus the input when correct
    } else {
        inputElement.classList.add('incorrect');
    }
}

// 5. Event Listener for 'Enter' key
// We attach this to the whole container (Event Delegation) so it catches all inputs
blanksContainer.addEventListener('keyup', function (event) {
    // Check if the key pressed was 'Enter' AND if they were typing in an input field
    if (event.key === 'Enter' && event.target.classList.contains('blank-input')) {
        checkAnswer(event.target);
    }
});

// Initialize the page
loadPracticeData();