require('dotenv').config();

var simpleGit = require('simple-git');

simpleGit()
     .add('./*')
     .commit("first commit!")
     .addRemote('origin', 'https://github.com/DaggieBlanqx/Notification-Stream.git')
     .push(['-u', 'origin', 'master'], () => console.log('done'));