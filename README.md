# 🌟 Mental Health Survey Application

## **Branch: `bagus-quiz&result`**

Branch ini dibuat untuk mengembangkan fitur dan memperbaiki elemen-elemen penting dalam aplikasi **Mental Health Survey**, yang dirancang untuk mengukur tingkat depresi berdasarkan **Patient Health Questionnaire (PHQ-9)**. seluruh Branch ini merefleksikan pekerjaan saya , Bagus Cipta Pratama (23/516539/PA/22097) dalam membangun projek secara keseluruhan . 

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

3. **🐞 [Perbaikan Bug]**
   - Memperbaiki bug pada navigasi multi-halaman yang sebelumnya menyebabkan opsi yang dipilih tidak tersimpan.
   - Memperbaiki visualisasi pilihan (highlight warna hijau) agar terlihat lebih jelas di perangkat dengan layar kecil.

---

### **🔧 Fungsi Utama**

#### 1. **📄 showPage(pageIndex)**
   - **Deskripsi:** Menampilkan halaman survei berdasarkan index.
   - **Implementasi:**
     ```javascript
     function showPage(pageIndex) {
         pages.forEach((page, index) => {
             page.classList.toggle("active", index === pageIndex);
         });
         if (pageIndex === 0 || pageIndex === 1) {
             pages[pageIndex].scrollIntoView({ behavior: "smooth" });
         }
     }
     ```

#### 2. **📈 getDepressionCategory(score)**
   - **Deskripsi:** Menghitung kategori depresi berdasarkan skor total.
   - **Implementasi:**
     ```javascript
     function getDepressionCategory(score) {
         if (score <= 4) return "Minimal Depression";
         else if (score <= 9) return "Mild Depression";
         else if (score <= 14) return "Moderate Depression";
         else if (score <= 19) return "Moderately Severe Depression";
         else return "Severe Depression";
     }
     ```

#### 3. **🔄 resetSurvey()**
   - **Deskripsi:** Mengatur ulang semua jawaban dan mengembalikan pengguna ke halaman pertama.
   - **Implementasi:**
     ```javascript
     function resetSurvey() {
         currentPage = 0;
         showPage(currentPage);
         for (const category in answers) {
             answers[category] = 0;
         }
         document.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
         resultsDiv.innerHTML = "";
     }
     ```

#### 4. **🖱️ Event Listeners**
   - Mengatur interaktivitas, seperti memilih opsi jawaban, navigasi antar halaman, dan menampilkan hasil.

---
