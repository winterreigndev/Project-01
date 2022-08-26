// import
const mongoose = require('mongoose');

// ticket schema
const ticketSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: { type: Date, required: false },
	domain: { type: String, required: true },
	userId: { type: String, required: false },
	subject: { type: String, required: false },
	body: { type: String, required: false },
	status: { type: String, required: false },
});

// export
module.exports = mongoose.model('Ticket', ticketSchema);
