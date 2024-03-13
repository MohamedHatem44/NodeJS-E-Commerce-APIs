const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		trim : true, //remove white space form string 
		required: [true, 'name required']
	},
	//url friendly version of string 
	slug:{
		type : String,
		lowercase: true,
	},
	email:{
		type : String,
		required:[true , 'email required'],
		unique: true,
		lowercase : true,
	},
	phone:String,
	profileImg: String,

	password:{
		type: String,
		required: [true , 'password required '],
		minlength:[6 ,'too short password']
	},
	passwordChangedAt    :Date,
	passwordRestCode     :String,
	PasswordResestExpires:Date,
	passwordResetVerified:Boolean,
	role:{
		type:String,
		enum :['user','admin','manager'],
		default:'user',
	},
	//if the user is active instead of delete 
	active:{
		type: Boolean,
		default: true ,
	}

},{ timestamps: true})  //option that adds two fields to the schema(createdAt ,updatedAt)


//encrypt password pre midllware
userSchema.pre("save",async function(next){
	//hashing
	this.password =await bcrypt.hash(this.password, 12);
	next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;