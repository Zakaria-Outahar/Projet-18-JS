const info = document.querySelector('.info');
const cellules = document.querySelectorAll('.cell');

let verouillage = false;
let joueurEnCours = "X";

info.innerHTML = `Au tour de ${joueurEnCours}`;

const alignementGagnants = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let partieEnCours = ["","","","","","","","",""];

cellules.forEach(cell => {
    cell.addEventListener('click', clicSurCase);
})

function clicSurCase(e){
    const caseClique = e.target;
    const caseIndex = caseClique.getAttribute('data-index');

    if(partieEnCours[caseIndex] !== "" || verouillage){
        return;
    }

    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;

    validationResultats();
}

function validationResultats(){
    let finDePartie = false;
    for(let i = 0; i < alignementGagnants.length; i++){
        const checkWin = alignementGagnants[i];
        let a = partieEnCours[checkWin[0]];
        let b = partieEnCours[checkWin[1]];
        let c = partieEnCours[checkWin[2]];
        if(a === "" || b === "" || c === ""){
            continue;
        }
        if(a === b && b === c){
            finDePartie = true;
            break;
        }
    }



    if(finDePartie){
        info.innerText = `Le joueur ${joueurEnCours} a gagné !`;
        verouillage = true;
        return;
    }

    let matchNul = !partieEnCours.includes("");
    if(matchNul){
        info.innerHTML = "Match nul !";
        verouillage = true;
        return;
    }

    changementDeJoueur();
}

function changementDeJoueur(){
    joueurEnCours = joueurEnCours === "X" ? "O" : "X";
    info.innerHTML = `Au tour de ${joueurEnCours}`;
}