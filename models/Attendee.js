const mongoose = require('mongoose')

const AttendeeSchema = new mongoose.Schema({
    attendeeName:{
        type: String,
        required: false,
      },
    attendeeAvailability: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Attendee', AttendeeSchema)