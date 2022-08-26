// imports
const express = require('express');
const router = express.Router();

// controller
const TicketController = require('../controllers/ticket');

// router paths
// -- create ticket
router.post('/create', TicketController.ticket_create);

// -- get all tickets
router.get('/list', TicketController.ticket_list);

// -- update ticket information
router.patch('/:ticketId', TicketController.ticket_patch);

// -- get single ticket information by ticket ID
router.get('/:ticketId', TicketController.ticket_info);

// -- get list of tickets and their information by user ID
router.get('/user/:userId', TicketController.ticket_users);

// -- delete ticket
router.delete('/:ticketId', TicketController.ticket_delete);

// export router
module.exports = router;
