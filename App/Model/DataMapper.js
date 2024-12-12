

import client from "../Config/client.js"


const mainDatamapper = {

    getUtilisateur : async ()=>{
        const res = await client.query("SELECT * FROM utilisateur");
        return res.rows;
    },

    getPost : async()=>{

       
        const res = await client.query("SELECT * FROM post ORDER BY created_at DESC")
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

    onPresentation : async()=>{
        const res = await client.query("SELECT * FROM presentation LIMIT 1");
        return res.rows[0];
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
    
    savePresentation: async(presentationCreated)=>{

        const query = {
            text: `INSERT INTO presentation (short_presentation, description, formation, ecole, parcours, photo, ambitions, id_utilisateur)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            values: [
                presentationCreated.short_presentation,
                presentationCreated.description,
                presentationCreated.formation,
                presentationCreated.ecole,
                presentationCreated.parcours,
                presentationCreated.photo,
                presentationCreated.ambitions,
                presentationCreated.idUser,
            
            ]
        };
        const result = await client.query(query);
        return result.rows[0];


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
            text: `INSERT INTO projet (nom, description, tech, defis, duree_realisation, resultats, photo, lien_demo, lien_github, id_utilisateur)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            values: [
                projetCreateByUser.nom,
                projetCreateByUser.description,
                projetCreateByUser.techno,
                projetCreateByUser.defis,
                projetCreateByUser.duree,
                projetCreateByUser.resultats,
                projetCreateByUser.photo,
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
            text: `INSERT INTO post (titre, description, tags,photo, lien, id_utilisateur)
                   VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *`,
            values: [
                postCreateByUser.titre,
                postCreateByUser.description,
                postCreateByUser.tags,
                postCreateByUser.image,
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
    },
    
    getPostByid : async(idPost)=>{

        const query = {
            text: `SELECT * FROM post WHERE id = $1`,
            values: [idPost]
           
        };
    
        const result = await client.query(query);
        return result.rows; // Retourne directement les lignes du résultat
    },

    getProjetById : async(idProjet)=>{
        const query = {
            text: `SELECT * FROM projet WHERE id = $1`,
            values: [idProjet]
           
        };
    
        const result = await client.query(query);
        return result.rows; // Retourne directement les lignes du résultat
    },

    destroyProjet: async(idProjet)=>{
        const query = {
            text: `DELETE FROM projet WHERE id = $1`,
            values: [idProjet]
           
        };
    
        const result = await client.query(query);
        return result.rows; // Retourne directement les lignes du résultat
    },


    destroyPost: async(idPost)=>{
        const query = {
            text: `DELETE FROM projet WHERE id = $1`,
            values: [idProjet]
           
        };
    
        const result = await client.query(query);
        return result.rows; // Retourne directement les lignes du résultat
    },

    posts: async()=>{
        const res = await client.query("select * from post");
        return res.rows;
    }
   




    



   
 }

 export default mainDatamapper;
