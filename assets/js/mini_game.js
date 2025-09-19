const conector = document.getElementById('operator');
const i0 = document.getElementById('fInput0');
const i1 = document.getElementById('fInput1');
const i2 = document.getElementById('fInput2');

const s0 = document.getElementById('sInput0');
const s1 = document.getElementById('sInput1');
const s2 = document.getElementById('sInput2');

const iP = document.getElementById('i_p');
const iQ = document.getElementById('i_q');
const iR = document.getElementById('i_r');
const iS = document.getElementById('i_s');
const iAns = document.getElementById('i_ans');

const start_btn = document.getElementById('start');
const check_btn = document.getElementById('check_ans');

let p = null; q = null; r = null; s = null;
let count = 0;
let ans;

let input = i0;
let i = 0;
let myArray = [];
let verifyArray = [];

let secs = 180;
function timer() {
    let timerId = setInterval(() => {
        const newDiv = document.getElementById('generateTimer');
        newDiv.style.display = 'flex';
        var text = secs;
        newDiv.innerHTML = `${text} segundos`;
        secs--;
        if (secs < 0) {
            clearInterval(timerId);
            alert(`TIME OUT\nAcceso denegado\nIntentos: ${count}\nSolo vel no tocal`);
        }
    }, 1000);
}

[i0, i1, i2, conector, s0, s1, s2].forEach((el, index) => {
    el.addEventListener("focus", () => {
        input = el;
        i = index;
    });
});

function inputsVerificadores() {
    const pChecks = document.getElementById('pChecks');
    pChecks.style.display = 'flex';

    for (let i = 0; i <= 6; i += 2) {
        if (myArray[i] != null) {
            document.getElementsByClassName(`span_${i}`)[0].style.display = 'flex';
            document.getElementsByClassName(`span_${i}`)[0].textContent = myArray[i] + ': ';
            document.getElementsByClassName(`input_${i}`)[0].style.display = 'flex';
        }
        document.getElementsByClassName(`input_ans`)[0].style.display = 'flex';
    }
}


document.querySelectorAll("#logicKeyboard .keycap").forEach(key => {
    key.addEventListener("click", () => {

        let start = input.selectionStart;
        let end = input.selectionEnd;
        let value = input.value;

        let char = key.textContent;
        myArray[i] = char;
        input.value = value.substring(0, start) + char + value.substring(end);
        input.selectionStart = input.selectionEnd = start + char.length;
        input.focus();
    });
});

start_btn.addEventListener('click', () => {
    timer();
    inputsVerificadores();
    start_btn.style.display = 'none';
    check_btn.style.display = 'block';

[i0, i1, i2, conector, s0, s1, s2].forEach((e, index) => {

    verifyArray[index] = (typeof myArray[index] === "object")
        ? JSON.parse(JSON.stringify(myArray[index])) 
        : myArray[index];

    e.value = '';
});


})

check_btn.addEventListener('click', () => {
    console.log(ans);
    checkAnswers();

    for (let i = 0; i <= 6; i++) {
        console.log(verifyArray[i], myArray[i])
    }

})

iP.addEventListener('click', () => {
    p = !p;
    p ? iP.style.background = '#29BF12' : iP.style.background = '#F21B3F';
    ans = validaAmbasProposiciones(p, q, r, s);
    ans ? iAns.style.background = '#29BF12' : iAns.style.background = '#F21B3F';
});

iQ.addEventListener('click', () => {
    q = !q;
    q ? iQ.style.background = '#29BF12' : iQ.style.background = '#F21B3F';

    ans = validaAmbasProposiciones(p, q, r, s);
    ans ? iAns.style.background = '#29BF12' : iAns.style.background = '#F21B3F';
});

iR.addEventListener('click', () => {
    r = !r;
    r ? iR.style.background = '#29BF12' : iR.style.background = '#F21B3F';
    ans = validaAmbasProposiciones(p, q, r, s);
    ans ? iAns.style.background = '#29BF12' : iAns.style.background = '#F21B3F';
});

iS.addEventListener('click', () => {
    s = !s;
    s ? iS.style.background = '#29BF12' : iS.style.background = '#F21B3F';
    ans = validaAmbasProposiciones(p, q, r, s);
    ans ? iAns.style.background = '#29BF12' : iAns.style.background = '#F21B3F';
});



function andLogico(primera, segunda) {
    return primera && segunda;
}
function orLogico(primera, segunda) {
    return primera || segunda;
}
function xorLogico(primera, segunda) {
    if (primera != segunda)
        return 1;
    return 0;
}
function condLogico(primera, segunda) {
    if (primera === 1 && segunda === 0)
        return 0;
    return 1;
}

function bicondLogico(primera, segunda) {
    if (primera === segunda)
        return 1;
    return 0;
}

function validarPrimeraProposicion(p, q) {
    let operador = verifyArray[1];
    if (q == null)
        return p;

    if (operador === '∧') {
        return andLogico(p, q);
    } else if (operador === '∨') {
        return orLogico(p, q);
    } else if (operador === '⊕') {
        return xorLogico(p, q);
    } else if (operador === '→') {
        return condLogico(p, q);
    } else if (operador === '↔') {
        return bicondLogico(p, q);
    } else {
        console.error("Operador no válido:", operador);
        return null;
    }
}

function validarSegundaProposicion(r, s) {
    let operador = verifyArray[5];
    if (s == null)
        return r;

    if (operador === '∧') {
        return andLogico(r, s);
    } else if (operador === '∨') {
        return orLogico(r, s);
    } else if (operador === '⊕') {
        return xorLogico(r, s);
    } else if (operador === '→') {
        return condLogico(r, s);
    } else if (operador === '↔') {
        return bicondLogico(r, s);
    } else {
        console.error("Operador no válido:", operador);
        return null;
    }
}

function validaAmbasProposiciones(p, q, r, s) {
    let operador = verifyArray[3];
    let resultadoPrimera = validarPrimeraProposicion(p, q);
    let resultadoSegunda = validarSegundaProposicion(r, s);

    if (operador === '∧') {
        return andLogico(resultadoPrimera, resultadoSegunda);
    } else if (operador === '∨') {
        return orLogico(resultadoPrimera, resultadoSegunda);
    } else if (operador === '⊕') {
        return xorLogico(resultadoPrimera, resultadoSegunda);
    } else if (operador === '→') {
        return condLogico(resultadoPrimera, resultadoSegunda);
    } else if (operador === '↔') {
        return bicondLogico(resultadoPrimera, resultadoSegunda);
    } else {
        console.error("Operador no válido:", operador);
        return null;
    }
}

function checkAnswers() {
    for (let i = 0; i <= 6; i++) {
        if (verifyArray[i] == myArray[i])
            continue;
        else {
            alert('Respuesta incorrecta');
            count++;
            return 0;
        }
    }
    alert(`Acceso Exitoso\nIntentos: ${count}`);
    window.location.reload();
}
