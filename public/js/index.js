

const aboutBtn = document.querySelector('.profile-info');
const overlay = document.querySelector('.overlay');
const closeBtnConnexion = document.querySelector('.connexion-close');
const modalAbout = document.querySelector('.overlayAbout');
const closeBtnAbout = document.querySelector('.close-about');
const btnConnexion = document.querySelector('.user-avatar');
const modalCoonexion = document.querySelector('.overlayConnexion');
const modalProjet = document.querySelector('.overlayProjet');
const btnCloseProjet = document.querySelector('.close-projet')
const btnCloseMobileProject = document.querySelector('.close-projetmobile');
const modalProjetMobile = document.querySelector('.contenair-infomobile');
const btnshowProjectMobile = document.querySelectorAll('.btn-linkMobile');
const btnMenuDeroulant = document.querySelector('.menu-mobile');
const modalMenuDeroulant = document.querySelector('.nav-mobile');
const modalAboutMobile = document.querySelector('.card-projetmobile');
const media = document.querySelector('.content');
const hideModalprojet = document.querySelector('.projets-modal');



const state = null ;
btnMenuDeroulant.addEventListener('click', () => {
    modalMenuDeroulant.classList.toggle('hidden');
    console.log(modalMenuDeroulant.classList);
});


btnshowProjectMobile.forEach((btnlink) => {
    btnlink.addEventListener('click', (e) => {
        e.preventDefault();
        modalProjetMobile.classList.remove('hidden');
        modalMenuDeroulant.classList.add('hidden');
        
    });
    
let aboutContentLoaded = false;

btnlink.addEventListener('click', async (e) => {
    const titleMobile = document.querySelector('.title-mobile');
    const test = document.querySelector('.presentation-mobile')
    
    const apropos = e.target.textContent.trim();
    if (apropos === 'A propos') {
        titleMobile.textContent='A propos';
        test.classList.remove('hidden');
        hideModalprojet.classList.add('hidden');
        modalAboutMobile.classList.add('hidden');
     
    } else
    {
        titleMobile.textContent='Mes projets';
        modalAboutMobile.classList.remove('hidden');
        hideModalprojet.classList.remove('hidden');
        test.classList.add('hidden');
    }
});


 
    
});



btnCloseMobileProject.addEventListener('click', (e) => {
    e.preventDefault();
    modalProjetMobile.classList.add('hidden');
});



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




// charger les articles

const links = document.querySelectorAll('.link-post');

const projetsId = document.querySelectorAll('.link-projet');

