import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const client = new Client({
  user: process.env.DBU || 'devhouse' ,
  database: process.env.DBN || 'devhouscafe',
  password: process.env.DBP || 'devemedb',
  port: process.env.DBPORT || '5432',
  //host: process.env.HOST || '127.0.0.1',
 
});

// Connexion à la base de données avec gestion des erreurs
client.connect()
  .then(() => console.log("connexion à la base de données"))
  .catch(err => console.error("Erreur de connexion à la base de données", err));

export default client;

