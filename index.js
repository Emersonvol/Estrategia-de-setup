/* troca de tipos*/
const tipo1 = document.querySelector('.tp1').value
const tipo2 = document.querySelector('.tp2').value
const tipoPosterior = document.querySelector('.secao__troca__posterior')
const tipoAnterior = document.querySelector('.secao__troca__anterior')
tipoAnterior.addEventListener('click', (e) => {
  if (tipoAnterior.value === tipo2) {
    tipoPosterior.innerHTML = `<option>${tipo1}</option>`
  } else {
    tipoPosterior.innerHTML = `<option>${tipo2}</option>`
  }
})
/*para os tres botoes equipe, organizacao, quadro de avisos*/
const btnTime = document.querySelector('.Organizacao__botoa-Equipe')
const btnOrganizacao = document.querySelector('.Organizacao__botoa-Organizacao')
const btnQuadro = document.querySelector('.Organizacao__botoa-Quadro')
btnTime.addEventListener('click', () => {
  retornaBtnTime()
})
btnOrganizacao.addEventListener('click', () => {
  retornaBtnOrganizacao()
})
btnQuadro.addEventListener('click', () => {
  retornaBtnQuadro()
})
const Organizacao = document.querySelector('.Organizacao__tempos')
const QuadroOcorrencias = document.querySelector('.Organizacao__ocorrencias')
const time = document.querySelector('.Organizacao__time')
time.style = 'visibility:hidden'
QuadroOcorrencias.style = 'visibility:hidden'
function retornaBtnTime(btnTime) {
  if (!btnTime) {
    time.style = 'visibility:block'
    QuadroOcorrencias.style = 'visibility:hidden'
    Organizacao.style = 'visibility:hidden'
  }
}
function retornaBtnOrganizacao(btnOrganizacao) {
  if (!btnOrganizacao) {
    time.style = 'visibility:hidden'
    QuadroOcorrencias.style = 'visibility:hidden'
    Organizacao.style = 'visibility:visible'
  }
}
function retornaBtnQuadro(btnQuadro) {
  if (!btnQuadro) {
    time.style = 'visibility:hidden'
    QuadroOcorrencias.style = 'visibility:visible'
    Organizacao.style = 'visibility:hidden'
  }
}
/*Adicionar nomes na equepe/time*/
const equipe = document.querySelector('.Organizacao__time-nomes')
const inputNomes = document.querySelector('.Organizacao__time-input')
const btnAdicionar = document.querySelector('.Organizacao__add-Operador')
btnAdicionar.addEventListener('click', (e) => {
  filtraNomes()
})
const nomes = []
function criaUl(nomesFiltrados) {
  let ul = document.createElement('ul')
  ul.innerHTML = `${nomesFiltrados}`
  ul.className = 'Organizacao__time-ul'
  if (inputNomes.value === '') {
    alert('Nomes vazio nao podem ser adicionados')
  } else {
    nomes.push(inputNomes.value)
    equipe.appendChild(ul)
    inputNomes.value = ''
    inputNomes.focus()
  }
  criaButton(ul)
}
function filtraNomes() {
  const nomesFiltrados = nomes.filter((j, i) => { return nomes.indexOf(j) === i; })
  const ultimo = nomesFiltrados[nomesFiltrados.length - 1]
  criaUl(ultimo)
}
/*botao remover nomes*/
function criaButton(ul) {
  let btn = document.createElement('button')
  btn.className = 'Organizacao__time-btn'
  btn.textContent = 'x'
  ul.appendChild(btn)
  btn.addEventListener('click', (e) => {
    ul.innerHTML = ''
    ul.style.border = 'none'
  })
}
const OcorrenciasLevantadas = document.querySelector('.Organizacao__ocorrencias-quadro')
const inputAddOcorrencias = document.querySelector('.Organizacao__ocorrencias-principais')
const btnAddOcorrencias = document.querySelector('.Organizacao__ocorrencias-btn')
let contadorOcorrencias = 1
btnAddOcorrencias.addEventListener('click', (e) => {
  criaSpan()
  contadorOcorrencias++
})
function criaSpan() {
  let criaSpan = document.createElement('p')
  criaSpan.style.border = 'none'
  criaSpan.textContent = `${contadorOcorrencias}-${inputAddOcorrencias.value} `
  OcorrenciasLevantadas.appendChild(criaSpan)
  inputAddOcorrencias.value = ''
  inputAddOcorrencias.focus()
  criaButton(criaSpan)
}
/* adicionar operador para cada maquina*/
const btnAddPreparador = document.querySelector('.Organizacao__btn-AdicionarPreparador')
const btnRegistraTempo = document.querySelector('.Organizacao__btn-RegistrarTempo')
const divPreparadores = document.querySelector('.Organizacao__preparadores-maquinas')
let contador = 1
btnAddPreparador.addEventListener('click', (e) => {
  criarSelect()
  adicionarNomesPorMaquinas()
  inputHora()
  contador++

})
btnRegistraTempo.addEventListener('click', (e) => {
  calHoras()
  avalicao()
})

