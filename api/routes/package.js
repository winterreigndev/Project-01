// imports
const express = require('express');
const router = express.Router();

// controller
const PackageController = require('../controllers/package');

// router paths
// -- create package
router.post('/create', PackageController.package_create);

// -- get all packages
router.get('/list', PackageController.package_list);

// -- update package information
router.patch('/:packageId', PackageController.package_patch);

// -- get single package information by package ID
router.get('/:packageId', PackageController.package_info);

// -- get list of packages and their information by user ID
router.get('/user/:userId', PackageController.package_users);

// -- delete package
router.delete('/:packageId', PackageController.package_delete);

// export router
module.exports = router;
