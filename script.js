/*Adcicona nome de operadores*/
const TimeOperadores = document.querySelector('.nomeOperador');
const mostraNomes = document.querySelector('.nomes')
const btnAddOperadores = document.querySelector('.add-Operador');
const nomesTime = [];

btnAddOperadores.addEventListener('click', (e) => {//pega o evento de click
  nomesTime.push(TimeOperadores.value)//adiciona novos valores ao array
  let novoNome = nomesTime.filter((este, i) => {  
  return nomesTime.indexOf(este) === i; //filtra se a nomes reptidos
  }).filter((i)=>{
    return i;}).join('<br>').toUpperCase();
   mostraNomes.innerHTML = `<p>${novoNome}</p>`
    TimeOperadores.value = '' //limpa o input cada vez que e adiconado um nome novo
    
    
}); 

/*Botao para adcionar ocorrencia e a mesma coisa do codigo a cima muda so que tem mas texto a ser
adcionado*/
const btnAddocorrencia = document.querySelector('.add-Ocorrencias');
const textOcorrencias = document.querySelector('.text-ocorrencias');
const addOcorrencia = document.querySelector('.Novas-Ocorrencias');
let ocorrencias = [];
btnAddocorrencia.addEventListener('click', () => {
if(ocorrencias.length > 0 && ocorrencias.length < 3 ){
  addOcorrencia.style.Color = "yellow";
}
  ocorrencias.push(textOcorrencias.value);
  let novaOcorrencia = ocorrencias.filter((este, i) => {
    return ocorrencias.indexOf(este) === i;
  }).join('<br>')
  addOcorrencia.innerHTML = `<p>${novaOcorrencia}</p>`;
  textOcorrencias.value = '';
});


// Preparadoes horario de inicio fim etc.
const tempoPadrao = {
  'OP 50': "2:00", 'OP 40': "3:00", 'OP 230¹': "5:00", 'OP 230²': "5:00", 'OP 240': "4:30"
  , 'OP 90': "1:30", 'OP 100': "1:00", 'OP 110': "1:00", 'OP 120': "1:00", 'OP 280': "1:30", 'OP 290': "1:30",
  'OP 300': "1:30", 'OP 310': "1:30", 'OP 530': "1:00", 'OP 540': "1:20", 'OP 560': "2:00", 'OP 570': "2:30",
  'OP 580': "1:30", 'OP 590': "2:30", 'OP 600': "2:20", 'OP 610': "2:20", 'OP 640': "1:40", 'OP 650': "1:30",
  'OP 660': "3:00", 'OP 670': "2:20", 'OP 690': "2:00", 'OP 700': "1:00", 'OP 705': "2:20", 'OP 710': "1:30"
}

const maquinas = ['OP 50', 'OP 40', 'OP 230¹', 'OP 230²', 'OP 240', 'OP 90', 'OP 100', 'OP 110', 'OP 120'
  , 'OP 280', 'OP 290', 'OP 300', 'OP 310', 'OP 530', 'OP 540', 'OP 560', 'OP 570', 'OP 580', 'OP 590',
  'OP 600', 'OP 610', 'OP 640 ', 'OP 650', 'OP 660', 'OP 670', 'OP 690', 'OP 700', 'OP 705',
  'OP 710'];

const selecionarMaquinas = document.querySelector('.selecionar-maquinas');
const duranteSetup = document.querySelector('#durante-setup');
let contador = 0;
let contadorNomesAdd= 0;
const addMaquinas = document.querySelector('.add-maquinas');
addMaquinas.addEventListener('click', (e) => {
  for(let vazio in nomesTime){
if ( nomesTime.length > contadorNomesAdd && nomesTime.length !== '') {
  
    const novoSelect = document.createElement('select');
    novoSelect.classList.add('selecionar-maquinas');
    novoSelect.id = `selecionar-maquinas ${contador}`
    novoSelect.options[0] = new Option('selecionar-maquinas', '');
    duranteSetup.appendChild(novoSelect);
    contador++;
    contadorNomesAdd++;
    for (let i = 0; i < maquinas.length; i++) {
      const option = new Option(maquinas[i], maquinas[i]);
      novoSelect.appendChild(option);
    }
    preparadoaMaquinas(nomesTime);
 
    /*Faz a mostra o tempo padrao de cada maquina */

    novoSelect.addEventListener('change', (e) => {
      const SelecioneMaquine = e.target.value;
      const tempoPadraoText = tempoPadrao[SelecioneMaquine];
      const tempoPadraoEl = document.querySelector('.tempo-padrao');
      const MelhorTempo = document.querySelector('.Melhor-tempo');
      MelhorTempo.innerHTML += `<p>${tempoPadraoText}</p>`;
      tempoPadraoEl.innerHTML += `<p>${tempoPadraoText}</p>`;

      // adicionar evento ao botão de adicionar tempo produção da máquina

      timeMachineNow()

    });
  
}
  }
  
});

