var simpleGit = require('simple-git');
module.exports = ()=>{
	simpleGit()
	.add('./*')
	.commit("added code | fixed some bugs ... wanna commit!")
	.push(['-u', 'origin', 'master'], () => console.log('made git pushes'));
};