BEGIN;

-- Insertion dans la table utilisateur
INSERT INTO utilisateur (nom, prenom, mail, pseudo, mot_de_passe, short_description, photo)
VALUES 
('Charles', 'Emmanuel', 'emmanuel.charles@example.com', 'emmancharles', 'mot-de-passe',
 'Développeur web full stack passionné par les technologies modernes.', 
 'photo_emmanuel.jpg');

-- Insertion dans la table presentation
INSERT INTO "presentation" ("short_presentation","description", "formation", "ecole", "parcours", "ambitions", "id_utilisateur")
VALUES 
('Développeur web full stack avec une spécialisation en JavaScript et Node.js. Expérimenté en développement front et back-end','Développeur web full stack avec une spécialisation en JavaScript et Node.js. Expérimenté en développement front et back-end, avec des projets personnels et professionnels.', 
 'Bachelor en développement web', 
 'IRIS School', 
 'Formation complète sur le développement web moderne, incluant la création d''applications dynamiques et responsives.',
 'Devenir expert en technologies JavaScript et contribuer à des projets innovants.',
 1);

-- Insertion dans la table post
INSERT INTO "post" ("titre","description", "tags", "lien", "id_utilisateur")
VALUES 
('Découverte de #TypeScript','Découverte de TypeScript et son potentiel pour structurer le code en JavaScript. Intéressant pour les projets de grande envergure, mais nécessite un peu d''adaptation pour les équipes déjà habituées à JavaScript.',
 'TypeScript, JavaScript, Frontend',
 'https://example.com/blog/typescript-overview',
 1);

-- Insertion des technologies sans spécifier l'ID
INSERT INTO "techno" ("nom")
VALUES 
('JavaScript'),
('Node.js'),
('React'),
('PostgreSQL');

-- Insertion dans la table user_techno
INSERT INTO "user_techno" ("techno_id", "id_utilisateur")
VALUES 
(1, 1),  -- JavaScript pour l'utilisateur 1
(2, 1),  -- Node.js pour l'utilisateur 1
(3, 1),  -- React pour l'utilisateur 1
(4, 1);  -- PostgreSQL pour l'utilisateur 1

-- Insertion dans la table projet
INSERT INTO "projet" ("nom", "description", "tech", "defis", "duree_realisation", "resultats", "lien_demo", "lien_github", "id_utilisateur")
VALUES 
('Coonect', 
 'Plateforme de mise en relation entre propriétaires de voitures et nettoyeurs professionnels.',
 'React, Node.js, PostgreSQL', 
 'Gestion des disponibilités en temps réel et paiement sécurisé.',
 '6 mois',
 'Plateforme fonctionnelle avec des utilisateurs actifs et des nettoyeurs professionnels enregistrés.',
 'https://example.com/demo/coonect',
 'https://github.com/emmancharles/coonect',
 1);

-- Insertion dans la table media pour associer un post et un projet
INSERT INTO "media" ("description", "image", "id_post", "id_projet")
VALUES 
('Capture d''écran de la page de réservation en temps réel du projet Coonect.',
 'coonect_booking.png',
 NULL,
 1);

INSERT INTO "media" ("description", "image", "id_post", "id_projet")
VALUES 
('Capture du logo de JEE.',
 'jee.png',
 1,
 NULL);

COMMIT;
