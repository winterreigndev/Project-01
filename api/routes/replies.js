// imports
const express = require('express');
const router = express.Router();

// controller
const RepliesController = require('../controllers/replies');

// router paths
// -- create reply
router.post('/add', RepliesController.reply_create);

// -- get all replies
router.get('/replies', RepliesController.reply_list);

// -- get single reply information by reply ID
router.get('/:replyId', RepliesController.reply_info);

// -- get list of replies and their information by ticket ID
router.get('/ticket/:ticketId', RepliesController.reply_ticket);

// export router
module.exports = router;
