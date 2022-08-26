// imports
const mongoose = require('mongoose');

// get the package schema model for database
const Package = require('../models/package');

// routes and paths
// -- register new hosting packages
exports.package_create = (req, res) => {
	// search the package database for domain entered
	Package.find({ domain: req.body.domain })
		.exec()
		.then((package) => {
			// if the domain already exists in the database
			// send error of exisiting package with domain
			if (package.length >= 1) {
				return res.status(409).json({
					message:
						'It appears there is already a hosting account set up with this domain name.',
				});
			} else {
				// if the domain does not already exist in our database
				// create the hosting account
				const package = new Package({
					_id: new mongoose.Types.ObjectId(),
					date: req.body.date,
					domain: req.body.domain,
					userId: req.body.userId,
					plan: req.body.plan,
					billingCycle: req.body.billingCycle,
					spaceQuota: req.body.spaceQuota,
					bandwidth: req.body.bandwidth,
					status: req.body.status,
				});
				package
					.save()
					// print results in console log
					// send success message if successful
					.then((result) => {
						console.log(result);
						res.status(201).json({
							message: 'New hosting package created',
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
			}
		});
};

// get list of all hosting packages
exports.package_list = (_, res) => {
	// find all hosting ackages
	Package.find()
		// select the info to show from the packages
		.select(
			'_id date domain userId plan billingCycle spaceQuota bandwidth status'
		)
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				packages: docs.map((doc) => {
					return {
						_id: doc._id,
						date: doc.date,
						domain: doc.domain,
						userId: doc.userId,
						plan: doc.plan,
						billingCycle: doc.billingCycle,
						spaceQuota: doc.spaceQuota,
						bandwidth: doc.bandwidth,
						status: doc.status,
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

// update single package
exports.package_patch = (req, res) => {
	const id = req.params.packageId;
	// find package by package id
	Package.findById({ _id: id })
		// update the information in the database for that package
		.updateOne(
			{ _id: id },
			{
				date: req.body.date,
				domain: req.body.domain,
				userId: req.body.userId,
				plan: req.body.plan,
				billingCycle: req.body.billingCycle,
				spaceQuota: req.body.spaceQuota,
				bandwidth: req.body.bandwidth,
				status: req.body.status,
			}
		)
		.exec()
		// send successful message and info
		.then(() => {
			res.status(200).json({
				message: 'Package information updated',
			});
		})
		// throw error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// get single package information by ID
exports.package_info = (req, res) => {
	const pID = req.params.packageId;
	// find user by id
	Package.findById({ _id: pID })
		// select information to show
		.select(
			'_id date domain userId plan billingCycle spaceQuota bandwidth status'
		)
		.exec()
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					package: doc,
				});
			} else {
				// show an error if there is no user by that ID
				res.status(404).json({ message: 'No package found with that ID' });
			}
		})
		// throw an error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

// get list of all packages under user
exports.package_users = (req, res) => {
	const uID = req.params.userId;
	// find all packages for specific user
	Package.find({ userId: uID })
		// select the info to show from the packages
		.select(
			'_id date domain userId plan billingCycle spaceQuota bandwidth status'
		)
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				packages: docs.map((doc) => {
					return {
						_id: doc._id,
						date: doc.date,
						domain: doc.domain,
						userId: doc.userId,
						plan: doc.plan,
						billingCycle: doc.billingCycle,
						spaceQuota: doc.spaceQuota,
						bandwidth: doc.bandwidth,
						status: doc.status,
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

// delete a package by package ID
exports.package_delete = (req, res) => {
	const id = req.params.packageId;
	// find package by ID and remove that package with the ID
	Package.remove({ _id: id })
		.exec()
		.then(() => {
			// successful message if the package was found and removed
			res.status(200).json({
				message: 'Package has been deleted',
			});
		})
		// throw an error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
