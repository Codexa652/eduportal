// 2. DOM Elements
const accordionContainer = document.getElementById('accordionContainer');
const loadingEl = document.getElementById('loading');

// Mock Data
const essayData = [
  { "id": 1, "type": "essay", "question": "Explain the significance of the Industrial Revolution.", "answer": "The Industrial Revolution marked a period of development in the latter half of the 18th century that transformed largely rural, agrarian societies in Europe and America into industrialized, urban ones." },
  { "id": 2, "type": "essay", "question": "What are the main causes of climate change?", "answer": "The primary causes of climate change are the burning of fossil fuels, deforestation, and industrial processes that release large amounts of greenhouse gases into the atmosphere." },
  { "id": 3, "type": "essay", "question": "Discuss the impact of the internet on modern communication.", "answer": "The internet has revolutionized communication by enabling instant global connectivity. It has democratized information access, fostered social networking, and transformed business operations, though it also raises concerns about privacy and misinformation." }
];

function loadEssays() {
    renderAccordions(essayData);
}

// 3. Render the Accordion Items
function renderAccordions(data) {
    loadingEl.style.display = 'none';
    let htmlContent = '';

    data.forEach(item => {
        htmlContent += `
            <div class="accordion-item">
                <button class="accordion-btn" aria-expanded="false">
                    <span class="question-text">${item.question}</span>
                    <span class="accordion-icon">+</span>
                </button>
                <div class="accordion-content">
                    <div class="accordion-text">
                        ${item.answer}
                    </div>
                </div>
            </div>
        `;
    });

    accordionContainer.innerHTML = htmlContent;
    attachEventListeners();
}

// 4. Attach Click Events and Handle Logic
function attachEventListeners() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Find the currently open accordion (if any)
            const currentlyActiveBtn = document.querySelector('.accordion-btn.active');
            
            // If another accordion is open, and it's NOT the one we just clicked, close it
            if (currentlyActiveBtn && currentlyActiveBtn !== btn) {
                currentlyActiveBtn.classList.remove('active');
                currentlyActiveBtn.nextElementSibling.style.maxHeight = null;
            }

            // Toggle the clicked accordion
            this.classList.toggle('active');
            
            // Get the corresponding content div
            const content = this.nextElementSibling;

            // Smooth sliding logic:
            if (this.classList.contains('active')) {
                // Set max-height to its actual scrollHeight so it transitions open
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // Remove max-height so it transitions closed
                content.style.maxHeight = null;
            }
        });
    });
}

// Initialize the page
loadEssays();