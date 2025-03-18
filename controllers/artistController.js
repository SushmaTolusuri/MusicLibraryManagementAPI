// userController.js

// needed for web token authentication
import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js';

import Artist from '../models/artistModel.js'
import Bcrypt from 'bcryptjs'

import mongoose from 'mongoose';
import conn from '../config/default.json' with { type: "json" };


// 1. Authenticated Route for Creating an Artist
export const createArtist = function (req, res) {
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
				const newArtist= new Artist();
				newArtist.artist_id = req.body.artist_id;
			   	newArtist.name = req.body.name;
			  	newArtist.country = req.body.country;

			    const result=await newArtist.save()
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

// 2. Authenticated Route for Getting all Artists
export const readArtists = function (req, res) {
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
				
			    const result=await Artist.find()
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

// 3. Authenticated Route for Updating an Artist
export const updateArtist = function (req, res) {
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
				
			    const result=await Artist.findByIdAndUpdate(req.body.artist_id,{name:req.body.name,country:req.body.country})
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



// 4. Authenticated Route for deleting an Artist
export const deleteArtist = function (req, res) {
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
				
			    const result=await Artist.findByIdAndDelete(req.body.artist_id)
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



	

