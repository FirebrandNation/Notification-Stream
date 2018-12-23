"use strict"

const WPAPI = require( 'wpapi' );



class BlogPost{
	constructor(endpoint,username,password){
		//const wp = new WPAPI({
	this.endpoint = endpoint;//'https://blogs.firebrandnation.com/wp-json',
	this.username = username ;//'daggieblanqx',
    this.password = password ;//'83qV9HC5JJ8FrcV'
//});

	}

	wp(){
		return new WPAPI({
			endpoint : this.endpoint,
			username : this.username,
			password : this.password
		})

		//return wp;
	}

	create(){
		this.wp.posts().create({
    // "title" and "content" are the only required properties
    title: '[TEST]Your Post Title',
    content: '[CONTENT] Your post content',
    author:2,
    // Post will be created as a draft by default if a specific "status"
    // is not specified
    status: 'publish'
}).then(function( response ) {
    // "response" will hold all properties of your newly-created post,
    // including the unique `id` the post was assigned on creation
    console.log( response.id );
}).catch((err)=>{
	console.log(`err : ${JSON.stringify(err)}`);
})
	}
}

var bp = new BlogPost('https://blogs.firebrandnation.com/wp-json','daggieblanqx','83qV9HC5JJ8FrcV');

bp.create()