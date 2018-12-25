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
const USAJIAM = new BlogSite(process.env.BlogsUSAJIAMendpoint , process.env.BlogsUSAJIAMuname , process.env.BlogsUSAJIAMpwd);
//const FSM = new BlogSite(process.env.BlogsFSMendpoint , process.env.BlogsFSMuname , process.env.BlogsFSMpwd);
//const FNSTORE = new BlogSite(process.env.BlogsFNSTOREendpoint , process.env.BlogsFNSTOREuname , process.env.BlogsFNSTOREpwd);

module.exports = {
	FN,
	JIAM,
	USAJIAM
}


