import questoes from "./questions.js";

let index             = 0;
let points            = 0; //Cada resposta certa equivale a um ponto
let qtyAnswers        = questoes.length - 1;
let currentResponse   = []; //Salva a última resposta selecionada pelo usuário, fazendo com que o usuário possa selecionar mais de uma

//Carrega as questões
function loadQuestion() {
    const currentQuestion  = document.querySelector('.current-question');
    const qtdQuestions     = document.querySelector('.qtd-questions');
    const titleQuestion    = document.querySelector('.title-question');
    const options          = document.querySelectorAll('.item-option');
    const btnNext          = document.querySelector('.btn-next');

    if(index === qtyAnswers) {
        btnNext.textContent = "FINALIZAR";
    }

    //Esconde o botão de próximo até selecionar alguma resposta
    btnNext.style.display = "none";

    //Adiciona os elementos que identificam a questão atual ex: (1 de 4)
    currentQuestion.textContent = index + 1;
    qtdQuestions.textContent    = qtyAnswers + 1;

    //Adiciona o título da pergunta atual
    titleQuestion.textContent = questoes[index].question;

    //Adiciona as opções de resposta da pergunta atual
    options.forEach((element, indexOptions) => {
        //console.log(('Element: ') + element.textContent, (' Iteracao: ') + indexOptions + (' Opcao: ') + questoes[index].answers[indexOptions].text)
        element.textContent = questoes[index].answers[indexOptions].text;
    })

    //Salva a resposta selecionada
    saveResponse();
}

function saveResponse() {
    const btnNext = document.querySelector('.btn-next');
    const options = document.querySelectorAll('.item-option');
    const footer  = document.querySelector('.footer-perguntas');
    options.forEach((element) => {
        //Marca e salva a resposta selecionada
        element.addEventListener('click', () => {
            resetStyleResponse();
            element.classList.add('response-selected');
            btnNext.style.display = "flex";
            footer.classList.add('justify-content-end');
            
            currentResponse = [element.textContent];
        });
    })
}

function nextQuestion() {
    const btnNext          = document.querySelector('.btn-next');
    //Vai para a próxima questão
    btnNext.addEventListener('click', () => {
        console.log('Index: ' + index + ' questao: ' + qtyAnswers);
        resetStyleResponse();
        checkAnswer(currentResponse);
        if (index === qtyAnswers) {
            console.log('Ultima: Index: ' + index + ' questao: ' + qtyAnswers);   
            showResult();
        }else {
            index ++
            main()
        }
    });
}

//Limpa o estilo da resposta quando está selecionada
function resetStyleResponse () {
    const responses = document.querySelectorAll('.item-option');
    responses.forEach((element) => {
        element.classList.remove('response-selected');
    })
}

function showResult() {
    const sectionQuestions = document.querySelector('.section-question');
    const sectionResults   = document.querySelector('#results');
    const successes        = document.querySelector('.successes');
    const successesPercent = document.querySelector('.percent-successes span');
    const qtdQuestions     = document.querySelector('span.qty-questions');

    const questionsTotals = qtyAnswers + 1
    const percent = Math.round((points / questionsTotals)*100);

    sectionQuestions.style.display = "none";
    sectionResults.style.display = "flex";

    qtdQuestions.innerHTML       = qtyAnswers + 1;
    successes.textContent        = points;
    successesPercent.textContent = percent;
}

function checkAnswer(responseSelected) {
    const answerCorrect = questoes[index].answers;
    console.log('Questao atual: ' + questoes[index].question)

    for (let i = 0; i < answerCorrect.length; i++) {
        if (answerCorrect[i].correct === true) {
            console.log('Correta: ' + answerCorrect[i].text);

            if (answerCorrect[i].text.toString() === responseSelected.toString()) {
                console.log('A resposta está certa! Resposta certa: ' + answerCorrect[i].text + '. A resposta selecionada foi: ' + responseSelected);
                points++;
                console.log('1 ponto foi adicionado, total de: ' + points);
            } else {
                console.log('A resposta está errada! A resposta certa é: ' + answerCorrect[i].text + '. A resposta selecionada foi: ' + responseSelected);
            }
            break; // Saia da função após processar a resposta
        }
    }
}

function btnAgain() {
    const btnAgain = document.querySelector('.btn-again');
    btnAgain.addEventListener('click', () => {
        location.reload()
    });
}

function main() {
    loadQuestion(index);
}

main()
nextQuestion();
btnAgain();

