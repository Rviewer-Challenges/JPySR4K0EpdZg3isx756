const {Schema, model} = require('mongoose');

const UpdateTimeSchema = Schema({
    time: Date,
    required: true
})

module.exports = model('UpdateTime', UpdateTimeSchema)