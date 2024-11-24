document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");
    const nextPageButton = document.getElementById("nextPage");
    const calculateResultsButton = document.getElementById("calculateResults");
    const resultsDiv = document.getElementById("results");
    const progressBar = document.querySelector(".progress-bar");
    const kotakContainer = document.querySelector(".kotak-container");
    let currentPage = 0;
    const answers = {};
    let answeredQuestions = 0;
    const totalQuestions = Array.from(document.querySelectorAll(".page")).reduce((total, page) => {
        return total + page.querySelectorAll(".question").length;
    }, 0);

    attachOptionListeners();

    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.classList.toggle("active", index === pageIndex);
        });
    
        if (pageIndex === 0 || pageIndex === 1) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    
        if (pageIndex === pages.length - 1) {
            progressBar.style.display = "none";
            kotakContainer.style.display = "none";
        } else {
            progressBar.style.display = "flex";
            kotakContainer.style.display = "flex";
        }
    
        updateProgressBar(progressBar, answeredQuestions, totalQuestions);
    
        attachOptionListeners();
    }
    
    
    function checkAllQuestionsAnswered() {
        const currentQuestions = pages[currentPage].querySelectorAll(".question");
        let allAnswered = true;
    
        currentQuestions.forEach(question => {
            const category = question.getAttribute("data-category");
            if (!(category in answers)) {
                console.warn(`Question in "${category}" isn't answered.`);
                allAnswered = false;
            }
        });
    
        if (!allAnswered) {
            alert("Please answer all questions in this page.");
        }
    
        return allAnswered;
    }
    
    

    function updateProgressBar(pBar, answered, total) {
        const percentage = Math.min((answered / total) * 100, 100);
        const progressFill = pBar.querySelector(".progress__fill");
        const progressText = pBar.querySelector(".progress__text");
    
        progressFill.style.transition = "width 0.5s ease-out";
        progressFill.style.width = `${percentage}%`;
    
        let startValue = parseInt(progressText.textContent);
        let endValue = Math.round(percentage);
        let duration = 500; // dalam ms
        let startTime = null;
    
        function animateText(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const currentValue = Math.min(startValue + (endValue - startValue) * (progress / duration), endValue);
            
            progressText.textContent = `${Math.round(currentValue)}%`;
    
            if (progress < duration) {
                requestAnimationFrame(animateText);
            }
        }
    
        requestAnimationFrame(animateText);
    }
    
    

    function attachOptionListeners() {
        document.querySelectorAll(".option").forEach(button => {
            button.addEventListener("click", function () {
                const question = this.closest(".question");
                const category = question.getAttribute("data-category");
                const value = parseInt(this.getAttribute("data-value"));
    
                if (!(category in answers)) {
                    answeredQuestions++;
                }
    
                answers[category] = value;
    
                question.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
                this.classList.add("selected");
    
                updateProgressBar(progressBar, answeredQuestions, totalQuestions);
                window.scrollBy({ top: 300, behavior: "smooth" });
            });
        });
    }
    


nextPageButton.addEventListener("click", function () {
    if (!checkAllQuestionsAnswered()) {
        return;
    }

    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
});


calculateResultsButton.addEventListener("click", function () {
    if (!checkAllQuestionsAnswered()) {
        return;
    }

    showPage(currentPage);

    function getDepressionCategory(score) {
        if (score <= 4) return "Minimal Depression";
        else if (score <= 9) return "Mild Depression";
        else if (score <= 14) return "Moderate Depression";
        else if (score <= 19) return "Moderately Severe Depression";
        else return "Severe Depression";
    }

    showPage(pages.length - 1);
    resultsDiv.innerHTML = "";

    
    const totalScore = Object.entries(answers)
        .filter(([category]) => category !== "Kategori10")
        .reduce((sum, [, score]) => sum + score, 0);

    const depressionCategory = getDepressionCategory(totalScore);

    const result = document.createElement("p");
    result.textContent = depressionCategory;
    resultsDiv.appendChild(result);
});

    window.resetSurvey = function () {
        currentPage = 0;
        showPage(currentPage);
        answeredQuestions = 0;
        for (const category in answers) {
            delete answers[category];
        }
        document.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
        resultsDiv.innerHTML = "";
        updateProgressBar(progressBar, 0, totalQuestions);
    };
});

function displayRandomSupport() {
    // Generate a random support message
    const messages = [
        "You're doing great!",
        "Take a deep breath and keep going!",
        "Remember, progress is progress!",
        "You've got this!",
        "Keep looking forward!",
        "Success is just around the corner!",
        "Believe in yourself!",
        "Stay positive and keep going!",
        "You are not alone <3",
        "Don't worry, you'll be fine!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return randomMessage;
}

// Insert the function's output into the <p> tag
document.getElementById("supportText").innerHTML = displayRandomSupport();

function navigateAndReset() {
    // Call resetSurvey function
    resetSurvey();

    // Redirect to the landing page
    window.location.href = "landingPage.html";
}
