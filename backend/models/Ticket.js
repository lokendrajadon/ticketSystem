"use strict";
const mongoConn = require('../db/mongoConn')
const mongoose = require('mongoose')
// const validator = require('validator');
const TicketSchema = new mongoose.Schema({
    ticketName: {
        type: String,
        maxlength: 30,
        required: [true, 'Ticket Name is required'],
        trim: true
    },
    isActive: {
        type: Number,
        trim: true,
    },
    userID:{
        type:String
    },
    createdDate:{
        type: String,
        trim: true
    },
    ticketDescription:{
        type: String,
        trim: true
    }
},{timestamps: true})


const Ticket = mongoose.model('tickets', TicketSchema);
module.exports = Ticket;
