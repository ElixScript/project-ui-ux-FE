document.addEventListener("DOMContentLoaded", function() {
    const pages = document.querySelectorAll(".page");
    const nextPageButton = document.getElementById("nextPage");
    const calculateResultsButton = document.getElementById("calculateResults");
    const resultsDiv = document.getElementById("results");
    let currentPage = 0;
    const answers = {};

    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.classList.toggle("active", index === pageIndex);
        });

        // jika halaman satu dan dua langsung keatas sebagai default 
        if (pageIndex === 0 || pageIndex === 1) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    document.querySelectorAll(".option").forEach(button => {
        button.addEventListener("click", function() {
            const question = this.closest(".question");
            const category = question.getAttribute("data-category");
            const value = parseInt(this.getAttribute("data-value"));
            answers[category] = (answers[category] || 0) + value;
    
            question.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");

            window.scrollBy({ top: 300, behavior: "smooth" });
        });
    });
    

    nextPageButton.addEventListener("click", function() {
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    calculateResultsButton.addEventListener("click", function() {
    function getDepressionCategory(score) {
        if (score <= 4) return "Minimal Depression";
        else if (score <= 9) return "Mild Depression";
        else if (score <= 14) return "Moderate Depression";
        else if (score <= 19) return "Moderately Severe Depression";
        else return "Severe Depression";
    }

    calculateResultsButton.addEventListener("click", function() {
        showPage(pages.length - 1);
        resultsDiv.innerHTML = "";
        for (const [category, score] of Object.entries(answers)) {
            const result = document.createElement("p");
            const depressionCategory = getDepressionCategory(score);
            result.textContent = `anda mengalami ${depressionCategory}`;
            resultsDiv.appendChild(result);
        }
        });

    });

    window.resetSurvey = function() {
        currentPage = 0;
        showPage(currentPage);
        // Reset semua jawaban
        for (const category in answers) {
            answers[category] = 0;
        }
        // Menghapus kelas 'selected' dari semua opsi jawaban
        document.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
        resultsDiv.innerHTML = "";
    };
    
    
});
