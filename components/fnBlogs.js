"use strict"
require('dotenv').config();

const WPAPI = require( 'wpapi' );

const wp = new WPAPI({
	endpoint: process.env.BlogsFNendpoint ,
	username: process.env.BlogsFNuname ,
    password: process.env.BlogsFNpwd 
});


//get all blogPosts
const getAll_blogPosts = ()=>{
    return new Promise((resolve,reject)=>{
        wp.posts().then(function( data ) {
            resolve(data);
        }).catch(function( err ) {
            reject(err);
        });
    });
}


//get a specific blogPost
const getA_blogPost = (postID)=>{
    return new Promise((resolve,reject)=>{
        wp.posts().id(postID)
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject(err);
        });
    });
}



module.exports = {
    getAll_blogPosts,
    getA_blogPost
};