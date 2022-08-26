// imports
const mongoose = require('mongoose');

// get the reply schema model for database
const Replies = require('../models/replies');

// router paths
// -- create reply
exports.reply_create = (req, res) => {
	// create the reply
	const reply = new Replies({
		_id: new mongoose.Types.ObjectId(),
		date: req.body.date,
		userId: req.body.userId,
		ticketId: req.body.ticketId,
		body: req.body.body,
		role: req.body.role,
	});
	reply
		.save()
		// send success message if successful
		.then((doc) => {
			res.status(201).json({
				message: 'New reply created',
				date: doc.date,
				userId: doc.userId,
				ticketId: doc.subject,
				body: doc.body,
				role: doc.role,
			});
		})
		// catch an error if there is one
		// and show error message
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- get all replies
exports.reply_list = (_, res) => {
	// find all replies
	Replies.find()
		// select the info to show from the replies
		.select('_id date userId ticketId body role')
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				replies: docs.map((doc) => {
					return {
						_id: doc._id,
						date: doc.date,
						userId: doc.userId,
						ticketId: doc.subject,
						body: doc.body,
						role: doc.role,
					};
				}),
			};
			res.status(200).json(response);
		})
		// throw error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- get single reply information by reply ID
exports.reply_info = (req, res) => {
	const rID = req.params.replyId;
	// find reply by id
	Replies.findById({ _id: rID })
		// select information to show
		.select('_id date userId ticketId body role')
		.exec()
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					reply: doc,
				});
			} else {
				// show an error if there is no reply by that ID
				res.status(404).json({ message: 'No reply found with that ID' });
			}
		})
		// throw an error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

// -- get list of replies and their information by ticket ID
exports.reply_ticket = (req, res) => {
	const tID = req.params.ticketId;
	// find all packages for specific user
	Replies.find({ ticketId: tID })
		// select the info to show from the packages
		.select('_id date userId ticketId body role')
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				replies: docs.map((doc) => {
					return {
						_id: doc._id,
						date: doc.date,
						userId: doc.userId,
						ticketId: doc.subject,
						body: doc.body,
						role: doc.role,
					};
				}),
			};
			res.status(200).json(response);
		})
		// throw error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
