//userModel.js
import mongoose from 'mongoose'

//setup schema
const albumSchema=mongoose.Schema({
	name:{
		type: String,
		required:true,
	},
	artist_id:{
		type: Number,
		required:true,
	},
})

//export user model
const Album=mongoose.model('album',albumSchema);
export default Album;


export const get=function(callback,limit){
	Album.find(callback).limit(limit)
}