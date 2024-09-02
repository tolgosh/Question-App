// Sorular ve cevaplar için kullanılan veri yapısı
const questions = [
    {
        question: "Çin Seddini oluşturan taşlar birbirine ne ile tutturulmuştur?",
        options: ["Bambu Harcı", "Anne Duası", "Pirinç Unu", "Noodle"],
        answer: "Pirinç Unu",
        media: "data/cin-seddi.jpg",
    },
    {
        question: "İlk Pamuk şekeri bulan kişinin mesleği nedir?",
        options: ["Gıda Mühendisi", "Diş Doktoru", "Ev Hanımı", "Güzellik Uzmanı"],
        answer: "Diş Doktoru",
        media: "data/pamuk.jpg",
    },
    {
        question: "Tarkan'ın 'Hüp' klibini izledikten sonra gaza gelip 'Tarkan keşke beni hüpletseydi' diye açıklamda bulunan kişi kimdir?",
        options: ["Gülben Ergen", "Hülya Avşar", "Harika Avcı", "Sevtap Parman"],
        answer: "Gülben Ergen",
        media: "data/tarkan.jpg",
    },
    {
        question: "Pteronofobi nedir?",
        options: [
            "Yeşil ışık yanar yanmaz korna çalacak korkusu",
            "Fakir kalma korkusu",
            "Taksi bulamama korkusu",
            "Kuş tüyüyle gıdıklanma korkusu",
        ],
        answer: "Kuş tüyüyle gıdıklanma korkusu",
        media: "data/fobi.jpg",
    },
    {
        question: "Ortalama ömürleri 5 yıl olan Japon balıklarının en uzun yaşayanı Tish, bütün istatistikleri alt üst ederek kaç yıl boyunca hayata tutunmayı başarmıştır?",
        options: ["43", "78", "23", "99"],
        answer: "43",
        media: "data/balik.jpg",
    },
    {
        question: "90'lara damgasını vuran 'Bandıra Bandıra' şarkısının söz yazarı kimdir?",
        options: ["Sezen Aksu", "Sibel Can", "Mustafa Sandal", "Bülent Ersoy"],
        answer: "Mustafa Sandal",
        media: "data/bandira.jpg",
    },
    {
        question: "Hangi şarkıcımız yine kendisi gibi şarkıcı olan sevgilisinden ayrıldıktan sonra tam evinin karşısındaki apartmanın tamamını kendi posteriyle kaplatmıştır?",
        options: ["Hande Yener", "Hadise", "Gülşen", "Simge"],
        answer: "Hadise",
        media: "data/billboard.jpg",
    },
    {
        question: "Antik Roma'da kadınlar parfüm olarak ne kullanıyordu?",
        options: ["Gül Suyu", "Bal", "Gladyatör Teri", "Kan"],
        answer: "Gladyatör Teri",
        media: "data/parfum.jpg",
    },
    {
        question: "T-Rex'in yaşayan en yakın akrabası aşağıdakilerden hangisidir?",
        options: ["İnekler", "Tavuklar", "Timsahlar", "Köpekler"],
        answer: "Tavuklar",
        media: "data/trex.jpg",
    },
    {
        question: "Her şeyin olduğu gibi mutluluğun da fobisi varmış. Bu fobiye ne ad verilir?",
        options: ["Çerofobi", "Euphobia", "Felicifobia", "Mutluluk Korkusu"],
        answer: "Çerofobi",
        media: "data/mutluluk.jpg",
    },
];

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let questionTimer;

// Quiz'i başlatan fonksiyon
document.getElementById("start").addEventListener("click", initializeQuiz);

function initializeQuiz() {
    // Giriş ekranını gizle ve quiz ekranını göster
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    
    // İlk soruyu göster
    displayQuestion();
}

// Soruyu ekrana getiren fonksiyon
function displayQuestion() {
    // Tüm sorular bittiğinde quiz'i sonlandır
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    
    // Soru ve seçenekleri ekrana yerleştir
    document.getElementById("media").src = currentQuestion.media;
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("options").innerHTML = '';
    document.getElementById("options").classList.add("hidden"); // Şıkları başlangıçta gizle

    // Seçenekleri buton olarak oluştur
    currentQuestion.options.forEach(option => {
        let btn = document.createElement("button");
        btn.classList.add("btn", "btn-outline-primary", "list-group-item");
        btn.textContent = option;
        btn.addEventListener("click", () => evaluateAnswer(option));
        document.getElementById("options").appendChild(btn);
    });

    // Zamanlayıcıyı başlat
    startTimer();
}

// Sorunun zamanlayıcısını başlatan fonksiyon
function startTimer() {
    document.getElementById("time").textContent = 30;
    let timeLeft = 30;
    
    questionTimer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        // İlk 4 saniyeden sonra seçenekleri göster
        if (timeLeft === 26) {
            document.getElementById("options").classList.remove("hidden");
        }

        // Zaman bittiğinde yanlış cevap sayısını artır ve sonraki soruya geç
        if (timeLeft <= 0) {
            clearInterval(questionTimer);
            incorrectAnswersCount++;
            nextQuestion();
        }
    }, 1000);
}

// Cevabın doğru olup olmadığını kontrol eden fonksiyon
function evaluateAnswer(selectedOption) {
    clearInterval(questionTimer);

    if (selectedOption === questions[currentQuestionIndex].answer) {
        correctAnswersCount++;
    } else {
        incorrectAnswersCount++;
    }
    
    nextQuestion();
}

// Bir sonraki soruya geçiş yapan fonksiyon
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// Quiz'in bitiş ekranını gösteren fonksiyon
function endQuiz() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("correct").textContent = correctAnswersCount;
    document.getElementById("incorrect").textContent = incorrectAnswersCount;
}
