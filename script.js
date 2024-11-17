
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
                console.warn(`Pertanyaan dengan kategori "${category}" belum dijawab.`);
                allAnswered = false;
            }
        });
    
        if (!allAnswered) {
            alert("Harap jawab semua pertanyaan di halaman ini sebelum melanjutkan!");
        }
    
        return allAnswered;
    }

    function updateProgressBar(pBar, answered, total) {
        const percentage = Math.min((answered / total) * 100, 100); // Hitung persentase
        const progressFill = pBar.querySelector(".progress__fill");
        const progressText = pBar.querySelector(".progress__text");

        // Perbarui tampilan progress bar
        progressFill.style.transition = "width 0.5s ease-out";
        progressFill.style.width = `${percentage}%`;

        // Ubah teks progress ke angka yang benar
        progressText.textContent = `${Math.round(percentage)}%`;
    }

    function resetProgressBar() {
        const progressFill = progressBar.querySelector(".progress__fill");
        const progressText = progressBar.querySelector(".progress__text");

        // Reset width dan teks ke 0% tanpa animasi
        progressFill.style.transition = "none"; // Hindari animasi saat reset
        progressFill.style.width = "0%"; // Reset lebar progress bar
        progressText.textContent = "0%"; // Reset teks ke 0%
    }

    window.resetSurvey = function () {
        currentPage = 0; // Reset halaman ke halaman pertama
        answeredQuestions = 0; // Reset jumlah pertanyaan yang sudah dijawab
        for (const category in answers) {
            delete answers[category]; // Hapus jawaban sebelumnya
        }

        // Hapus seleksi jawaban sebelumnya
        document.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));

        // Reset hasil dan progress bar
        resultsDiv.innerHTML = ""; // Kosongkan hasil
        resetProgressBar(); // Pastikan progress bar direset ke 0%

        // Tampilkan halaman pertama
        showPage(currentPage);
    };

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

        function getDepressionCategory(score) {
            if (score <= 4) return "Minimal Depression";
            else if (score <= 9) return "Mild Depression";
            else if (score <= 14) return "Moderate Depression";
            else if (score <= 19) return "Moderately Severe Depression";
            else return "Severe Depression";
        }

        showPage(pages.length - 1);
        resultsDiv.innerHTML = "";

        const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);

        const depressionCategory = getDepressionCategory(totalScore);

        const result = document.createElement("p");
        result.textContent = `Anda mengalami ${depressionCategory}`;
        resultsDiv.appendChild(result);
    });
});
