const scoreEl = getElement("#score");
const operatorEl = getElement(".operator");
const levelEl = getElement(".level");
const resultEl = getElement("#result");
const quizzStatementEl = getElement("#quiz-statement");
const quizzFormEl = getElement(".quiz-form");
const answerEl = getElement("#answer");
const spanOperator = getElement(".selectedOperator");
const spanLevel = getElement(".selectedLevel");


const data = {
    num1 : 1,
    num2 : 2
};


function getElement(selector) {
    return document.querySelector(selector);
}

// event click sur le bloc qui a la class operator pour recup les values
operatorEl.addEventListener("click", ({target: {value, tagName}}) => {

    if (tagName !== "BUTTON") {
        return;
    }

    // on rajoute une clé valeur à l'obj data
    data.operator = value;   
    spanOperator.innerHTML = value; 
});

levelEl.addEventListener("click", ({target: {value, tagName}}) => {

    if (tagName !== "BUTTON") {
        return;
    }
    
    spanLevel.innerHTML = value;
    
    data.level = value;
    data.num1 = getNumberByLevel(data.level);    
    data.num2 = getNumberByLevel(data.level);
    displayStatement();
});

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

Object.keys(operations)

function getOperation(operator) {
    const defaultFn = () => NaN
    const validOperators = Object.keys(operations)

    if (!validOperators.includes(operator)) {
        return defaultFn
    }
    return operations[operator]
}

quizzFormEl.addEventListener("submit", (event) => {

    event.preventDefault();
    const answer = Number(answerEl.value);

    const operation = getOperation(data.operator);
    const result = operation(data.num1, data.num2);
    const isRight = answer === result;

    const feedback = isRight ? "So cool !!!!" : "Too bad... :(";
    resultEl.innerHTML = feedback;
    
    resultEl.classList.toggle('success', isRight);
    resultEl.classList.toggle('error', !isRight);
    
})