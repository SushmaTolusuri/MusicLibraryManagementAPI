//userModel.js
import mongoose from 'mongoose'

//setup schema
const userSchema=mongoose.Schema({
	username:{
		type: String,
		required:true,
	},
	password:{
		type: String,
		required:true,
	}
})

//export user model
const User=mongoose.model('user',userSchema);
export default User;


export const get=function(callback,limit){
	User.find(callback).limit(limit)
}