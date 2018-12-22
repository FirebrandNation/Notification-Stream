require('dotenv').config();

var simpleGit = require('simple-git');

runPush = ()=>{
	simpleGit()
     .add('./*')
     .commit("first commit!")
     .push(['-u', 'origin', 'master'], () => console.log('made git pushes'));
 };

 module.exports = runPush