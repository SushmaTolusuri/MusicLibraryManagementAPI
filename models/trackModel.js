//userModel.js
import mongoose from 'mongoose'

//setup schema
const trackSchema=mongoose.Schema({
	name:{
		type: String,
		required:true,
	},
	length:{
		type: String,
		required:true,
	},
	genre_id:{
		type: Number,
		required:true,
	},
	album_id:{
		type: Number,
		required:true,
	},
})

//export user model
const Track=mongoose.model('track',trackSchema);
export default Track;


export const get=function(callback,limit){
	Track.find(callback).limit(limit)
}