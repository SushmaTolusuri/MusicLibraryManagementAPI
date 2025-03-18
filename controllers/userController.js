// userController.js

// needed for web token authentication
import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js';

import User from '../models/userModel.js'
import Bcrypt from 'bcryptjs'

import mongoose from 'mongoose';
import conn from '../config/default.json' with { type: "json" };
/**
* Handle login user action, when a user visits /login with a POST
* @param req - the form data sent with the request
* @param res - the result to send back to the user
*/
export const login = function(req,res){
	//connect to mongoose and set connection variable
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
				user= await User.findOne({username:req.body.username});

				db.close(); // Needs to close connection, In general you don't close & re-create often. But needed for test scripts - You might use connection pooling in real-time. 
        		return user;
			}
		}catch (err) {
        	(db) && db.close(); /** Needs to close connection -
            Only if mongoose.connect() is success & fails after it, as db connection is established by then. */
            console.log('Error at dbConnect ::', err)
            throw err;
    	}

    	
    }

    dbConnect().then(user => {
    	if(!user){
			return res.status(401).send({message: "user not found."});
		}else{
			if(Bcrypt.compareSync(req.body.password, user.password)){
				var token = jwt.sign({id:req.body.username}, config.secret, {expiresIn:86400});
				res.status(200).send({message:"Login successful", accessToken:token})
			}else{
				//if we found a user, but password is invalid, return message.
				return res.status(401).send({message:"Invalid password"});
			}
		}	
    });
}

	

