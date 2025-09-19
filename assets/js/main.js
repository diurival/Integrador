const sendBtn = document.getElementById('select_btn');
const tableContainer = document.getElementById('table_container');

var isP = document.getElementById('p_btn');
var isQ = document.getElementById('q_btn');

var selectorValues = document.getElementById('selector');
var inputP = document.getElementById('prop_p');
var inputQ = document.getElementById('prop_q');

var pGlobal, qGlobal, output = false;

isP.addEventListener('click', () => {
    pGlobal = !pGlobal;

    if(!pGlobal){
        isP.style.backgroundColor = '#F21B3F';    
    }else{
        isP.style.backgroundColor = '#29BF12'; 
    }
});
isQ.addEventListener('click', () => {
    qGlobal = !qGlobal;
    
    if(!qGlobal){
        isQ.style.backgroundColor = '#F21B3F';    
    }else{
        isQ.style.backgroundColor = '#29BF12'; 
    }

}); 

console.log(inputP.value, inputQ.value);

function appendHTML(){
    const newDiv = document.getElementById('generateText')
    var text = getConnectors();
    newDiv.innerHTML = `${text.toUpperCase()}`;
}

function getConnectors(){
    var p = inputP.value;
    var q = inputQ.value;
    
    if(inputQ.value[0] == '!')
        {
            qGlobal = !qGlobal;
        }

    if(inputP.value[0] == '!')
        {
            pGlobal = !pGlobal;
        }

    var connectors = selectorValues.value;

    if(connectors === "and"){
        console.log(p, q);
        output = pGlobal && qGlobal;
        return `p ∧ q: ${p} y ${q}`;
    }
    else if(connectors === "or"){
        output = pGlobal || qGlobal;
        return `p ∨ q: ${p} o ${q}`;
    }
    else if (connectors === "cond"){
        if (pGlobal == true && qGlobal == false){
            output = false;
        }else{
            output = true;
        }
        return `p ⇒ q: Si ${p}, entonces ${q}`;
    }
    else if (connectors === "bicond"){
        if(pGlobal != qGlobal){
            output = false;
        }else{
            output = true;
        }
        return `p ⇔ q: Si ${p} y solamente si ${q}`;
    }
    else if (connectors === "xor"){
        if(pGlobal == qGlobal){
            output = false;
        }else{
            output = true;
        }
        return `p ⊕ q: O ${p} o ${q}`;
    }
    else {
        alert('No válido');
    }
}

function getTableValues(){

    tableContainer.style.display = 'flex';

    document.getElementById('p_output').innerText = pGlobal ? 'V' : 'F';
    document.getElementById('q_output').innerText = qGlobal ? 'V' : 'F'; 
    document.getElementById('output').innerText = output ? 'V' : 'F';
}

    
sendBtn.addEventListener('click', () => {
    console.log(output);
    appendHTML();
    getTableValues();
});
