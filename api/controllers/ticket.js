// imports
const mongoose = require('mongoose');

// get the ticket schema model for database
const Ticket = require('../models/ticket');

// routes and paths
// -- create new ticket
exports.ticket_create = (req, res) => {
	// create the ticket
	const ticket = new Ticket({
		_id: new mongoose.Types.ObjectId(),
		date: req.body.date,
		domain: req.body.domain,
		userId: req.body.userId,
		subject: req.body.subject,
		body: req.body.body,
		status: req.body.status,
	});
	ticket
		.save()
		// send success message if successful
		.then((result) => {
			res.status(201).json({
				message: 'New ticket created',
			});
		})
		// catch an error if there is one
		// and show error message
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- get a list of tickets
exports.ticket_list = (req, res) => {
	// find all tickets
	Ticket.find()
		// select the info to show from the tickets
		.select('_id date domain userId subject body status')
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				ticket: docs.map((doc) => {
					return {
						_id: doc._id,
						date: doc.date,
						domain: doc.domain,
						userId: doc.userId,
						subject: doc.subject,
						body: doc.body,
						status: doc.status,
					};
				}),
			};
			res.status(200).json(response);
		})
		// throw error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- update ticket information by ticket ID
exports.ticket_patch = (req, res) => {
	const id = req.params.ticketId;
	// find ticket by ticket id
	Ticket.findById({ _id: id })
		// update the information in the database for that ticket
		.updateOne(
			{ _id: id },
			{
				domain: req.body.domain,
				userId: req.body.userId,
				subject: req.body.subject,
				body: req.body.body,
				status: req.body.status,
			}
		)
		.exec()
		// send successful message
		.then((result) => {
			res.status(200).json({
				message: 'Ticket information updated',
			});
		})
		// throw error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- get single ticket information by ticket ID
exports.ticket_info = (req, res) => {
	const pID = req.params.ticketId;
	// find ticket by id
	Ticket.findById({ _id: pID })
		// select information to show
		.select('_id date domain userId subject body status')
		.exec()
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					ticket: doc,
				});
			} else {
				// show an error if there is no ticket by that ID
				res.status(404).json({ message: 'No ticket found with that ID' });
			}
		})
		// throw an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({ error: err });
		});
};

// -- get list of tickets and their information by ticket ID
exports.ticket_users = (req, res) => {
	const uID = req.params.userId;
	// find all tickets for specific user
	Ticket.find({ userId: uID })
		// select the info to show from the tickets
		.select('_id date domain userId subject body status')
		.sort({ date: -1 })
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				tickets: docs.map((doc) => {
					return {
						_id: doc._id,
						date: doc.date,
						domain: doc.domain,
						userId: doc.userId,
						subject: doc.subject,
						body: doc.body,
						status: doc.status,
					};
				}),
			};
			res.status(200).json(response);
		})
		// throw error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- delete ticket
exports.ticket_delete = (req, res) => {
	const id = req.params.ticketId;
	// find ticket by ID and remove that ticket with the ID
	Ticket.remove({ _id: id })
		.exec()
		.then((result) => {
			// successful message if the ticket was found and removed
			res.status(200).json({
				message: 'Ticket has been deleted',
			});
		})
		// throw an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
