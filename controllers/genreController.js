// userController.js

// needed for web token authentication
import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js';

import Genre from '../models/genreModel.js'
import Bcrypt from 'bcryptjs'

import mongoose from 'mongoose';
import conn from '../config/default.json' with { type: "json" };


// 1. Authenticated Route for Creating a Genre
export const createGenre = function (req, res) {
	const dbConnect = async () => {
		let db=null;
		let user=null
		try{
			await mongoose.connect(conn.DBHost, {});
			db=mongoose.connection
			if(!db){
				console.log("Error connecting DB");
			}else{
				console.log("DB Connection Successful")
				const newGenre = new Genre();
			   	newGenre.genre_id = req.body.genre_id;
			  	newGenre.name = req.body.name;

			    const result=await newGenre.save()
			    return result
			}

			db.close()
		}catch (err) {
        	(db) && db.close(); /** Needs to close connection -
            Only if mongoose.connect() is success & fails after it, as db connection is established by then. */
            console.log('Error at dbConnect ::', err)
            throw err;
    	}	
    }

    dbConnect().then(result => {
    	console.log(result)
    	if(!result){
			return res.status(401).send({message: "Data not inserted."});
		}else{
			return res.status(200).send({message:"Recorded Inserted"})
		}	
    });
    
}

// 2. Authenticated Route for Getting all Genres
export const readGenres = function (req, res) {
	const dbConnect = async () => {
		let db=null;
		let genre=null
		try{
			await mongoose.connect(conn.DBHost, {});
			db=mongoose.connection
			if(!db){
				console.log("Error connecting DB");
			}else{
				console.log("DB Connection Successful")
				
			    const result=await Genre.find()
			    return result
			}

			db.close()
		}catch (err) {
        	(db) && db.close(); /** Needs to close connection -
            Only if mongoose.connect() is success & fails after it, as db connection is established by then. */
            console.log('Error at dbConnect ::', err)
            throw err;
    	}	
    }

    dbConnect().then(result => {
    	return res.status(200).send(result)
    });    
}

// 3. Authenticated Route for Updating a genre
export const updateGenre = function (req, res) {
	const dbConnect = async () => {
		let db=null;
		let user=null
		try{
			await mongoose.connect(conn.DBHost, {});
			db=mongoose.connection
			if(!db){
				console.log("Error connecting DB");
			}else{
				console.log("DB Connection Successful")
				
			    const result=await  Genre.findByIdAndUpdate(req.body.genre_id,{ name: req.body.name})
			    return result
			}

			db.close()
		}catch (err) {
        	(db) && db.close(); /** Needs to close connection -
            Only if mongoose.connect() is success & fails after it, as db connection is established by then. */
            console.log('Error at dbConnect ::', err)
            throw err;
    	}	
    }

    dbConnect().then(result => {
    	return res.status(200).send(result)
    });    
}



// 4. Authenticated Route for deleting a genre
export const deleteGenre = function (req, res) {
	const dbConnect = async () => {
		let db=null;
		let genre=null

		try{
			await mongoose.connect(conn.DBHost, {});
			db=mongoose.connection
			if(!db){
				console.log("Error connecting DB");
			}else{
				console.log("DB Connection Successful")
				
			    const result=await Genre.findByIdAndDelete(req.body.genre_id)
			    return result
			}

			db.close()
		}catch (err) {
        	(db) && db.close(); /** Needs to close connection -
            Only if mongoose.connect() is success & fails after it, as db connection is established by then. */
            console.log('Error at dbConnect ::', err)
            throw err;
    	}	
    }

    dbConnect().then(result => {
    	if(!result){
			return res.status(401).send({message: "Record does not exist."});
    	}else{
    		return res.status(200).send({message: "Record has been deleted."})
    	}
    	
    });    
}



	

