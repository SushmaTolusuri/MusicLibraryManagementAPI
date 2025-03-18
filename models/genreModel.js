//userModel.js
import mongoose from 'mongoose'

//setup schema
const genreSchema=mongoose.Schema({
	genre_id:{
		type: Number,
		required:true,
	},
	name:{
		type: String,
		required:true,
	}
})

//export genre model
const Genre=mongoose.model('genre',genreSchema);
export default Genre;


export const get=function(callback,limit){
	Genre.find(callback).limit(limit)
}