// import
const mongoose = require('mongoose');

// user schema
const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true,
		match:
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
	},
	password: { type: String, required: true },
	name: { type: String, required: false },
	icon: { type: String, required: false },
	preferredPayment: { type: String, required: false },
	dateJoined: { type: Date, required: false },
	infoUpdated: { type: Date, required: false },
	role: { type: String, required: false },
	// Could be used to store the package ID's in an array for each user
	// packages: [
	// 	{
	// 		type: String,
	// 		required: false,
	// 	},
	// ],
});

// export
module.exports = mongoose.model('User', userSchema);
