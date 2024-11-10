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


// charger les articles

const links = document.querySelectorAll('.link-post');


links.forEach(link =>{
    link.addEventListener('click', async(e)=>{
        e.preventDefault();

        const postId = e.currentTarget.getAttribute('data-id');
        
        const res = await fetch(`http://localhost:3000/post/${postId}`);
       if(!res.ok){
        throw new Error(`Response status: ${res.status}`);
       }

       const data = await res.json();
       const post = data.getPost;
       const postDescription = document.querySelector('.post-description');
       const postDate = document.querySelector('.date-post')

       postDescription.innerText = post[0].description;
       postDate.innerText = post[0].created_at;
       
    })
});








/*


*/