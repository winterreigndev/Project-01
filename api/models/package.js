// import
const mongoose = require('mongoose');

// package schema
const packageSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: { type: Date, required: false },
	domain: { type: String, required: true },
	userId: { type: String, required: false },
	plan: { type: String, required: false },
	billingCycle: { type: String, required: false },
	spaceQuota: { type: String, required: false },
	bandwidth: { type: String, required: false },
	status: { type: String, required: false },
});

// export
module.exports = mongoose.model('Package', packageSchema);