/*Para adcionar os operadores a suas maquinas */
function preparadoaMaquinas(nomesTime, preparador) {
  const opSetuo = document.querySelector('#preparado-setup');
  novoSelect2 = document.createElement('select');
  novoSelect2.classList.add(`selecionar-preparador`);
  novoSelect2.id = `selecionar-preparador ${contador} ${preparador}`
  novoSelect2.options[0] = new Option('Preparadores', '');
  opSetuo.appendChild(novoSelect2);
 for (let i = 0; i < nomesTime.length; i++) {
    const option = new Option(nomesTime[i], nomesTime[i]);
    if(option.value !==''){
    novoSelect2.appendChild(option);
    }
  
}

  
  
  contador++
}
/*Inicio ,liberacao de maquinas */
const liberacaoInicio = document.querySelector(".inicio-liberacao");

function timeMachineNow() {
  const criaTime = document.createElement("input");
  criaTime.classList = "input-tempo";
  criaTime.type = "Time";
  liberacaoInicio.appendChild(criaTime);

  const criaTimeLiberacao = document.createElement('input');
  criaTimeLiberacao.classList = "input-tempo-final"
  criaTimeLiberacao.type = "Time"
  liberacaoInicio.appendChild(criaTimeLiberacao);


}

/*calcula o melhor tempo de cada maquina preparada*/
const divTempoAtual = document.querySelector('.tempo-atual');
const btnMelhorTempo = document.querySelector('.add-tempo');
(function calculoParaTempoAtual() {

  btnMelhorTempo.addEventListener('click', (e) => {
    const inputs = document.querySelectorAll('.input-tempo, .input-tempo-final');
    const resultados = [];


    // Agrupa os inputs em pares
    for (let i = 0; i < inputs.length; i += 2) {
      const tempoInicial = inputs[i];
      const tempoFinal = inputs[i + 1];

      // Verifica se os valores dos inputs não são vazios
      if (tempoInicial.value && tempoFinal.value) {
        // Calcula o tempo decorrido
      
        const valorTempoInicial = tempoInicial.valueAsNumber / 1000;
        const valorTempoFinal = tempoFinal.valueAsNumber / 1000;
        const calculoTempo = valorTempoFinal - valorTempoInicial;
        const horas = Math.floor(calculoTempo / 3600);
        const minutos = Math.floor((calculoTempo % 3600) / 60);
        const tempoFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  if(calculoTempo > 0){
resultados.push(tempoFormatado);
}else{
  alert('Tempo Imvalido!')
}
        

        /*Mostra a avaliacao dos operedores*/
        const avaliacao = document.querySelector('.Avaliacao')

        if (minutos >= 0 && minutos <= 59 && horas > 7 && horas >= 10) {
          avaliacao.innerHTML += `<p>&#10060;</p>`
        } else if (minutos >= 0 && minutos <= 59 && horas >= 0 && horas <= 3) {
          avaliacao.innerHTML += `<p>&#9989;</p>`
        } else if (minutos >= 0 && minutos <= 59 && horas > 3 && horas <= 7) {
          avaliacao.innerHTML += `<p>&#10071;</p>`

        }


      }

    }
    let resultadoHTML = '';
    for (let i = 0; i < resultados.length; i++) {

      resultadoHTML += `<p>${resultados[i]}</p>`;
    }
    divTempoAtual.innerHTML = resultadoHTML
  });
}());













