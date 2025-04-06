// JavaScript Code for API-01 With Challenge Parts: 
window.onload = function () {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())  // Code for Parsing the JSON Response 
        .then(data => {
            const levels = data.data; // Code for Access Levels from the Response
            const buttonsContainer = document.getElementById('buttons-container');
            const vocabularySection = document.getElementById('vocabulary-section');
            const defaultText = document.getElementById('default-text');
            const wordsContainer = document.getElementById('words-container');
            const loadingSpinner = document.getElementById('loading-spinner');
            // Code for Loop Through the Levels and Create Buttons Dynamically
            levels.forEach(level => {
                const button = document.createElement('button');
                button.textContent = level.lessonName;
                button.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded', 'mr-2', 'mb-2', 'hover:bg-blue-600');
                button.addEventListener('click', () => {
                    // Code for Remove Active Class from All Buttons
                    const allButtons = buttonsContainer.querySelectorAll('button');
                    allButtons.forEach(btn => btn.classList.remove('active-btn'));
                    // Code for Add Active Class to the Clicked Button
                    button.classList.add('active-btn');
                    // Code for Display the Corresponding Lesson Text
                    defaultText.textContent = `You've Selected the ${level.lessonName} Lesson.`;
                    // Code for Show Loading Animation While Fetching Words
                    loadingSpinner.classList.remove('hidden');
                    // Code for Clear Previous Words If Any
                    wordsContainer.innerHTML = '';
                    // Code for Fetch Words for the Selected Level
                    fetch(`https://openapi.programming-hero.com/api/level/${level.level_no}`)
                        .then(response => response.json())
                        .then(wordData => {
                            const words = wordData.data;
                            loadingSpinner.classList.add('hidden'); // Hide the loading animation
                            if (words.length > 0) {
                                // Display words
                                words.forEach(word => {
                                    // Avoid displaying falsy values
                                    if (word.word || word.meaning || word.pronunciation) {
                                        const wordElement = document.createElement('div');
                                        wordElement.classList.add('p-6', 'bg-white', 'rounded-lg', 'shadow-md', 'flex', 'flex-col', 'justify-center', 'items-center');

                                        // Check for null or undefined meaning and replace it with "অর্থ নেই"
                                        const meaning = word.meaning ? word.meaning : "অর্থ নেই";
                                        const pronunciation = word.pronunciation ? word.pronunciation : "উচ্চারণ নেই";

                                        wordElement.innerHTML = `
                                          <strong class="text-2xl">${word.word}</strong><br>
                                          Meaning: ${meaning}<br>
                                          Pronunciation: ${pronunciation}
                                          <div class="w-full mt-2 flex justify-between">
                                          <button class="text-blue-500 bg-gray-100 p-2 rounded-md" onclick="showWordDetails(${word.id})">
                                          <i class="fa-solid fa-circle-info" title="Details"></i>
                                          </button>
                                          <button class="text-blue-500 bg-gray-100 p-2 rounded-md" onclick="pronounceWord('${word.word}')">
                                          <i class="fa-solid fa-volume-high" title="Pronunciation"></i>
                                          </button>
                                          </div>`;
                                        wordsContainer.appendChild(wordElement);
                                        wordsContainer.classList.remove('flex', 'justify-center', 'items-center');
                                        wordsContainer.classList.add('grid', 'grid-cols-4', 'gap-4');
                                    }
                                });
                            } else {
                                wordsContainer.classList.remove('grid', 'grid-cols-4', 'gap-4');
                                wordsContainer.classList.add('flex', 'justify-center', 'items-center');
                                wordsContainer.innerHTML =
                                    `<div class="flex flex-col justify-center items-center">
                                         <img src="assets/alert-error.png" alt="Alert">
                                         <h1>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
                                         <h1 class="font-bold text-3xl">নেক্সট Lesson এ যান</h1>
                                        </div>`;
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching words:', error);
                            wordsContainer.innerHTML = `<p>Failed to fetch words. Please try again later.</p>`;
                        });
                });
                buttonsContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching levels:', error);
        });
};

// JavaScript Code for Fetching Word Details from API-03 and Showing Modal
function showWordDetails(wordId) {
    // Code for Fetch Word Details from API-03
    fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
        .then(response => response.json())
        .then(data => {
            const wordData = data.data;
            // Code for Show the Modal and Populate It With the Word Details
            const modal = document.getElementById('word-details-modal');
            document.getElementById('modal-word').textContent = wordData.word;
            document.getElementById('modal-pronunciation').textContent = `Meaning: ${wordData.meaning}`;
            document.getElementById('modal-sentence').textContent = `Example: "${wordData.sentence}"`;
            document.getElementById('modal-synonyms').textContent = `সমার্থক শব্দ গুলো: ${wordData.synonyms.join(', ')}`;
            // Code for Show the Modal
            modal.classList.remove('hidden');
            // Code for Close Modal Functionality
            document.getElementById('complete-learning').onclick = function () {
                modal.classList.add('hidden');
            };
        })
        .catch(error => {
            console.error('Error fetching word details:', error);
        });
}

// JavaScript Code for Challenge Part (Partial)
document.getElementById("faqBtn").addEventListener("click", function () {
    document.getElementById("faqSection").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("learnBtn").addEventListener("click", function () {
    document.getElementById("learnSection").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("getStartedBtn").addEventListener("click", function () {
    let password = document.getElementById("password").value;
    if (password === "123456") {
        document.getElementById("banner").classList.add("hidden");
        document.getElementById("navbar").classList.remove("hidden");
        document.getElementById("learnSection").classList.remove("hidden");
        document.getElementById("faqSection").classList.remove("hidden");
        Swal.fire({
            title: "অভিনন্দন!",
            text: "আপনি সফলভাবে লগইন হয়েছেন!",
            icon: "success"
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "ইশ!",
            text: "আপনি পাসওয়ার্ডটি ভুল দিয়েছেন!"
        });
    }
});
function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}
document.getElementById("logOutBtn").addEventListener("click", function () {
    document.getElementById("banner").classList.replace("hidden", "flex");
    document.getElementById("navbar").classList.replace("flex", "hidden");
    document.getElementById("learnSection").classList.replace("block", "hidden");
    document.getElementById("faqSection").classList.replace("block", "hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
});
// Function to pronounce the word using Speech Synthesis API
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
}