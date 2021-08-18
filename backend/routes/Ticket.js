const express = require('express')

const router = express.Router()
const ticketsController = require('../controllers/Ticket')
const {isAuth} = require('../util')

router.get('/tickets',isAuth,ticketsController.getTickets)
router.post('/addTicket',isAuth,ticketsController.addTickets)

module.exports = router