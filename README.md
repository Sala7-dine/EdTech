# 🎓 EdTech - Système de Gestion de Présence

Application complète de gestion de présence pour établissements scolaires, développée avec TypeScript, Express, Prisma et PostgreSQL.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Stack Technique](#-stack-technique)
- [Installation](#-installation)
- [Documentation API](#-documentation-api)
- [Structure du Projet](#-structure-du-projet)
- [Tests](#-tests)

## ✨ Fonctionnalités

### ✅ Modules Implémentés

- **🔐 Authentification**
  - Inscription (Admin/Enseignant)
  - Connexion avec JWT
  - Déconnexion
  - Middleware de protection des routes

- **📚 Gestion des Classes**
  - Créer, modifier, supprimer des classes
  - Lister toutes les classes
  - Voir les étudiants d'une classe

- **👥 Gestion des Étudiants**
  - Créer, modifier, supprimer des étudiants
  - Associer les étudiants aux classes
  - Changer un étudiant de classe
  - Lister les étudiants par classe

- **📖 Gestion des Matières**
  - Créer, modifier, supprimer des matières
  - Lister toutes les matières
  - Gestion des matières enseignées

### 🚧 Modules à Venir

- Gestion des sessions de cours
- Enregistrement des présences
- Rapports et statistiques
- Interface frontend React

## 🛠 Stack Technique

### Backend

- **Runtime:** Node.js 18+
- **Framework:** Express 5.2.1
- **Langage:** TypeScript 5.x
- **ORM:** Prisma 7.2.0
- **Base de données:** PostgreSQL
- **Authentification:** JWT (jsonwebtoken 9.0.3)
- **Sécurité:** bcrypt 6.0.0
- **Validation:** TypeScript strict mode

### Frontend (À venir)

- React + TypeScript
- Vite
- Axios pour les requêtes API

### Outils de développement

- nodemon pour le hot reload
- ts-node pour exécuter TypeScript
- Postman pour les tests API

## 🚀 Installation

### Prérequis

- Node.js 18 ou supérieur
- PostgreSQL 14 ou supérieur
- npm ou yarn

### Configuration de la base de données

1. Créer une base de données PostgreSQL :

```bash
createdb edtech
```

2. Configurer les variables d'environnement :

Créer un fichier `.env` dans le dossier `backend/` :

```env
DATABASE_URL="postgresql://username:password@localhost:5432/edtech"
JWT_SECRET="votre_secret_jwt_super_securise"
PORT=3000
NODE_ENV=development
```

### Installation du backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Exécuter les migrations
npx prisma migrate dev

# Démarrer le serveur en mode développement
npm run dev
```

Le serveur démarrera sur `http://localhost:3000`

### Vérification de l'installation

```bash
curl http://localhost:3000/api/health
# Réponse attendue: {"status":"ok","message":"Server is running"}
```

## 📚 Documentation API

### Base URL

```
http://localhost:3000/api
```

### Modules disponibles

- [**Authentification**](backend/src/docs/AUTH.md) - Documentation complète de l'authentification
- [**Classes**](backend/src/docs/CLASSES.md) - Gestion des classes
- [**Étudiants**](backend/src/docs/STUDENTS.md) - Gestion des étudiants
- [**Matières**](backend/src/docs/SUBJECTS.md) - Gestion des matières

### Collection Postman

Une collection Postman complète est disponible pour tester tous les endpoints :

📁 **Fichiers:**
- `postman/EdTech-API.postman_collection.json` - Collection complète
- `postman/EdTech-Development.postman_environment.json` - Environnement de développement
- `postman/README.md` - Guide d'utilisation

**Import dans Postman:**
1. Ouvrir Postman
2. Importer les deux fichiers JSON
3. Sélectionner l'environnement "EdTech - Development"
4. Commencer avec "Login" pour obtenir un token

### Endpoints principaux

#### Authentification
```
POST   /api/auth/register   - Inscription
POST   /api/auth/login      - Connexion
POST   /api/auth/logout     - Déconnexion
```

#### Classes
```
POST   /api/classes              - Créer une classe
GET    /api/classes              - Lister les classes
GET    /api/classes/:id          - Détails d'une classe
GET    /api/classes/:id/students - Étudiants d'une classe
PUT    /api/classes/:id          - Modifier une classe
DELETE /api/classes/:id          - Supprimer une classe
```

#### Étudiants
```
POST   /api/students              - Créer un étudiant
GET    /api/students              - Lister les étudiants
GET    /api/students/:id          - Détails d'un étudiant
GET    /api/students/class/:id    - Étudiants d'une classe
PUT    /api/students/:id          - Modifier un étudiant
DELETE /api/students/:id          - Supprimer un étudiant
```

**Note:** Tous les endpoints (sauf auth) nécessitent un token JWT :
```
Authorization: Bearer <token>
```

## 📁 Structure du Projet

```
EdTech/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration (DB, env)
│   │   ├── controllers/      # Handlers HTTP
│   │   ├── enums/           # Énumérations TypeScript
│   │   ├── middlewares/     # Auth, validation, erreurs
│   │   ├── models/          # Interactions base de données
│   │   ├── routes/          # Définition des routes
│   │   ├── services/        # Logique métier
│   │   ├── types/           # Interfaces TypeScript
│   │   ├── utils/           # Utilitaires (JWT, hash, date)
│   │   ├── docs/            # Documentation des modules
│   │   ├── app.ts           # Configuration Express
│   │   └── server.ts        # Point d'entrée
│   ├── prisma/
│   │   ├── schema.prisma    # Schéma de base de données
│   │   └── migrations/      # Migrations SQL
│   ├── .env                 # Variables d'environnement
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # (À venir)
├── postman/                # Collections de test
└── README.md
```

## 🧪 Tests

### Tests manuels avec cURL

#### 1. Créer un compte admin

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@edtech.com",
    "password": "Admin123!",
    "role": "ADMIN"
  }'
```

#### 2. Se connecter

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@edtech.com",
    "password": "Admin123!"
  }'
```

Sauvegarder le token retourné.

#### 3. Créer une classe

```bash
TOKEN="votre_token_ici"

curl -X POST http://localhost:3000/api/classes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name": "6ème A"}'
```

#### 4. Créer un étudiant

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "firstName": "Jean",
    "lastName": "Dupont",
    "classId": 1
  }'
```

#### 5. Lister les étudiants d'une classe

```bash
curl -X GET http://localhost:3000/api/classes/1/students \
  -H "Authorization: Bearer $TOKEN"
```

### Tests avec Postman

Utiliser la collection fournie dans `postman/EdTech-API.postman_collection.json`

Tous les tests incluent :
- ✅ Vérification du code de statut
- ✅ Validation de la structure de réponse
- ✅ Sauvegarde automatique des variables (tokens, IDs)

## 🗄 Schéma de Base de Données

```prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  password String
  role     Role     (ADMIN | TEACHER)
  sessions Session[]
}

model Class {
  id       Int       @id @default(autoincrement())
  name     String
  students Student[]
  sessions Session[]
}

model Student {
  id        Int        @id @default(autoincrement())
  firstName String
  lastName  String
  class     Class      @relation
  classId   Int
  presences Presence[]
}

model Subject {
  id       Int       @id @default(autoincrement())
  name     String
  sessions Session[]
}

model Session {
  id        Int        @id @default(autoincrement())
  date      DateTime
  class     Class      @relation
  subject   Subject    @relation
  teacher   User       @relation
  presences Presence[]
}

model Presence {
  id      Int            @id @default(autoincrement())
  status  PresenceStatus (PRESENT | ABSENT | LATE | EXCUSED)
  student Student        @relation
  session Session        @relation
}
```

## 🔐 Sécurité

- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ Tokens JWT avec expiration (7 jours)
- ✅ Validation des entrées utilisateur
- ✅ Protection CORS configurée
- ✅ Middleware d'authentification sur toutes les routes protégées
- ✅ Gestion centralisée des erreurs
- ✅ Variables d'environnement pour les secrets

## 👥 Rôles et Permissions

### ADMIN
- Accès complet à toutes les fonctionnalités
- Gestion des utilisateurs
- Gestion des classes, étudiants, matières
- Consultation des rapports

### TEACHER (À implémenter)
- Gestion des sessions de cours
- Enregistrement des présences
- Consultation des étudiants de ses classes

## 📝 Prochaines Étapes

1. **Backend:**
   - [ ] Module de gestion des matières
   - [ ] Module de gestion des sessions
   - [ ] Module de gestion des présences
   - [ ] Système de rapports et statistiques
   - [ ] Tests unitaires et d'intégration
   - [ ] Permissions basées sur les rôles

2. **Frontend:**
   - [ ] Interface d'authentification
   - [ ] Dashboard administrateur
   - [ ] Gestion des classes et étudiants
   - [ ] Interface de prise de présence
   - [ ] Rapports et visualisations

3. **DevOps:**
   - [ ] Configuration Docker
   - [ ] CI/CD avec GitHub Actions
   - [ ] Documentation Swagger/OpenAPI
   - [ ] Logs avec Winston

## 🤝 Contribution

Ce projet est en développement actif. Les contributions sont les bienvenues !

## 📄 Licence

Ce projet est à usage éducatif.

---

**Développé avec ❤️ pour faciliter la gestion scolaire**