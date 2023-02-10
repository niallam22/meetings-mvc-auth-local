const mongoose = require('mongoose')

const AttendeeSchema = new mongoose.Schema({
    attendeeName:{
        type: String,
        required: true,
      },
    attendeeAvailability: {
        type: Array,
        required: false,
    },
    meetingId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Attendee', AttendeeSchema)