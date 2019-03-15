'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = Schema({
    name: String,
    picture: String,
    profession: String,
    age: Number,
    department: { type: String, enum: ['robotics', 'backend','hardware','memes']},
    description: String


})

module.exports =  mongoose.model('User', UserSchema)