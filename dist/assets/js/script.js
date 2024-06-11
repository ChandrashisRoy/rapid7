// Define the quiz questions, answers, and their points
const questions = [
  {
    image: "assets/images/rapid7-assessment-first.png",
    question: "What best describes your cloud infrastructure?",
    answers: [
      { text: "Multi-cloud", points: 3 },
      { text: "Public cloud", points: 2 },
      { text: "Hybrid cloud", points: 1 },
      { text: "Private cloud", points: 0 },
      { text: "No cloud resources", points: 0 },
    ],
  },
  {
    image: "assets/images/rapid7-assessment-second.png",
    question: "What are your plans for cloud adoption?",
    answers: [
      { text: "Migrate into new cloud environments", points: 3 },
      { text: "Expand existing cloud resources", points: 2 },
      { text: "No change", points: 1 },
      { text: "Reduce use of cloud", points: 0 },
    ],
  },
  {
    image: "assets/images/rapid7-assessment-third.png",
    question: "What cloud security tools do you use?",
    answers: [
      { text: "A cohesive set of third-party and native tools", points: 0 },
      { text: "Too many tools and alerts to keep track of", points: 1 },
      { text: "Only native tools from my cloud service provider", points: 2 },
      { text: "I do not have any tools specifically for the cloud", points: 3 },
    ],
  },
  {
    image: "assets/images/rapid7-assessment-fourth.png",
    question: "How many data breaches have you experienced in the last year?",
    answers: [
      { text: "Multiple breaches", points: 3 },
      { text: "One breach", points: 2 },
      { text: "Attacks, but no successful breaches", points: 1 },
      { text: "No breaches or close calls", points: 0 },
    ],
  },
  {
    image: "assets/images/rapid7-assessment-fifth.png",
    question: "What does your cloud security team look like?",
    answers: [
      { text: "A full internal team for cloud security", points: 0 },
      { text: "An external MSP with cloud expertise", points: 1 },
      { text: "A cybersecurity team with a cloud specialist", points: 2 },
      { text: "No one dedicated specifically to cloud security", points: 3 },
    ],
  },
  {
    image: "assets/images/rapid7-assessment-sixth.png",
    question: "How much visibility do you have into your cloud environment?",
    answers: [
      { text: "Unified, real-time visibility into every environment", points: 0 },
      { text: "Siloed visibility, through different apps and alerts", points: 1 },
      { text: "Limited data and monitoring across the cloud", points: 2 },
      { text: "Complete blind spots with opaque containers", points: 3 },
    ],
  },
  {
    image: "assets/images/rapid7-assessment-seventh.png",
    question: "What best describes your remediation workflows?",
    answers: [
      { text: "Continuous monitoring and automated remediation", points: 0 },
      { text: "Some automated responses to incidents", points: 1 },
      { text: "Manual analysis and ticketing efforts", points: 2 },
      { text: "No official remediation workflows", points: 3 },
    ],
  },
];

let currentQuestion = 0;
let totalPoints = 0;

const coverContainer = document.getElementById("cover-container");
const questionContainer = document.getElementById("question-container");

const startBtn = document.getElementById("start-btn");
const quizForm = document.getElementById("quiz-form");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resultsContainer = document.getElementById("results-container");
const answerErrorDiv = document.getElementById("answer-error");

const imageContainer = document.getElementById("image-container");
const questionTextContainer = document.getElementById("question-text-container");

//const quizContainer = document.getElementById("quiz-container");

showQuestion();

function showQuestion() {
  const currentQues = questions[currentQuestion];
  const answersHtml = currentQues.answers
    .map((answer, index) =>
      `<div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" name="answer" value="${index}">${answer.text}
        </label>
      </div>`
    )
    .join("");

    // Display the image for the current question
    imageContainer.innerHTML = `<img src="${questions[currentQuestion].image}" alt="Question ${currentQuestion + 1}" class="img-fluid">`;

    // Display the question text
    questionTextContainer.innerHTML = `
        <img src="assets/images/orangebar.png" class="orangebarnew" alt="orangebar">
        <h1 class="text-start section_head">${currentQues.question}</h1>
        <p class="text-start subsection_text">${answersHtml}</p>
    `;

    if (currentQuestion === questions.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
        submitBtn.textContent = "Submit"; // Change the label to "Submit" for the last question
      } else {
        nextBtn.style.display = "block";
        submitBtn.style.display = "none";
      }

}

function handleNextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  
    if (!selectedAnswer) {
      answerErrorDiv.textContent = "Please select one answer.";
      return;
    } else {
      answerErrorDiv.textContent = "";

      const selectedAnswerText = questions[currentQuestion].answers[Number(selectedAnswer.value)].text;
      const currentQuestionText = questions[currentQuestion].question;
      sendEvent("QuestionAnswer", "AnswerSelected", `${currentQuestionText} | ${selectedAnswerText}`);
    }
    
    totalPoints += questions[currentQuestion].answers[Number(selectedAnswer.value)].points;
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
      }
}

nextBtn.addEventListener("click", handleNextQuestion);
submitBtn.addEventListener("click", handleSubmit);

function calculateResult() {
    if (totalPoints === 0) {
      return "No Risk";
    } else if (totalPoints >= 1 && totalPoints <= 6) {
      return "Low Risk";
    } else if (totalPoints >= 7 && totalPoints <= 14) {
      return "Medium Risk";
    } else if (totalPoints >= 15 && totalPoints <= 21) {
      return "High Risk";
    } else {
      return "Invalid Result";
    }
}

