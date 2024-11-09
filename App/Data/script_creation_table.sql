BEGIN;

DROP TABLE IF EXISTS "media" CASCADE;
DROP TABLE IF EXISTS "projet" CASCADE;
DROP TABLE IF EXISTS "presentation" CASCADE;
DROP TABLE IF EXISTS "user_techno" CASCADE;
DROP TABLE IF EXISTS "techno"   CASCADE;
DROP TABLE IF EXISTS "post" CASCADE;
DROP TABLE IF EXISTS "utilisateur" CASCADE;

CREATE TABLE "utilisateur" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nom"               TEXT NOT NULL,
  "prenom"            TEXT NOT NULL,
  "mail"              TEXT NOT NULL,
  "pseudo"            TEXT UNIQUE NOT NULL,
  "mot_de_passe"      TEXT NOT NULL,
  "short_description" TEXT,
  "photo"             TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "post" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "titre" TEXT NOT NULL,
  "description"    TEXT NOT NULL,
  "tags"           TEXT,
  "lien"           TEXT,
  "id_utilisateur" INT NOT NULL REFERENCES "utilisateur" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "presentation" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "short_presentation" TEXT NOT NULL,
  "description"     TEXT NOT NULL,
  "formation"       TEXT NOT NULL,
  "ecole"           TEXT,
  "parcours"        TEXT,
  "ambitions"       TEXT,
  "id_utilisateur" INT NOT NULL REFERENCES "utilisateur" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE techno (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "user_techno" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "techno_id" INT NOT NULL REFERENCES "techno" ("id"),
    "id_utilisateur" INT NOT NULL REFERENCES "utilisateur" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "projet" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nom"               TEXT NOT NULL,
  "description"       TEXT NOT NULL,
  "tech"              TEXT,
  "defis"             TEXT,
  "duree_realisation" TEXT,
  "resultats"         TEXT,
  "lien_demo"         TEXT,
  "lien_github"       TEXT,
  "id_utilisateur" INT NOT NULL REFERENCES "utilisateur" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "media" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" TEXT NOT NULL,
  "image"       TEXT NOT NULL,
  "id_post"     INT REFERENCES "post" ("id"),
  "id_projet"   INT REFERENCES "projet" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Réinitialisation des séquences
ALTER SEQUENCE "utilisateur_id_seq" RESTART WITH 1;
ALTER SEQUENCE "post_id_seq" RESTART WITH 1;
ALTER SEQUENCE "presentation_id_seq" RESTART WITH 1;
ALTER SEQUENCE "techno_id_seq" RESTART WITH 1;
ALTER SEQUENCE "user_techno_id_seq" RESTART WITH 1;
ALTER SEQUENCE "projet_id_seq" RESTART WITH 1;
ALTER SEQUENCE "media_id_seq" RESTART WITH 1;

COMMIT;
