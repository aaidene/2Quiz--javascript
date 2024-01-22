const form = document.querySelector('.form-quizz'); /*on cible la classe du formulaire */
let tableauResultats = []; /*on récupère les données dans un tableau*/

const reponses = ['c', 'a', 'b', 'a', 'c'];
const emojis = ['✔️', '✨', '👀', '👎', '😭']; /* green mark, Sparkles, eyes, Thumbs Down*/
const titreResultat = document.querySelector('.resultats h2');
const noteResultat = document.querySelector('.note');
const aideResultat = document.querySelector('.aide');

const toutesLesQuestions = document.querySelectorAll('.question-block');
let verifTableau = []; // On verifie le tableau


form.addEventListener('submit', (e) => { /*ajout d'un écouteur d'évènement - l'évènement est 'submit'*/
    e.preventDefault(); /*ne pas actualiser la page et récupérer les données en local */
    for (i = 1; i < 6; i++) { // on commence par 1 car 1ère question = q1
        tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }
    // console.log(tableauResultats);//on va déclarer une fonction de vérification

    veriffunc(tableauResultats);

    tableauResultats = [];
})

function veriffunc(tableauResultats) {
    for (let a = 0; a < 5; a++) {
        if (tableauResultats[a] === reponses[a]) {
            verifTableau.push(true);
        } else {
            verifTableau.push(false);
        }
    }
    // console.log(verifTableau);
    afficherResultats(verifTableau);
    couleursFonction(verifTableau)
        // verifTableau[];//remise à zéro du tableau de verification
}

function afficherResultats(tabCheck) {
    const NbDeFautes = tabCheck.filter(el => el !== true).length;
    console.log(NbDeFautes);
    //la methode .filter va filtrer un tableau et en retourner un nouveau avec les éléments qui ont été filtrés
    //el(l'élement)on va être filtré chaque élément qui est différent de true
    //.length longueur du tableau pour savoir combien il y a de réponses fausses
    //console.log(nbDeFautes);


    switch (NbDeFautes) {
        case 0:
            titreResultat.innerText = `${emojis[0]}Bravo, c'est un sans faute ! ${emojis[0]}`;
            aideResultat.innerText = '';
            noteResultat.innerText = '5/5';
            break;
        case 1:
            titreResultat.innerText = `${emojis[1]}Tu y es presque !`;
            aideResultat.innerText = 'Retente une autre réponse dans la case rouge, puis re-valide !';
            noteResultat.innerText = '4/5';
            break;
        case 2:
            titreResultat.innerText = `${emojis[1]}Encore un effort ....${emojis[2]} `;
            aideResultat.innerText = 'Retente une autre réponse dans la case rouge, puis re-valide !';
            noteResultat.innerText = '3/5';
            break;
        case 3:
            titreResultat.innerText = `${emojis[2]}Il reste quelques erreurs.${emojis[4]} `;
            aideResultat.innerText = 'Retente une autre réponse dans la case rouge, puis re-valide !';
            noteResultat.innerText = '2/5';
            break;
        case 4:
            titreResultat.innerText = `${emojis[4]}Ne lâche rien !${emojis[4]} `;
            aideResultat.innerText = 'Retente une autre réponse dans la case rouge, puis re-valide !';
            noteResultat.innerText = '1/5';
            break;
        case 5:
            titreResultat.innerText = `${emojis[3]}Ne lâche rien !${emojis[3]} `;
            aideResultat.innerText = 'Retente une autre réponse dans la case rouge, puis re-valide !';
            noteResultat.innerText = '0/5';
            break;
        default:
            titreResultat.innerText = 'Woops, cas inattendu.';
            break;
    }
}

function couleursFonction(tabValBool) { //le tableau des valeurs booléennes true et false
    for (let j = 0; j < tabValBool.length; j++) {
        if (tabValBool[j] === true) {
            toutesLesQuestions[j].style.background = 'lightgreen'; //si la réponse est true alors le bloc question sera de couleur verte
        } else {
            toutesLesQuestions[j].style.background = '#ffb8b8'; //si la réponse est false alors le bloc question sera de couleur rouge
            toutesLesQuestions[j].classList.add('echec');

            setTimeout(() => { //fonction qui permet d'arrêter l'animation.
                    toutesLesQuestions[j].classList.remove('echec'); //propriété .remove qui supprime la classe 'echec' du DOM (l'animation)au cas où l'utilisateur se retromperait.
                }, 500) //(500 millisecondes)
        }
    }
}


toutesLesQuestions.forEach(item => {

    item.addEventListener('click', () => {
        item.style.background = 'rgb(169,131,205)';
    })

})