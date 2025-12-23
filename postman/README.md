# 📬 Collection Postman - EdTech API

Ce dossier contient les fichiers Postman pour tester l'API EdTech.

## 📁 Fichiers inclus

- **`EdTech-API.postman_collection.json`** - Collection complète des endpoints
- **`EdTech-Development.postman_environment.json`** - Variables d'environnement de développement

## 🚀 Comment importer dans Postman

### Méthode 1 : Import via l'interface

1. Ouvrez **Postman**
2. Cliquez sur **Import** (en haut à gauche)
3. Sélectionnez **Choose Files**
4. Importez les 2 fichiers :
   - `EdTech-API.postman_collection.json`
   - `EdTech-Development.postman_environment.json`

### Méthode 2 : Drag & Drop

1. Ouvrez **Postman**
2. Glissez-déposez les 2 fichiers JSON dans la fenêtre Postman

## ⚙️ Configuration

### 1. Sélectionner l'environnement

Après l'import, sélectionnez l'environnement **"EdTech - Development"** dans le menu déroulant en haut à droite.

### 2. Vérifier les variables

Les variables configurées :
- `base_url` : `http://localhost:3000`
- `auth_token` : (auto-rempli après login)
- `user_id` : (auto-rempli après login)
- `user_email` : (auto-rempli après login)
- `user_role` : (auto-rempli après login)

## 📋 Endpoints disponibles

### 🔐 Authentication

#### 1. Register - Admin
```
POST {{base_url}}/api/auth/register

Body (JSON):
{
  "email": "admin@edtech.com",
  "password": "Admin123!",
  "role": "ADMIN"
}

Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@edtech.com",
    "role": "ADMIN"
  }
}
```

#### 2. Register - Teacher
```
POST {{base_url}}/api/auth/register

Body (JSON):
{
  "email": "teacher@edtech.com",
  "password": "Teacher123!",
  "role": "TEACHER"
}
```

#### 3. Login
```
POST {{base_url}}/api/auth/login

Body (JSON):
{
  "email": "admin@edtech.com",
  "password": "Admin123!"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@edtech.com",
    "role": "ADMIN"
  }
}
```

### 🏥 Health Check

#### Server Health
```
GET {{base_url}}/api/health

Response (200):
{
  "status": "ok",
  "message": "Server is running"
}
```

## 🎯 Utilisation recommandée

### Workflow typique

1. **Vérifier le serveur** → `GET /api/health`
2. **Créer un admin** → `POST /api/auth/register` (Admin)
3. **Se connecter** → `POST /api/auth/login`
4. Le token est **automatiquement sauvegardé** dans `auth_token`
5. Les routes protégées utilisent automatiquement ce token

### Tests automatiques

Chaque endpoint inclut des tests automatiques qui :
- ✅ Vérifient le code de statut HTTP
- ✅ Valident la structure de la réponse
- ✅ Sauvegardent automatiquement le token après login
- ✅ Affichent des logs dans la console Postman

## 🔒 Routes protégées (à venir)

Les routes nécessitant une authentification utiliseront automatiquement le token JWT stocké dans `{{auth_token}}`.

Exemple d'utilisation :
```
Headers:
Authorization: Bearer {{auth_token}}
```

## 💡 Astuces

### Voir les logs
Ouvrez la **Console Postman** (View → Show Postman Console) pour voir :
- Les tokens sauvegardés
- Les résultats des tests
- Les erreurs détaillées

### Modifier l'URL du serveur
Si votre serveur tourne sur un autre port :
1. Allez dans **Environments**
2. Sélectionnez **EdTech - Development**
3. Modifiez `base_url`

### Tester en production
Créez un nouvel environnement "EdTech - Production" avec :
- `base_url` : `https://api.edtech.com` (votre URL de production)

## 📝 Notes

- Le mot de passe est hashé avec **bcrypt** côté serveur
- Les tokens JWT expirent après **7 jours** (configurable)
- Les rôles disponibles : `ADMIN`, `TEACHER`

## 🐛 Dépannage

**Erreur 500 - Server Error**
→ Vérifiez que le serveur backend est démarré (`npm run dev`)

**Erreur 401 - Unauthorized**
→ Le token a expiré ou est invalide, reconnectez-vous

**Erreur ECONNREFUSED**
→ Le serveur n'est pas accessible sur localhost:3000

---

✅ **Collection prête à l'emploi !**
