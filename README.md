# 🌟 Mental Health Survey Application

## **Branch: `bagus-quiz&result`**

Branch ini dibuat oleh **Bagus Cipta Pratama** dengan **NIM 23/516539/PA/22097**, yang merefleksikan seluruh pekerjaannya dalam membangun dan mengembangkan proyek **Mental Health Survey Application**. Proyek ini dirancang untuk mengukur tingkat depresi berdasarkan **Patient Health Questionnaire (PHQ-9)**. Semua fitur yang ada dalam branch ini mencerminkan hasil pemikiran, implementasi, dan pengujian yang telah dilakukan secara menyeluruh.

---

### **📌 Deskripsi Fitur atau Perubahan**

1. **📝 [Survey Multi-Halaman]**
   - Survei dibagi menjadi beberapa halaman untuk meningkatkan kenyamanan pengguna.
   - **Fitur:**
     - Pertanyaan berbasis skala (0–3) yang relevan dengan penilaian depresi.
     - Navigasi antar halaman menggunakan tombol **Next**.
     - Setiap tombol ketika dipencet akan langsung **scroll** ke pertanyaan berikutnya di bawah.
     - Desain responsif untuk pengalaman pengguna yang lebih baik di berbagai perangkat.
   - **Implementasi:**
     - Navigasi menggunakan JavaScript untuk mengatur state halaman.
     - **Smooth scrolling** dengan memanfaatkan properti `scrollIntoView`.

2. **📊 [Hasil Survei Dinamis]**
   - Menampilkan hasil akhir berdasarkan skor survei.
   - **Fitur:**
     - Mengkalkulasi total skor berdasarkan jawaban pengguna.
     - Memberikan kategori depresi, seperti:
       - Minimal Depression.
       - Mild Depression.
       - Moderate Depression.
       - Moderately Severe Depression.
       - Severe Depression.
     - Tombol **Restart** untuk memulai ulang survei.
   - **Implementasi:**
     - Fungsi `getDepressionCategory(score)` dalam `script.js`.
     - Rendering hasil pada halaman terakhir (`page-3`).

---

### **🖱️ Event Listeners**

#### **1. Event Listener untuk Tombol "Next"**
**Deskripsi:** Mengatur navigasi antar halaman saat tombol "Next" ditekan.

```javascript
nextPageButton.addEventListener("click", function() {
    if (currentPage < pages.length - 1) {
        currentPage++; // Pindah ke halaman berikutnya
        showPage(currentPage); // Tampilkan halaman yang sesuai
    }
});
```

---

#### **2. Event Listener untuk Tombol "Lihat Hasil"**
**Deskripsi:** Menampilkan hasil survei berdasarkan skor jawaban pengguna.

```javascript
calculateResultsButton.addEventListener("click", function() {
    showPage(pages.length - 1); // Tampilkan halaman hasil
    resultsDiv.innerHTML = ""; // Bersihkan hasil sebelumnya

    // Iterasi setiap kategori skor dalam objek 'answers'
    for (const [category, score] of Object.entries(answers)) {
        const depressionCategory = getDepressionCategory(score); // Hitung kategori depresi
        const result = document.createElement("p"); // Buat elemen untuk hasil
        result.textContent = `Anda mengalami ${depressionCategory}`; // Isi hasil
        resultsDiv.appendChild(result); // Tambahkan hasil ke halaman
    }
});
```

---

#### **3. Event Listener untuk Setiap Opsi Jawaban**
**Deskripsi:** Menyimpan jawaban pengguna dan memberikan efek visual pada opsi yang dipilih.

```javascript
document.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", function() {
        const question = this.closest(".question"); // Temukan elemen pertanyaan
        const category = question.getAttribute("data-category"); // Ambil kategori pertanyaan
        const value = parseInt(this.getAttribute("data-value")); // Ambil nilai jawaban

        answers[category] = (answers[category] || 0) + value; // Tambahkan skor ke kategori

        // Hapus highlight pilihan sebelumnya dan tambahkan highlight pada pilihan baru
        question.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");

        // Gulir ke bawah secara smooth
        window.scrollBy({ top: 300, behavior: "smooth" });
    });
});
```

---
