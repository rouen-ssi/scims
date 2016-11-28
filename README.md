# SciMS - Le CMS open-source pour les scientifiques [![Build Status](https://travis-ci.org/rouen-ssi/scims.svg?branch=master)](https://travis-ci.org/rouen-ssi/scims)

## Installation

Pour commencer, installez NPM (gestionnaire de paquets).
Rendez-vous sur https://nodejs.org/en/download/ pour les instructions.

Ensuite, installez webpack en utilisant NPM.
Webpack est une application qui permet de fusionner tous les fichiers Javascript, CSS, etc.
```
# npm install -g webpack
```

Installez les dépendances du projet :
```
npm install
```

Lancez la construction du projet.
Cela lancera Webpack qui fusionnera les fichiers Javascript, transpilera le code, etc.
```
npm build
```

Pour tester le bon fonctionnement de l'application, vous pouvez lancer le serveur de test :
```
npm start
```
**Attention**: ce serveur ne doit pas être utilisé en production. Vous pouvez héberger l'application avec un serveur Nginx, par exemple.
