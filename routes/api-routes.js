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
router.route('/login').post(userController.login);


router.route('/admin').get([verifyToken, userController.admin]);

// Users Model Routes
// -- Create Route - POST
router.route('/admin/createuser').post([verifyToken, userController.createUser]);
// -- Read Route - GET
router.route('/admin/readusers').get([verifyToken, userController.readUsers]);
// -- Update Route - PUT
router.route('/admin/updateuser').put([verifyToken, userController.updateUser]);
// -- Delete Route - POST
router.route('/admin/deleteuser').post([verifyToken, userController.deleteUser]);

// Eport API routers. As it is the only export,
// we make it the default
export default router;