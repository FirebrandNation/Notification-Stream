require('dotenv').config();

var simpleGit = require('simple-git');

simpleGit()
     .add('./*')
     .commit("first commit!")
     .push(['-u', 'origin', 'master'], () => console.log('done'));