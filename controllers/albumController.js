// userController.js

// needed for web token authentication
import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js';

import Album from '../models/albumModel.js'
import Bcrypt from 'bcryptjs'

import mongoose from 'mongoose';
import conn from '../config/default.json' with { type: "json" };


// 1. Authenticated Route for Creating an Album
export const createAlbum = function (req, res) {
	const dbConnect = async () => {
		let db=null;
		let artist=null
		try{
			await mongoose.connect(conn.DBHost, {});
			db=mongoose.connection
			if(!db){
				console.log("Error connecting DB");
			}else{
				console.log("DB Connection Successful")
				const newAlbum= new Album();

				newAlbum.name = req.body.name;
				newAlbum.artist_id = req.body.artist_id;

			    const result=await newAlbum.save()
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

// 2. Authenticated Route for Getting all Albums
export const readAlbums = function (req, res) {
	const dbConnect = async () => {
		let db=null;
		let album=null

		try{
			await mongoose.connect(conn.DBHost, {});
			db=mongoose.connection
			if(!db){
				console.log("Error connecting DB");
			}else{
				console.log("DB Connection Successful")
				
			    const result=await Album.find()
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

// 3. Authenticated Route for Updating an Album
export const updateAlbum = function (req, res) {
	const dbConnect = async () => {
		let db=null;
		let album=null

		try{
			await mongoose.connect(conn.DBHost, {});
			db=mongoose.connection
			if(!db){
				console.log("Error connecting DB");
			}else{
				console.log("DB Connection Successful")
				
			    const result=await Album.findByIdAndUpdate(req.body.id,{name:req.body.name,artist_id:req.body.artist_id})
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



// 4. Authenticated Route for deleting an Album
export const deleteAlbum = function (req, res) {
	const dbConnect = async () => {
		let db=null;
		let album=null

		try{
			await mongoose.connect(conn.DBHost, {});
			db=mongoose.connection
			if(!db){
				console.log("Error connecting DB");
			}else{
				console.log("DB Connection Successful")
				
			    const result=await Album.findByIdAndDelete(req.body.id)
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



	

