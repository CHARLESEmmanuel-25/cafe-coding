
import { text } from "express";
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

    }

   
 }

 export default mainDatamapper;