fetch('/maquinas.json')
  .then(maquinas => { return maquinas.json() })
  .then((maquinasNum) => {
    maquinasNum.map(maq => {
      arrayMaquina.push(maq)
    })
  })
let arrayMaquina = []
const divPre = document.createElement('div')
divPreparadores.appendChild(divPre)
function criarSelect() {
  const select = document.createElement('select')
  select.className = 'Organizacao__preparadores-select'
  divPre.appendChild(select)
  criaOption(select)
  seleciona(select)
  tempoPadrao(select)

}
function criaOption(select) {
  for (let maquina of arrayMaquina) {
    const option = document.createElement('option')
    option.className = 'Organizacao__preparadores-option'
    option.textContent = `${maquina.OP}`
    select.appendChild(option)
    option.value = option.index
  }
}
/*Adicionar tempos padroes de preparacao*/
const divtempo = document.createElement('div')
divPreparadores.appendChild(divtempo)
function seleciona(select) {
  let li = document.createElement('li')
  let ValorArray = []
  li.className = 'Organizacao__preparadores-li'
  select.addEventListener('change', (e) => {
    let op = arrayMaquina[e.target.value]
    ValorArray.push(op)
    for (let valor of ValorArray) {
      li.textContent = `${valor.tempo}`
    }
  })
  divtempo.appendChild(li)
}
/*Adicionar nomes dos times para as maquinas*/
const divNomes = document.createElement('div')
divPreparadores.appendChild(divNomes)
function adicionarNomesPorMaquinas() {


  const select = document.createElement('select')
  select.className = 'Organizacao__preparadores-select__nome'
  for (let Nomes of nomes) {
    const option = document.createElement('option')
    option.className = 'Organizacao__preparadores-option'
    option.innerHTML = `${Nomes}`
    select.appendChild(option)
  }

  divNomes.appendChild(select)
}
/* Hora que iniciou a preparacao da maquina*/
const divInicil = document.createElement('div')
divPreparadores.appendChild(divInicil)
const divFim = document.createElement('div')
divPreparadores.appendChild(divFim)
function inputHora() {
  const criaInputHoraInicial = document.createElement('input')
  criaInputHoraInicial.type = "time"
  criaInputHoraInicial.className = "Organizacao__Tempo-inicial"
  divInicil.appendChild(criaInputHoraInicial)
  const criaInputHoraFinal = document.createElement('input')
  criaInputHoraFinal.type = "time"
  criaInputHoraFinal.className = "Organizacao__Tempo-final"

  divFim.appendChild(criaInputHoraFinal)

}
const divCalc = document.createElement('div')
divCalc.className = 'Organizacao__Tempo-divCalc'
divPreparadores.appendChild(divCalc)
let arrayDiv = []

function calHoras() {
  const horaInicial = document.querySelectorAll('.Organizacao__Tempo-inicial')
  const horaFinal = document.querySelectorAll('.Organizacao__Tempo-final')

  for (let i = 0; i <= contador; i++) {
    const li = document.createElement('li')
    li.className = 'Organizacao__preparadores-liHoras'

    let calc = parseInt(horaFinal[i].value.replace(":", '')) - parseInt(horaInicial[i].value.replace(":", "")) + ""

    let metade = Math.floor(calc.length / 2)
    let horaCompleta = calc.substring(0, metade) + ":" + calc.substring(metade)

    if (calc < 0 || calc === 'NaN') {
      // alert("Horario incorreto Por favor preechar com valores validos")
    } else if (arrayDiv.length == i) {
      divCalc.appendChild(li)
      avalicao(horaCompleta)
      arrayDiv.push(divCalc)

    }


    if (calc > 0 && calc < 60) {
      let horaCompleta = "0:" + calc.substring(0, metade) + calc.substring(metade)
      li.textContent = horaCompleta
    } else {
      li.textContent = horaCompleta
    }



  }






}

const divPadrao = document.createElement('div')
divPreparadores.appendChild(divPadrao)
function tempoPadrao(select) {
  let p = document.createElement('p')
  p.className = 'Organizacao__preparadores-p'
  let ValorArray = []
  select.addEventListener('change', (e) => {
    let op = arrayMaquina[e.target.value]
    ValorArray.push(op)
    for (let valor of ValorArray) {
      p.textContent = `${valor.tempo}`
    }
  })
  divPadrao.appendChild(p)
}

/*avaliacao se esta dentro do tempo esperado ou nao*/
const divAvaliacao = document.createElement('div')
divPreparadores.appendChild(divAvaliacao)
divAvaliacao.className = 'Organizacao__preparadores-avaliacao'
function avalicao(tempoAtual) {
  let tempos = parseFloat(tempoAtual)
  if (tempos > 6) {
    divAvaliacao.innerHTML += `<p>&#10060;</p>`// tempo ruim
  }
  if (tempos < 6) {
    divAvaliacao.innerHTML += `<p>&#9989;</p>`// tempo bom
  }
  if (tempos === 6) {
    divAvaliacao.innerHTML += `<p>&#10071;</p>`
  }
}

