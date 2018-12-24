"use strict"

require('dotenv').config();

const WPAPI = require('wpapi');

class BlogSite {

	constructor(endpoint,username,password) {
		this.wp = new WPAPI({
			endpoint: endpoint,
			username: username,
			password: password
		});

	}

	//get all blogPosts
	getAll_blogPosts(){
		return new Promise((resolve, reject) => {
			this.wp.posts().then(function (data) {
				resolve(data);
			}).catch(function (err) {
				reject(err);
			});
		});
	};

	//get a specific blogPost
	getA_blogPost(postID){
		return new Promise((resolve, reject) => {
			this.wp.posts().id(postID)
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	//create a new blogPost
	createBlogPost(title, content, authorID, postingStatus){
		return new Promise((resolve, reject) => {
			this.wp.posts().create({
				title: title,
				content: content,
				author: authorID,
				status: postingStatus || 'publish'
			}).then((response) => {
				resolve(response);
			}).catch((err) => {
				reject(err);
			});
		})
	};



}

const FN = new BlogSite(process.env.BlogsFNendpoint , process.env.BlogsFNuname , process.env.BlogsFNpwd);
const JIAM = new BlogSite(process.env.BlogsJIAMendpoint , process.env.BlogsJIAMuname , process.env.BlogsJIAMpwd);
//const FSM = new BlogSite(process.env.BlogsFSMendpoint , process.env.BlogsFSMuname , process.env.BlogsFSMpwd);
//const FNSTORE = new BlogSite(process.env.BlogsFNSTOREendpoint , process.env.BlogsFNSTOREuname , process.env.BlogsFNSTOREpwd);

FN.getAll_blogPosts()
.then((data)=>{
	console.log(data.length)
	
	data.map((x,i)=>{
		//title, content, authorID, postingStatus
		console.log(`${i+1} : ${x.title.rendered}`);
		JIAM.createBlogPost(x.title.rendered,x.content.rendered)
		.then((response)=>{
		//console.log(response)
		})
		.catch((err)=>{
		//console.log(err)
		})
	}) 
})
.catch((err)=>{
	console.log(err)
})