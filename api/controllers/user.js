// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// get the user schema model for database
const User = require('../models/user');

// routes and paths
// -- register new user
exports.user_register = (req, res) => {
	// search the user database for email entered
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			// if the email the user entered matches user in database
			// send error of existing account with email
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'It appears this email already exists in our database',
				});
			} else {
				// if the email the user entered does not match user in database
				// create account

				// -- hash the entered password with bcrypt and create user
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							name: req.body.name,
							password: hash,
							dateJoined: req.body.dateJoined,
						});
						user
							.save()
							// if created show sucess message
							.then((result) => {
								// console.log(result);
								res.status(201).json({
									message: 'New user created',
								});
							})
							.catch((err) => {
								// if error show error
								// console.log(err);
								res.status(500).json({
									error: err,
								});
							});
					}
				});
			}
		});
};

// login existing user
exports.user_login = (req, res) => {
	console.log(req.body);
	// find user in database by email
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			// if email does not exist
			if (user.length < 1) {
				return res.status(401).json({
					message: 'The email entered does not exist in our database',
				});
			}
			// if password is incorrect for that email
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Password is incorrect',
					});
				}
				// if password and email are correct
				// -- create jwt token and return it
				if (result) {
					const token = jwt.sign(
						{
							email: user[0].email,
							userId: user[0]._id,
							role: user[0].role,
						},
						process.env.JWT_KEY,
						{
							expiresIn: 8000,
						}
					);
					// information sent for successful request
					return res.status(200).json({
						userId: user[0]._id,
						email: user[0].email,
						role: user[0].role,
						expiresIn: 8000,
						message: 'Login successful',
						token: token,
					});
				}
				// if error when logging in
				res.status(401).json({
					message: 'Login failed',
				});
			});
		})
		.catch((err) => {
			// show error if there is one
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// list all users
exports.user_list = (_, res) => {
	// find all users
	User.find()
		// select the info to show
		.select(
			'userId _id email dateJoined infoUpdated name preferredPayment icon'
		)
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				users: docs.map((doc) => {
					return {
						_id: doc._id,
						email: doc.email,
						dateJoined: doc.dateJoined,
						infoUpdated: doc.infoUpdated,
						name: doc.name,
						preferredPayment: doc.preferredPayment,
						icon: doc.icon,
					};
				}),
			};
			res.status(200).json(response);
		})
		// show error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// update single user
exports.user_update = (req, res) => {
	const id = req.params.userId;
	// find user by user id
	User.findById({ _id: id })
		// update the information in the database for that user
		.updateOne(
			{ _id: id },
			{
				email: req.body.email,
				name: req.body.name,
				preferredPayment: req.body.preferredPayment,
				infoUpdated: req.body.infoUpdated,
				icon: req.body.icon,
			}
		)
		.exec()
		// send successful message
		.then((result) => {
			res.status(200).json({
				message: 'User information updated',
			});
		})
		// show error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// get single user information
exports.user_profile = (req, res) => {
	const id = req.params.userId;
	// find user by id
	User.findById({ _id: id })
		// select information to show
		.select(
			'userId _id email dateJoined infoUpdated name preferredPayment icon'
		)
		.exec()
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					user: doc,
				});
			} else {
				// show an error if there is no user by that ID
				res.status(404).json({ message: 'No user found with that ID' });
			}
		})
		// show an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({ error: err });
		});
};

// delete single user
exports.user_delete = (req, res) => {
	const id = req.params.userId;
	// find user by ID and remove that user with the ID
	User.remove({ _id: id })
		.exec()
		.then((result) => {
			// successful message if the user was found and removed
			res.status(200).json({
				message: 'User has been deleted',
			});
		})
		// show an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
