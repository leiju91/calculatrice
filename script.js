const scoreEl = getElement("#score");
const operatorEl = getElement(".operator");
const levelEl = getElement(".level");
const resultEl = getElement("#result");
const quizzStatementEl = getElement("#quiz-statement");
const quizzFormEl = getElement(".quiz-form");
const answerEl = getElement("#answer");
const spanOperator = getElement(".selectedOperator");
const spanLevel = getElement(".selectedLevel");
const goodAnswersEl = getElement("#goodAnswers");
const questionsEl = getElement("#questions");
const maxQuestions = 10;

const score = {
    goodAnswers : 0,
    questions : 0
};


const data = {
    num1 : 1,
    num2 : 2,
    operator: '+',
    level: 1
};


function getElement(selector) {
    return document.querySelector(selector);
}

// event click sur le bloc qui a la class operator pour recup les values
operatorEl.addEventListener("click",({ target }) => {

    if (target.tagName !== "BUTTON") {        
        return;
    }
 
    // Select ts les btn qui on la classe small-btn et active
    const activeButton = operatorEl.querySelector('.small-btn.active');
    console.log(activeButton); //null

    // S'il y a un boutton avec .active, alors on la retire
    activeButton ? activeButton.classList.remove("active") : '';

    // Ajoute la classe .active au bouton sur lequel on a cliqué
    if (target.matches('button.small-btn')) {
        target.classList.add("active");
    }

    // on rajoute une clé valeur à l'obj data
    data.operator = target.value;   
    getRandomNumbersByLevel();
});

levelEl.addEventListener("click", ({target: {value, tagName}}) => {

    if (tagName !== "BUTTON") {
        return;
    }
        
    data.level = value;
    getRandomNumbersByLevel();
    
});

function getRandomNumbersByLevel() {
    data.num1 = getNumberByLevel(data.level);    
    data.num2 = getNumberByLevel(data.level);
    spanOperator.innerHTML = data.operator;
    spanLevel.innerHTML = data.level;
    
    displayStatement();
}

const levels = {
    0:0,
    1:10,
    2:100,
    3:1000,
    4:10000,
    4:10000,
    5:100000
};

//5_on crée une fonction pour obtenir le numéro par niveau
function getNumberByLevel(level) {
    const min = levels["" + level - 1];
    const max = levels[level];
    return getRandomNumber(min, max);
}

//6_On renvoie un nombre aléatoire entre une valeur min (incluse)
// et une valeur max (exclue)
function getRandomNumber(min, max) {
    //renvoie un nbre arondi
    return Math.ceil(Math.random() * (max - min) + min);
}

function displayStatement() {
    quizzStatementEl.innerHTML = `${data.num1} ${data.operator} ${data.num2}`;
}

const operations = {
    'x': (a, b) => a * b,
    '/': (a, b) => a / b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
}

function getOperation(operator) {
    const defaultFn = () => NaN
    const validOperators = Object.keys(operations);

    if (!validOperators.includes(operator)) {
        return defaultFn
    }
    return operations[operator]
}

quizzFormEl.addEventListener("submit", (event) => {

    event.preventDefault();
    const answer = Number(answerEl.value);
    answerEl.value = "";

    const operation = getOperation(data.operator);
    console.log(operation);
    const result = operation(data.num1, data.num2);
    const isRight = answer === result;

    const feedback = isRight ? "So cool :)" : "Too bad... try again :(";
    resultEl.innerHTML = feedback;
    
    resultEl.classList.toggle('success', isRight);
    resultEl.classList.toggle('error', !isRight);

    questionsEl.innerHTML = ++score.questions;
    if (isRight) {
        goodAnswersEl.innerHTML = ++score.goodAnswers;
    }
})

getRandomNumbersByLevel();

