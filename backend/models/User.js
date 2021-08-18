"use strict";
const mongoConn = require('../db/mongoConn')
const mongoose = require('mongoose')
const validator = require('validator');
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        maxlength: 30,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique:true,
        sparse: true,
        trim: true,
        validate(value) {
            if (value && !validator.isEmail(value)) {
                throw new Error("Email have invalid format.")
            }
        }
    },
    phone:{
        type: Number,
        maxlength: 10,
        trim: true
    },
    password:{
        type: String,
        trim: true
    }
},{timestamps: true})


const Users = mongoose.model('users', UserSchema);
module.exports = Users;
