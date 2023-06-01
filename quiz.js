var currentQuestion = 0;
var timeLeft = 60;
var score = 0;

var questions = [
    {
      question: "Què mostrarà?: NaN, 15, 105",
      answers: ["NaN", "15", "105"],
      correctAnswer: 2,
      image: "imatgesquiz/1.png"
    },
    {
      question: "Aquest codi funciona?",
      answers: ["Sí i mostra 10", "Sí i mostra 25", "No"],
      correctAnswer: 0,
      image: "imatgesquiz/2.png"
    },
    {
      question: "Aquest codi funciona?",
      answers: ["No", "Sí i mostra: 7", "Sí i mostra: 52"],
      correctAnswer: 2,
      image: "imatgesquiz/3.png"
    },
    {
      question: "Quin valor mostrarà alert?",
      answers: ["1", "5", "0"],
      correctAnswer: 2,
      image: "imatgesquiz/4.png"
    },
    {
      question: "Aquest codi funciona?",
      answers: ["No", "Sí i mostra 0", "Sí i mostra 12"],
      correctAnswer: 0,
      image: "imatgesquiz/5.png"
    },
    {
      question: "Quin valor mostra?",
      answers: ["true", "2 €", "10 €"],
      correctAnswer: 1,
      image: "imatgesquiz/6.png"
  
    },
    {
      question: "Quin valor mostra alert?",
      answers: ["8", "6", "5"],
      correctAnswer: 0,
      image: "imatgesquiz/7.png"
    },
    {
      question: "Què mostrarà per pantalla?",
      answers: ["Volvo Saab Ford", "Saab Ford", "Ford"],
      correctAnswer: 1,
      image: "imatgesquiz/8.png"
    },
    {
      question: "Què mostrarà a la pantalla?: Juanito, Maria, Juanito Maria",
      answers: ["Juanito", "Maria", "Juanito Maria"],
      correctAnswer: 1,
      image: "imatgesquiz/9.png"
    },
    {
      question: "Què mostrarà l'alert?: L1, L2, demo2",
      answers: ["L1", "L2", "demo2"],
      correctAnswer: 1,
      image: "imatgesquiz/10.png"
    },
  ];
  function updateTimer() {
    var timerElement = document.getElementById("timer");
    timerElement.textContent = timeLeft;
  
    if (timeLeft === 0) {
    } else {
      timeLeft--;
      setTimeout(updateTimer, 1000); 
    }
  }
  
  function updateTimer() {
    var timerElement = document.getElementById("timer");
    timerElement.textContent = timeLeft;
  
    if (timeLeft === 0) {
      // El tiempo se ha acabado, puedes realizar alguna acción aquí si quieres
    } else {
      timeLeft--;
      setTimeout(updateTimer, 1000); // Actualizar el contador cada segundo
    }
  }
  
  function showQuestion() {
    var question = questions[currentQuestion];
    var questionElement = document.getElementById("question");
    var imageElement = document.getElementById("questionImage");
    var answers = document.getElementsByClassName("answerButton");
  
    questionElement.textContent = question.question;
    imageElement.src = question.image;
  
    for (var i = 0; i < answers.length; i++) {
      answers[i].textContent = question.answers[i];
      answers[i].style.backgroundColor = ""; // Reiniciar el color de fondo
      answers[i].addEventListener("click", handleAnswer);
    }
  }
  
  function handleAnswer(event) {
    var selectedAnswer = event.target;
    var question = questions[currentQuestion];
  
    if (selectedAnswer.textContent === question.answers[question.correctAnswer]) {
      score += 5;
      selectedAnswer.style.backgroundColor = "green";
    } else {
      score -= 5;
      selectedAnswer.style.backgroundColor = "red";
    }
  
    var scoreElement = document.getElementById("score");
    scoreElement.textContent = score;
  
    var answers = document.getElementsByClassName("answerButton");
    for (var i = 0; i < answers.length; i++) {
      answers[i].removeEventListener("click", handleAnswer);
    }
  
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(function() {
        resetAnswerButtons();
        showQuestion();
      }, 1000);
    } else {
      // Fin del cuestionario
      setTimeout(showResults, 1000);
    }
  }
  
  function resetAnswerButtons() {
    var answers = document.getElementsByClassName("answerButton");
    for (var i = 0; i < answers.length; i++) {
      answers[i].style.backgroundColor = "";
    }
  }
  
  function showResults() {
    // Mostrar ventana emergente con los resultados
    var finalScore = document.getElementById("score").textContent;
    var message = "Ja has completat les 10 preguntes del questionari, la teva puntuació final és: " + finalScore;
    alert(message);
  }
  
  function startQuiz() {
    var instructionsContainer = document.getElementById("instructions");
    var quizContainer = document.getElementById("quizContainer");
  
    instructionsContainer.style.display = "none";
    quizContainer.style.display = "block";
  
    updateTimer();
    showQuestion();
  }
  
  var startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startQuiz);