// import
const mongoose = require('mongoose');

// reply schema
const replySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: { type: Date, required: false },
	userId: { type: String, required: false },
	ticketId: { type: String, required: false },
	role: { type: String, required: false },
	body: { type: String, required: false },
});

// export
module.exports = mongoose.model('Replies', replySchema);