links.forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();

        const postId = e.currentTarget.getAttribute('data-id');
        
        try {
            const res = await fetch(`https://emmanuel-charles.onrender.com/post/${postId}`);
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }

            const data = await res.json();
            const post = data.getPost;

            if (post && post.length > 0) {
                const postDescription = document.querySelector('.post-description');
                
                const postImageOverlay = document.querySelector('.imageOverlay');
                const postDate = document.querySelector('.date');

                // Mise à jour de la description
                postDescription.innerText = post[0].description;
                postImageOverlay.innerHTML +=` <img class="image-tweet is-240x245" src="/assets/${post[0].photo}" alt="Image du tweet" style="max-width: 100%; height: auto;">`

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
        const res = await fetch(`https://emmanuel-charles.onrender.com/projet/${id}`);
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

        const data = await res.json();
        const projetbyId = data.getProjet;
    
        const contenairProjetc = document.querySelector('.project');

      // Nom du projet
    const nomProjet = document.createElement('h3');
    nomProjet.classList.add('projet-nom');
    nomProjet.textContent = `Nom du projet : ${projetbyId[0].nom}`;

    
    
    // Description
    const description = document.createElement('p');
    description.classList.add('projet-description');
    description.innerHTML = `<strong>Description :</strong>`;
    description.textContent += projetbyId[0].description
    
    // Technologies
    const technologies = document.createElement('p');
    technologies.classList.add('projet-tech');
    technologies.innerHTML = `<strong>Technologies :</strong>`;
    technologies.textContent += projetbyId[0].tech
    
    // Défis
    const defis = document.createElement('p');
    defis.classList.add('projet-defis');
    defis.innerHTML = `<strong>Défis :</strong>`;
    defis.textContent += projetbyId[0].defis
    
    // Résultats
    const resultat = document.createElement('p');
    resultat.classList.add('projet-resultat');
    resultat.innerHTML = `<strong>Résultats :</strong>`;
    resultat.textContent += projetbyId[0].resultats
    // Liens vers le projet
    const liens = document.createElement('p');
    liens.innerHTML = `<strong>Voir le projet :</strong> 
                        <a href="${projetbyId[0].lien_demo}" target="_blank">Démo</a> | 
                        <a href="${projetbyId[0].lien_github}" target="_blank">Code Source</a>`;
    
    // Ajouter tous les éléments au conteneur principal
    contenairProjetc.appendChild(nomProjet);
    contenairProjetc.appendChild(description);
    contenairProjetc.appendChild(technologies);
    contenairProjetc.appendChild(defis);
    contenairProjetc.appendChild(resultat);
    contenairProjetc.appendChild(liens);

    document.querySelector('.close-projet').addEventListener('click', () => {
        location.reload(); // Rafraîchir la page
    });
        
        

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

// all posts

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // obtenir les données des posts
        const response = await fetch("https://emmanuel-charles.onrender.com/posts/all");
        const posts = await response.json();

        posts.forEach((post) => {
           
            const mediaContainer = document.getElementById(`media-container-${post.id}`);
            if (!mediaContainer) {
                console.warn(`Conteneur de média introuvable pour le post ID: ${post.id}`);
                return;
            }

            // déterminer le type de média
            const mediaExtension = post.photo.split('.').pop().toLowerCase();
            if (["mp4", "webm", "ogg"].includes(mediaExtension)) {
               
                const videoElement = document.createElement("video");
                videoElement.setAttribute("controls", "true");
                videoElement.classList.add("project-video");
                videoElement.style.maxWidth = "100%";
                videoElement.style.height = "auto";

                
                const sourceElement = document.createElement("source");
                sourceElement.setAttribute("src", `/assets/${post.photo}`);
                sourceElement.setAttribute("type", `video/${mediaExtension}`);
                videoElement.appendChild(sourceElement);

                
                videoElement.innerHTML += "Votre navigateur ne supporte pas la balise vidéo.";

                // Insérer la vidéo dans le conteneur
                mediaContainer.appendChild(videoElement);
            } else if (["jpg", "jpeg", "png", "gif"].includes(mediaExtension)) {
                // Créer une balise image
                const imgElement = document.createElement("img");
                imgElement.setAttribute("src", `/assets/${post.photo}`);
                imgElement.setAttribute("alt", "Média du post");
                imgElement.classList.add("image-tweet", "is-240x245");
                imgElement.style.maxWidth = "100%";
                imgElement.style.height = "auto";

                // Insérer l'image dans le conteneur
                mediaContainer.appendChild(imgElement);
            } else {
                console.warn(`Type de média non supporté pour le fichier : ${post.photo}`);
            }
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
});




// Theme color toggle

const btnColor = document.querySelector('.theme-color');

const headbarlight = document.querySelector('.bar-head'); // Correction ici : ajouter le point avant 'bar-head'



if (localStorage.getItem('headbarLight') === 'true') {
    // Si l'état est 'true', appliquer la classe 'lightbackground-color'
    headbarlight.classList.add('lightbackground-color');
} else {
    // Si l'état est 'false' ou non défini, s'assurer que la classe est supprimée
    headbarlight.classList.remove('lightbackground-color');
}

btnColor.addEventListener('click', () => {
    // Basculer la classe 'lightbackground-color' sur headbarlight
    headbarlight.classList.toggle('lightbackground-color');

    // Enregistrer l'état actuel dans le localStorage (true ou false)
    if (headbarlight.classList.contains('lightbackground-color')) {
        localStorage.setItem('headbarLight', 'true'); // Sauvegarder l'état 'true'
    } else {
        localStorage.setItem('headbarLight', 'false'); // Sauvegarder l'état 'false'
    }
});


