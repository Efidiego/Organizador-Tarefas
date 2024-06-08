const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaCard() {
    const div = document.createElement('div');
    div.classList.add('card-tarefa');
    return div;
}

inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

function criaBotaoApagar(card) {
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    card.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const card = criaCard();
    const tarefaTexto = document.createElement('span');
    tarefaTexto.innerText = textoInput;
    card.appendChild(tarefaTexto);
    tarefas.appendChild(card);
    inputTarefa.value = '';
    inputTarefa.focus();
    criaBotaoApagar(card);
    salvarTarefas();
}

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const cardsTarefas = document.querySelectorAll('.card-tarefa');
    const listaDeTarefas = [];

    for (let card of cardsTarefas) {
        let tarefaTexto = card.querySelector('span').innerText;
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    if (tarefas) {
        const listaDeTarefas = JSON.parse(tarefas);
        for (let tarefa of listaDeTarefas) {
            criaTarefa(tarefa);
        }
    }
}

adicionaTarefasSalvas();
