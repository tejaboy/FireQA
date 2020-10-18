# Serverless Question and Answer Web Application

Yes. There is still exist a server underneath. FireQA only supports Firebase.

[DEMO!](https://fireqa-git-test.web.app/#/)

## Required Envrionments/Tools/Languages (or whatever it is called)

* NodeJS
* NPM
* firebase-cli

## Required Firebase Services

* Authentication
* Firestore
* Hosting
* Functions

## Setting up

### Firebase Services

1. Create a new Firebase Project
2. Enable Google Authentication
3. Enable Firestore

### Default Documents

1. Create a collection: 'cache'
2. Create a document: 'latest'
3. Create a empty array field: 'questions'

*In the final release, this will be automated* //TODO

### Setting Local Project

1. Clone the repo
2. CD into the root directory
3. `firebase init`
4. `y`
5. Select (spacebar) 'Firestore', 'Functions' and 'Hosting'
6. Enter
7. Choose 'Use an existing project'
8. Select the desired Firebase Project

#### Firestore Setup

Default file names but do not overwrite existing content.


#### Functions Setup

Language: JavaScript
Default file names but do not overwrite existing content.
Install dependencies for npm now.
'build' as public directory.
Configure as single-page app.

For the rest you may go with your own preference.

### Enable Web App

1. On Project Overview, click on the Web icon.
2. Register an app (e.g. fireqa-web).
3. Copy and paste the Firebase Config object into src/firebase.js.

### Bulding App

1. On the root directory, run `npm install`
2. On the same directory, run `npm run build`

### Deploying the App

1. On the same directory, run `firebase deploy`
2. Follow the on-screen instruction to visit your Q&A site.

`npm run build`

(For the Firestore Security mode, choose the default)

## 