/* Image URLs for each risk level
const riskImages = {
    "No Risk": "assets/images/rapid7-assessment-result-no.png",
    "Low Risk": "assets/images/rapid7-assessment-result-low.png",
    "Medium Risk": "assets/images/rapid7-assessment-result-mid.png",
    "High Risk": "assets/images/rapid7-assessment-result-high.png",
};
*/

// Define multiple results with their respective texts, images, and buttons
const results = [
    {
        header: "High Risk",
        text: "To ensure you can gain all the benefits of the cloud without exposing your organization to increased risk, you will need to invest in a cloud security solution. Rapid cloud adoption without the appropriate security measures may open you up to attacks and data breaches.<br><br> Rapid7’s Cloud Risk Complete is an essential resource to reduce your risk with real-time visibility, risk prioritization, and automated cloud compliance. Sign up for a more in-depth assessment",
        image: "assets/images/rapid7-assessment-result-high.png",
        buttonText: "Get Your AWS Cloud Risk Assessment Today",
        buttonURL: "https://aws.amazon.com/marketplace/pp/prodview-m5thpducqv6uu",
    },
    {
        header: "Medium Risk",
        text: "While the foundation for a strong security program is starting to form, you have an opportunity to make your cloud security stronger. You need more advanced protection to manage risks and threats.<br><br> Rapid7’s Cloud Risk Complete can help improve your security program with real-time visibility, risk prioritization, and automated cloud compliance. Sign up for a more in-depth assessment",
        image: "assets/images/rapid7-assessment-result-mid.png",
        buttonText: "Get Your AWS Cloud Risk Assessment Today",
        buttonURL: "https://aws.amazon.com/marketplace/pp/prodview-m5thpducqv6uu",
    },
    {
        header: "Low Risk",
        text: "You seem to be adopting a lot of the right strategies. While there is always room for improvement, you are taking a cautious and calculated approach to the cloud.<br><br> As your cloud security strategy continues to evolve, Rapid7’s Cloud Risk Complete could help. See how you could reduce risk with real-time visibility, risk prioritization, and automated cloud compliance",
        image: "assets/images/rapid7-assessment-result-low.png",
        buttonText: "Discover Cloud Risk Complete ",
        buttonURL: "https://www.rapid7.com/solutions/unified-cloudsec-vm-appsec/?utm_medium=content-trac[…]m_campaign=gc-crc&utm_content=AWS-Assessment&utm_meta=gc10114",
    },
    {
        header: "No Risk",
        text: "For now, this assessment may not be right for you. The cloud enables teams to accelerate innovation and provides flexibility and increased efficiency that could help drive your business forward. Once you have developed your first cloud strategy, Rapid7 is here to help you reduce risk and automate compliance.",
        image: "assets/images/rapid7-assessment-result-no.png",
        buttonText: "Learn More",
        buttonURL: "https://www.rapid7.com/solutions/unified-cloudsec-vm-appsec/?utm_medium=content-trac[…]m_campaign=gc-crc&utm_content=AWS-Assessment&utm_meta=gc10114 ",
    },
];

function calculateResultIndex() {
    if (totalPoints === 0) {
      return 3; // No Risk Result index
    } else if (totalPoints >= 1 && totalPoints <= 6) {
      return 2; // Low Risk Result index
    } else if (totalPoints >= 7 && totalPoints <= 14) {
      return 1; // Medium Risk Result index
    } else if (totalPoints >= 15 && totalPoints <= 21) {
      return 0; // High Risk Result index
    } else {
      return -1; // Invalid Result index (if totalPoints are not within the expected range)
    }
}

function showResult() {
    const resultIndex = calculateResultIndex();
    const result = results[resultIndex];

    // Track which result is shown
    sendEvent("QuizResult", "ResultShown", `Result | ${result.header}`);

    // Update result image
    const resultImageDiv = document.getElementById("result-image");
    resultImageDiv.innerHTML = `<img src="${result.image}" alt="${result.header}" class="img-fluid" style="margin-top: 25px">`;

    // Update result details (header, text, and button)
    const resultDetailsDiv = document.getElementById("result-details");
    resultDetailsDiv.innerHTML = `
      <img src="assets/images/orangebar.png" class="orangebarnew" alt="orangebar">
      <h1 class="text-start section_head">${result.header}</h1>
      <p class="text-start subsection_text">${result.text}</p>
    `;

    const resultButtonDiv = document.getElementById("outsource");

    // Track the button text
    sendEvent("QuizResultButton", "ButtonShown", `Button | ${result.header} | ${result.buttonText}`);
    
    resultButtonDiv.innerHTML= `<a href="${result.buttonURL}" class="next_button text-uppercase">${result.buttonText}</a>`;

    questionContainer.style.display = "none";
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
    resultsContainer.style.display = "block";
}

function handleSubmit() {

    if (!validateAnswer()) {
      // If no answer is selected, show an alert or an error message to prompt the user to select an answer
      answerErrorDiv.textContent = "Please select one answer.";
      return;
    }

    quizForm.style.display = "none";
    submitBtn.style.display = "none";
    showResult();
    submitBtn.style.display = "none"; // Hide the submit button after showing the results

    // Send analytics event for the last selected answer
    const lastSelectedAnswer = questions[currentQuestion].answers[Number(document.querySelector('input[name="answer"]:checked').value)].text;
    const lastSelectedQuestion = questions[currentQuestion].question;
    sendEvent("QuestionAnswer", "AnswerSelected", `${lastSelectedQuestion} | ${lastSelectedAnswer}`);

}

// Add a function to validate if any answer has been selected
function validateAnswer() {
    const answerInputs = document.querySelectorAll("input[type='radio']:checked");
    return answerInputs.length > 0;
}