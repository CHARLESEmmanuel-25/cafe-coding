import express from 'express';
import path from 'path';
import router from './Router/router.js';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();

// body parser

app.use(express.json()); 

// Configuration du moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Middleware pour les fichiers statiques
app.use(express.static(path.join(process.cwd(), 'public')));

// CORS handler
app.use(
    cors({
      origin: ['http://localhost:3000','https://cafe-coding.onrender.com'],
      credentials: true,
    })
  );

// Create session
app.use(
    session({
      secret: process.env.SESSION_PASSWORD,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 24h de validité
        sameSite: 'lax',
      },
    })
  );

// Utilisation du router
app.use(router);

export default app;