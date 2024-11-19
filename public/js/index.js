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

// formating date



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

const projetsId = document.querySelectorAll('.link-projet');

links.forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();

        const postId = e.currentTarget.getAttribute('data-id');
        
        try {
            const res = await fetch(`http://localhost:3000/post/${postId}`);
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }

            const data = await res.json();
            const post = data.getPost;

            if (post && post.length > 0) {
                const postDescription = document.querySelector('.post-description');
                const postDate = document.querySelector('.date');

                // Mise à jour de la description
                postDescription.innerText = post[0].description;

                // Formatage de la date
                const formattedDate = new Date(post[0].created_at).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                postDate.innerText = formattedDate;
            } else {
                console.error('Post not found in response data.');
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    });
});


projetsId.forEach(projetid=>{
    projetid.addEventListener('click', async (e)=>{
        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-id');
        const res = await fetch(`http://localhost:3000/projet/${id}`);
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

        const data = await res.json();
        const projetbyId = data.getProjet;

        const nomProjet = document.querySelector('.projet-nom');
        const description =document.querySelector('.projet-description');
        const technologies = document.querySelector('.projet-tech');
        const defis = document.querySelector('.projet-defis');
        const resultats = document.querySelector('.projet-resultat');

        nomProjet.innerText = `Nom du projet : ${projetbyId[0].nom}`;
        description.innerText = projetbyId[0].description;
        defis.innerText = `Défis : ${projetbyId[0].defis}`;
        resultats.innerText = `Résultat: ${projetbyId[0].defis}`;
    

        
        


    });

   


});

const postRecents = document.querySelectorAll('.postRecents');
const postPrincipales = document.querySelectorAll('.link-post');

postRecents.forEach(recent => {
    recent.addEventListener('click', (e) => {
        e.preventDefault();
        
        const recentId = e.currentTarget.getAttribute('data-id');
        console.log(`id recent: ${recentId}`);

        // Utilisation de `some()` pour trouver une correspondance
        const matched = Array.from(postPrincipales).some(postPrincipal => {
            const postprincipalId = postPrincipal.getAttribute('data-id');
            console.log(`id post principal: ${postprincipalId}`);

            if (recentId === postprincipalId) {
                const targetArticle = document.querySelector(`#post-${postprincipalId}`);
                if (targetArticle) {
                    targetArticle.scrollIntoView({ behavior: 'smooth' });
                }
                return true; // Arrête `some()` dès qu'une correspondance est trouvée
            }
            return false;
        });

        if (!matched) {
            alert('No matching ID found');
        }
    });
});



async function dateFormat(date,Element,){

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' };
    const dateFormat = new Date(date);

    return Element.innerHTML = dateFormat.toLocaleDateString("en-FR", options);

}

// lancement de la page 


