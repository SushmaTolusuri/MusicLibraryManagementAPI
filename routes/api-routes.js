// Filename: api-routes.js
//Initialize express router
import express from 'express'
const router=express.Router()


// Set Default API Response
router.get('/',function (req,res){
	res.json({
		status: 'API is working',
		message: 'Welcome to my Rest API'

	});
});

// Import controllers here
import * as userController from "../controllers/userController.js"
import verifyToken from '../auth/auth.js'


//define routes here


// Eport API routers. As it is the only export,
// we make it the default
export default router;