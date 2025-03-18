//userModel.js
import mongoose from 'mongoose'

//setup schema
const artistSchema=mongoose.Schema({
	artist_id:{
		type: Number,
		required:true,
	},
	name:{
		type: String,
		required:true,
	},
	country:{
		type: String,
		required:true,
	}
})

//export user model
const Artist=mongoose.model('artist',artistSchema);
export default Artist;


export const get=function(callback,limit){
	Artist.find(callback).limit(limit)
}