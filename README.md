# La Clique de Doissin

Site vitrine et espace de gestion de **La Clique de Doissin**, association musicale de Doissin.

Le projet est composé de deux applications complémentaires :

- un frontend React + TypeScript + Vite pour le site public et l'espace de gestion ;
- un backend FastAPI + PostgreSQL pour l'authentification, la persistance et les routes CRUD.

Le frontend se trouve dans ce dossier :

```text
/home/barbouche/Documents/site-musique/frontend
```

Le backend associé se trouve dans le dossier voisin :

```text
/home/barbouche/Documents/site-musique/backend
```

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation rapide](#installation-rapide)
- [Démarrer le projet](#démarrer-le-projet)
- [Variables d'environnement](#variables-denvironnement)
- [Utilisation du site](#utilisation-du-site)
- [Authentification et rôles](#authentification-et-rôles)
- [API disponible](#api-disponible)
- [Organisation du code](#organisation-du-code)
- [Tests et validation](#tests-et-validation)
- [Dépannage](#dépannage)
- [Sécurité](#sécurité)
- [Déploiement](#déploiement)
- [Évolutions prévues](#évolutions-prévues)

## Fonctionnalités

### Site public

- page d'accueil de la Clique de Doissin ;
- présentation du groupe et de ses musiciens ;
- agenda des concerts, cérémonies, passages et répétitions ;
- galerie photos ;
- espace actualités ;
- page de contact avec enregistrement des messages dans la base de données ;
- affichage responsive sur mobile, tablette et ordinateur ;
- identité visuelle inspirée des affiches imprimées et du risograph.

### Contenus dynamiques

Les pages suivantes récupèrent leurs données depuis l'API FastAPI :

- actualités ;
- événements ;
- galerie ;
- membres ;
- commentaires ;
- formulaire de contact.

Chaque écran prévoit un état de chargement, une gestion d'erreur et un état vide lorsque l'API ne renvoie aucun contenu.

### Espace privé

- connexion par email et mot de passe ;
- récupération de la session avec `/auth/me` ;
- déconnexion ;
- stockage du token Bearer dans le navigateur ;
- création, modification et suppression des actualités ;
- affichage des droits selon le rôle ;
- commentaires réservés aux utilisateurs authentifiés.

## Architecture

```text
site-musique/
├── frontend/                 # Application React/Vite
│   ├── public/
│   ├── src/
│   │   ├── api/              # Client HTTP et appels API
│   │   ├── auth/             # Contexte de session et authentification
│   │   ├── components/       # Composants réutilisables
│   │   ├── data/             # Données de configuration du site
│   │   ├── pages/            # Pages liées aux routes
│   │   ├── styles/           # Styles globaux et styles de pages
│   │   ├── types/            # Types TypeScript de l'API et du site
│   │   └── utils/            # Fonctions utilitaires
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # API FastAPI/PostgreSQL
    ├── app/
    │   ├── api/              # Routes HTTP et dépendances
    │   ├── core/             # Configuration de l'application
    │   ├── db/               # Connexion SQLAlchemy
    │   ├── models/           # Modèles de base de données
    │   ├── schemas/          # Schémas Pydantic
    │   ├── main.py           # Point d'entrée FastAPI
    │   └── seed.py           # Données de démonstration
    ├── alembic/              # Migrations de base de données
    ├── docker-compose.yml    # PostgreSQL et pgAdmin
    ├── requirements.txt
    └── .env.example
```

## Prérequis

Installer les outils suivants :

- Node.js 20 ou version plus récente ;
- npm ;
- Python 3.11 ou version plus récente ;
- Docker et Docker Compose ;
- Git.

Vérifier les versions :

```bash
node --version
npm --version
python3 --version
docker --version
docker compose version
```

## Installation rapide

### 1. Installer le frontend

```bash
cd /home/barbouche/Documents/site-musique/frontend
npm install
cp .env.example .env
```

Le fichier `.env` doit contenir :

```env
VITE_API_URL=http://localhost:8000/api/v1
```

### 2. Installer le backend

```bash
cd /home/barbouche/Documents/site-musique/backend
cp .env.example .env
docker compose up -d db
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
alembic upgrade head
python -m app.seed
```

Le fichier `.env` du backend doit au minimum contenir :

```env
APP_NAME=Clique de Doissin API
APP_ENV=development
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/clique_doissin
CORS_ORIGINS=http://localhost:5173
AUTH_SECRET=remplacer-par-un-secret-aleatoire
AUTH_TOKEN_EXPIRE_MINUTES=1440
```

## Démarrer le projet

Le frontend et le backend se lancent dans deux terminaux séparés.

### Terminal 1 : backend

```bash
cd /home/barbouche/Documents/site-musique/backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

L'API sera disponible sur :

- API : http://localhost:8000
- Swagger : http://localhost:8000/docs
- ReDoc : http://localhost:8000/redoc
- Health check : http://localhost:8000/api/v1/health

### Terminal 2 : frontend

```bash
cd /home/barbouche/Documents/site-musique/frontend
npm run dev
```

Le site sera disponible sur :

```text
http://localhost:5173
```

Important : la commande de démarrage du frontend est `npm run dev`. Le projet ne définit pas de script `npm start`.

### Arrêter les services

Pour arrêter l'API, utilisez `Ctrl+C` dans son terminal.

Pour arrêter PostgreSQL :

```bash
cd /home/barbouche/Documents/site-musique/backend
docker compose down
```

Pour supprimer également les données PostgreSQL locales :

```bash
docker compose down -v
```

Cette dernière commande supprime le volume de base de données. Elle doit être utilisée uniquement si la perte des données locales est volontaire.

## Variables d'environnement

### Frontend

Fichier : `.env`

| Variable | Description | Exemple |
| --- | --- | --- |
| `VITE_API_URL` | URL de base de l'API FastAPI | `http://localhost:8000/api/v1` |

Les variables préfixées par `VITE_` sont exposées au navigateur. Il ne faut donc jamais y placer de mot de passe, de secret JWT ou de clé privée.

### Backend

Fichier : `backend/.env`

| Variable | Description | Exemple |
| --- | --- | --- |
| `APP_NAME` | Nom affiché par l'API | `Clique de Doissin API` |
| `APP_ENV` | Environnement d'exécution | `development` |
| `DATABASE_URL` | URL SQLAlchemy PostgreSQL | `postgresql+psycopg://...` |
| `CORS_ORIGINS` | Origines frontend autorisées, séparées par des virgules | `http://localhost:5173` |
| `AUTH_SECRET` | Secret utilisé pour signer les tokens | secret aléatoire long |
| `AUTH_TOKEN_EXPIRE_MINUTES` | Durée de validité du token | `1440` |

Ne jamais committer `.env`. Les fichiers `.env.example` servent uniquement de modèles.

## Utilisation du site

### Routes publiques frontend

| Route | Page |
| --- | --- |
| `/` | Accueil |
| `/le-groupe` | Présentation du groupe |
| `/membres` | Membres et instruments |
| `/agenda` | Calendrier des événements |
| `/galerie` | Galerie photos |
| `/actus` | Liste des actualités |
| `/actus/:articleId` | Détail d'une actualité et commentaires |
| `/contact` | Formulaire de contact |
| `/gestion` | Connexion et espace privé |

### Lire une actualité

Les actualités publiées sont chargées depuis l'API. Une actualité possède notamment un titre, un slug, un contenu, une image optionnelle et un statut de publication.

### Publier un commentaire

La lecture des commentaires est publique. La publication nécessite une connexion :

1. ouvrir `/gestion` ;
2. se connecter avec un compte valide ;
3. ouvrir une actualité ;
4. écrire un commentaire ;
5. cliquer sur `Publier`.

### Compte de démonstration

Le seed crée le compte initial suivant :

```text
Email : superadmin@clique-doissin.fr
Mot de passe : change-me-please
```

Ce compte sert uniquement au développement. Son mot de passe doit être changé avant toute mise en ligne.

## Authentification et rôles

Le backend renvoie un token Bearer après une connexion réussie. Le frontend le conserve localement et l'ajoute automatiquement aux requêtes protégées.

### Rôles

| Rôle | Accès |
| --- | --- |
| `superadmin` | Gestion des comptes et de tous les contenus |
| `admin` | Gestion des actualités, événements, galerie, membres et modération |
| `utilisateur` | Connexion, profil et commentaires |

Le frontend masque les fonctionnalités selon le rôle, mais la sécurité réelle est assurée par les dépendances d'autorisation du backend. Il ne faut jamais considérer le rôle affiché dans le navigateur comme une preuve d'autorisation.

## API disponible

Base URL locale :

```text
http://localhost:8000/api/v1
```

### Système

```http
GET /health
```

### Authentification

```http
POST /auth/login
GET  /auth/me
POST /auth/users                 # superadmin uniquement
```

Exemple de connexion :

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"superadmin@clique-doissin.fr","password":"change-me-please"}'
```

### Actualités

```http
GET    /news                    # articles publiés
POST   /news                    # admin ou superadmin
PUT    /news/{article_id}       # admin ou superadmin
DELETE /news/{article_id}       # admin ou superadmin
```

### Événements

```http
GET    /events
POST   /events                  # admin ou superadmin
PUT    /events/{event_id}       # admin ou superadmin
DELETE /events/{event_id}       # admin ou superadmin
```

### Galerie

```http
GET    /gallery
POST   /gallery                 # admin ou superadmin
PUT    /gallery/{photo_id}      # admin ou superadmin
DELETE /gallery/{photo_id}      # admin ou superadmin
```

### Membres

```http
GET    /members
POST   /members                 # admin ou superadmin
PUT    /members/{member_id}     # admin ou superadmin
DELETE /members/{member_id}     # admin ou superadmin
```

### Commentaires

```http
GET    /comments/{content_type}/{content_id}
POST   /comments                # utilisateur connecté
DELETE /comments/{comment_id}   # admin ou superadmin
```

Les types de contenus prévus sont `news`, `photo` et `event`.

### Contact

```http
POST /contact
GET  /contact/messages          # admin ou superadmin
```

## Organisation du code frontend

### Client API

Le fichier `src/api/client.ts` centralise les appels HTTP. Il :

- construit les URLs à partir de `VITE_API_URL` ;
- ajoute automatiquement `Accept: application/json` ;
- ajoute `Content-Type: application/json` pour les requêtes avec corps ;
- ajoute le token Bearer s'il existe ;
- transforme les réponses HTTP en erreurs `ApiError` ;
- gère les réponses `204 No Content`.

### Authentification

`src/auth/AuthContext.tsx` expose :

- `user` : utilisateur courant ou `null` ;
- `isLoading` : récupération initiale de la session ;
- `login(email, password)` ;
- `logout()`.

### Types

Les interfaces correspondant aux réponses de l'API sont dans `src/types/api.ts`. Elles utilisent les noms réels renvoyés par FastAPI, notamment `image_url`, `created_at`, `first_name` et `joined_year`.

## Organisation du code backend

- `app/main.py` : création de l'application, CORS et enregistrement des routers ;
- `app/api/deps.py` : session SQLAlchemy, hash des mots de passe, tokens et contrôle des rôles ;
- `app/api/v1/routes/` : endpoints REST ;
- `app/models/` : tables SQLAlchemy ;
- `app/schemas/` : validation Pydantic des entrées et sorties ;
- `app/db/session.py` : moteur et fabrique de sessions ;
- `alembic/versions/` : historique des migrations ;
- `app/seed.py` : données initiales de développement.

## Tests et validation

### Frontend

Depuis `frontend/` :

```bash
npm run lint
npm run build
```

Prévisualiser le build de production :

```bash
npm run preview
```

### Backend

Depuis `backend/`, avec l'environnement virtuel activé :

```bash
python -m compileall -q app
alembic upgrade head
```

Vérifier l'API :

```bash
curl http://localhost:8000/api/v1/health
curl http://localhost:8000/api/v1/news
curl http://localhost:8000/api/v1/events
```

Réponse attendue pour le health check :

```json
{"status":"ok"}
```

### Vérification manuelle recommandée

1. démarrer PostgreSQL ;
2. appliquer les migrations ;
3. exécuter le seed ;
4. démarrer FastAPI ;
5. vérifier `/api/v1/health` ;
6. démarrer Vite ;
7. vérifier l'accueil, l'agenda, la galerie et les membres ;
8. vérifier les actualités ;
9. tester la connexion superadmin ;
10. créer, modifier puis supprimer une actualité ;
11. vérifier qu'un utilisateur non connecté ne peut pas commenter ;
12. tester le formulaire de contact.

## Dépannage

### `npm start` échoue

Le projet utilise Vite et ne définit pas de script `start`.

```bash
npm run dev
```

### `Failed to fetch` dans le frontend

Vérifier les points suivants :

1. FastAPI est démarré sur le port `8000` ;
2. `frontend/.env` contient `VITE_API_URL=http://localhost:8000/api/v1` ;
3. le serveur Vite a été redémarré après une modification de `.env` ;
4. `CORS_ORIGINS` contient l'origine exacte du frontend ;
5. PostgreSQL est démarré.

Tester directement :

```bash
curl http://localhost:8000/api/v1/health
```

### `ModuleNotFoundError: No module named fastapi`

Activer le bon environnement Python puis installer les dépendances :

```bash
cd /home/barbouche/Documents/site-musique/backend
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Si l'environnement est incomplet, le recréer :

```bash
rm -rf .venv
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Erreur de connexion PostgreSQL

Vérifier le conteneur :

```bash
docker compose ps
docker compose logs db
```

Démarrer le service si nécessaire :

```bash
docker compose up -d db
```

### Les actualités sont absentes

Vérifier que les migrations et le seed ont été exécutés :

```bash
alembic upgrade head
python -m app.seed
```

Le frontend n'utilise plus les anciennes données statiques pour les pages connectées à l'API.

### Le token ne fonctionne plus

Le token est stocké dans le `localStorage` du navigateur. Pour repartir d'une session propre :

1. ouvrir les outils développeur ;
2. supprimer la clé `clique-doissin-token` ;
3. recharger la page ;
4. se reconnecter.

## Sécurité

Avant une mise en production :

- remplacer le mot de passe du compte seed ;
- générer un `AUTH_SECRET` aléatoire et long ;
- ne pas versionner `.env` ;
- restreindre `CORS_ORIGINS` au domaine réel ;
- utiliser HTTPS ;
- ne jamais exposer `DATABASE_URL` au frontend ;
- vérifier les permissions côté backend, pas uniquement dans l'interface ;
- ajouter une limitation de débit sur la connexion et le formulaire de contact ;
- prévoir une modération des commentaires ;
- sauvegarder PostgreSQL régulièrement ;
- remplacer les URLs d'images de démonstration par un stockage maîtrisé si nécessaire.

## Déploiement

### Build frontend

```bash
cd /home/barbouche/Documents/site-musique/frontend
npm ci
npm run build
```

Le dossier `dist/` contient les fichiers statiques à servir avec un serveur web comme Nginx, Caddy ou un hébergeur statique.

Définir avant le build la vraie URL de l'API :

```env
VITE_API_URL=https://api.exemple.fr/api/v1
```

### Backend

En production, le backend doit :

1. utiliser une base PostgreSQL persistante ;
2. définir toutes les variables secrètes dans l'environnement du serveur ;
3. appliquer les migrations avec `alembic upgrade head` ;
4. être servi derrière HTTPS et un reverse proxy ;
5. utiliser plusieurs workers selon la plateforme ;
6. journaliser les erreurs sans exposer les secrets.

Ne pas utiliser le serveur de développement `uvicorn --reload` en production.

## Évolutions prévues

- ajouter une interface complète de gestion des événements ;
- ajouter une interface complète de gestion de la galerie ;
- ajouter une interface complète de gestion des membres ;
- ajouter la gestion des comptes utilisateurs par le superadmin ;
- ajouter la modération des commentaires dans le dashboard ;
- ajouter l'upload d'images plutôt que des URLs externes ;
- ajouter des tests automatisés frontend et backend ;
- ajouter pagination, recherche et filtres aux contenus ;
- ajouter une protection anti-spam au contact et aux commentaires ;
- ajouter une stratégie de rafraîchissement ou d'expiration plus avancée des sessions.

## Licence

Projet privé de La Clique de Doissin. Ajouter ici les informations de licence si le projet doit être distribué publiquement.
