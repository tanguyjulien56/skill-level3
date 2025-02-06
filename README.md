# SkillLevel3

## Description

**SkillLevel3** is a web application built with Vite, React, and Redux. It allows users to enter their personal information (first name, last name, date of birth) and display a profile with photo and birthday Countdown.

## Features
- **Home Page** : Displays the user profile if available, otherwise prompts the user to enter information.
- **Information** Page : A form allowing users to enter or update their details with validation.
- **Data Storage** : Uses Redux to store user information.
- **Theme Toggle** : A dedicated component enables switching between themes.
- **Birthday Countdown**: A utility function calculates the days remaining until the user's birthday.
- **Custom Hook useUserData**: Manages API calls and user data processing.

## Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/tanguyjulien56/skill-level3.git
cd skill-level3
```

### 2. Install Dependencies

Install the necessary dependencies:

```bash
npm install
```

### 3. Start the Application

- **Development mode** on **localhost**:

```bash
npm run dev
```

- **Development mode** on your **local network** (useful for testing on other devices):

```bash
sudo npm run dev -- --host
```

### 4. Build the Application

To create a production-ready build of the application:

```bash
npm run build
```

This will generate the build files in the `dist/` folder, ready for deployment.

## Tests

To run the Jest tests:

```bash
npm test
```

## Technologies Used

- **Vite** for fast development
- **React** for the user interface
- **TypeScript** Typing and errors handling
- **Redux** for state management
- **Jest** for testing
- **Formik** for handling forms
- **Yup** for form validation
- **React Router DOM** for routing
- **Tailwind CSS** and **DaisyUi** for style CSS
- **Axios** API requests

## Test Cases

### Navbar Component

- **Should display navigation links in DesktopMenu**.
- **Should display navigation links in MobileMenu**.

### UseProfileCard Component

- **Should display the default image if `imageUrl` is empty**.
- **Should display the user image if `imageUrl` is present**.
- **Should display the birthday message with the number of days remaining**.
- **Should display a generic message if `daysToBirthday` is not a number**.

### HomePage Component

- **Should display an error message if no user data is available**.
- **Should display the `UserProfileCard` if valid user data is available**.

### InformationPage Component

- **Should render the form with initial values from Redux**.
- **Should display validation errors when submitting with empty fields**.
- **Should display a modal after successful form submission**.
- **Should not submit the form with invalid data**.

### UseUserData Hook

- **Should display the default image and handle invalid birthdays**.
- **Should handle errors and display an error message**.

## Tool and Library Versions

**Node.js**: v20.9.0

### Main Dependencies:

- **@mui/icons-material**: ^6.4.1
- **@reduxjs/toolkit**: ^2.5.1
- **axios**: ^1.7.9
- **react**: ^18.3.1
- **react-dom**: ^18.3.1  ,
- **tailwindcss**: ^3.4.17
- **jest**: ^29.7.0,
- **@testing-library/react**: ^16.2.0


## RAPPEL TEST
# Test technique Citopia
## Objectif
- Le test doit être réalisé en utilisant ce dépôt comme base.
- Les travaux devront être testables sans aucune modification à apporter au code ou au paramétrage, et si besoin, en suivant une documentation pas-à-pas.
- Utilisez tous les outils nécessaires pour compléter les tâches.
- Portez une attention particulière à l'historique Git, comme s'il s'agissait d'une situation réelle en projet.

## Finalisation de l'exercice
- Créez une pull request sur le dépôt avec votre travail.
- Le travail doit être testable et documenté.

## Contraintes
### Dans cet exercice, vous devrez utiliser :
- React
- TypeScript

### En option :
- Ajouter une feature qui vous semble interressante
- Utiliser Redux Saga.

## Exercices à réaliser

### R1 : Création de l'application
Créez une application fictive comportant les pages suivantes : Accueil, Informations.

- La page d'accueil devra afficher le contenu défini en R4.
- La page Informations devra afficher le contenu défini en R2.
- L'application devra intégrer une navigation permettant de passer d'une page à l'autre.
- L'application doit pouvoir être facilement lancée en mode développement (avec Hot Reloading) et compilée simplement pour une mise en production.

### R2 : Création d'un formulaire utilisateur
Ajoutez un formulaire sur la page Informations comportant les champs suivants :

- Nom
- Prénom
- Date de naissance

### R3 : Mise à jour automatique des données
Les modifications effectuées dans le formulaire doivent être enregistrées dans un état local sans cliquer sur un bouton "Enregistrer".
Pour ce faire veillez utiliser une solution de *state-management*

### R4 : Affichage dynamique sur la page d'accueil
Sur la page d'accueil :

- Faites un appel à l'API DummyJSON (https://dummyjson.com/docs) pour générer une image dynamique basée sur les données utilisateur (prénom et nom).
- L'image sera a afficher au dessus de la phrase : "Votre anniversaire est dans *X* jours" avec *X* le nombre de jours avant la date d'anniversaire spécifiée dans la partie Informations.
- Attention aux champs qui ne seraient pas encore définis

## Points d'attention
- Organisez votre code pour qu’il soit lisible et maintenable.
- Fournissez une documentation claire sur la manière d'exécuter, tester et déployer le projet.
- Adoptez les bonnes pratiques Git : commits clairs, messages explicites, etc.
- Bonus
  - Ajoutez des tests unitaires ou d’intégration (exemple : Jest, React Testing Library).
