

import client from "../Config/client.js"


const mainDatamapper = {

    getUtilisateur : async ()=>{
        const res = await client.query("SELECT * FROM utilisateur");
        return res.rows;
    },

    getPost : async()=>{

       
        const res = await client.query("SELECT post.*, media.image AS media_du_post  FROM post INNER JOIN media ON post.id = media.id")
        return res.rows;

    },

    getRecentsposts : async()=>{

        const res = await client.query("SELECT * FROM post ORDER BY created_at DESC");
        return res.rows;
    },

    getPresentation : async()=>{

        const res = await client.query("SELECT * from presentation");
        return res.rows;
    },

    getProjets : async()=>{

        const res = await client.query("select * from projet");
        return res.rows;

    },


    getTechno : async()=>{

    },

    saveUser: async (nom, prenom, mail, pseudo, hash, short_description, photo) => {
        const query = {
            text: `INSERT INTO utilisateur (nom, prenom, mail, pseudo, mot_de_passe, short_description, photo)
                   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            values: [nom, prenom, mail, pseudo, hash, short_description, photo]
        };
        const result = await client.query(query);
        return result.rows;
    },
    
    
    userExist: async (mail) => {
        const query = {
            text: `SELECT * FROM utilisateur WHERE mail = $1`,
            values: [mail]
        };
    
        const result = await client.query(query);
        return result.rows; // Retourne directement les lignes du résultat
    },

    saveProjet: async (projetCreateByUser) => {
        const query = {
            text: `INSERT INTO projet (nom, description, tech, defis, duree_realisation, resultats, lien_demo, lien_github, id_utilisateur)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            values: [
                projetCreateByUser.nom,
                projetCreateByUser.description,
                projetCreateByUser.techno,
                projetCreateByUser.defis,
                projetCreateByUser.duree,
                projetCreateByUser.resultats,
                projetCreateByUser.lienDemo,
                projetCreateByUser.lienGithub,
                projetCreateByUser.userid
            ]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    savePost: async (postCreateByUser) => {
        const query = {
            text: `INSERT INTO post (titre, description, tags, lien, id_utilisateur)
                   VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            values: [
                postCreateByUser.titre,
                postCreateByUser.description,
                postCreateByUser.tags,
                postCreateByUser.lien,
                postCreateByUser.userid
            ]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    getIdPostRecents: async()=>{
        const query = {
            text: `SELECT * FROM post ORDER BY created_at DESC`,
           
        };
    
        const result = await client.query(query);
        return result.rows; // Retourne directement les lignes du résultat
    }
    
    



   
 }

 export default mainDatamapper;