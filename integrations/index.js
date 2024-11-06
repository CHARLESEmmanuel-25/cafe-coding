const aboutBtn = document.querySelector('.profile-info');
const overlay = document.querySelector('.overlay');
const closeBtnConnexion = document.querySelector('.connexion-close');
const modalAbout = document.querySelector('.overlayAbout');
const closeBtnAbout = document.querySelector('.close-about');
const btnConnexion = document.querySelector('.user-avatar');
const modalCoonexion = document.querySelector('.overlayConnexion');
const modalProjet = document.querySelector('.overlayProjet');
const btnCloseProjet = document.querySelector('.close-projet')



if (aboutBtn) {
    aboutBtn.addEventListener('click', () => {
        openOverlay(modalAbout);
    });
}

if (closeBtnAbout) {
    closeBtnAbout.addEventListener('click', () => {
        closeOverlay(modalAbout);
    });
}

if (btnConnexion) {
    btnConnexion.addEventListener('click', ()=>{
        openOverlay(modalCoonexion)
    })
}
if (closeBtnConnexion) {
    closeBtnConnexion.addEventListener('click', () => {
        closeOverlay(modalCoonexion);
    });
}

if (btnCloseProjet) {
    btnCloseProjet.addEventListener('click', ()=>{
        closeOverlay(modalProjet);
    })
}


function openOverlay(overlayName) {
    overlayName.classList.add('show'); // Affiche l'overlay
}

function closeOverlay(overlayName) {
    overlayName.classList.remove('show'); // Cache l'overlay
}


// side bar right 

const projets = document.querySelectorAll('.project-category li a');

projets.forEach((projet)=>{
    projet.addEventListener('click', ()=>{
        openOverlay(modalProjet);
    })

});

const posts = document.querySelectorAll('.twitter-post');
const overlayPost = document.querySelector('.overlayPost');
const closePostBtn = document.querySelector('.close-post');

if (closePostBtn) {
    closePostBtn.addEventListener('click', ()=>{
        closeOverlay(overlayPost);
    })
}

posts.forEach((post) => {
    post.addEventListener('click', () => {
        openOverlay(overlayPost);
    });
});

