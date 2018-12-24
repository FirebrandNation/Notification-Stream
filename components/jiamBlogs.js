"use strict"
require('dotenv').config();

const WPAPI = require( 'wpapi' );

const wp = new WPAPI({
	endpoint: process.env.BlogsJIAMendpoint ,
	username: process.env.BlogsJIAMuname ,
    password: process.env.BlogsJIAMpwd 
});

//console.log(wp)

 wp.posts().then(function( data ) {
    console.log(data)
            resolve(data);
        }).catch(function( err ) {
                //console.log(err)
                console.log(err.stack);


            reject(err);
        });


        /*

//get all blogPosts
const getAll_blogPosts = ()=>{
    return new Promise((resolve,reject)=>{
        wp.posts().then(function( data ) {
            resolve(data);
        }).catch(function( err ) {
            reject(err);
        });
    });
};


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
};


//create a new blogPost
const createBlogPost = (title,content,authorID,postingStatus)=>{
    return new Promise((resolve,reject)=>{
        wp.posts().create({
            title: title,
            content: content,
            author:authorID,
            status: postingStatus || 'publish'
        }).then(( response )=>{
            resolve(response);
        }).catch((err)=>{
            reject(err);
        });
    })
};



module.exports = {
    getAll_blogPosts,
    getA_blogPost,
    createBlogPost
};
*/