const mongoose = require('mongoose')

const MeetingSchema = new mongoose.Schema({
    userId: {
        type: String,
        requried: true,
    },
    meetingTitle: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: false,
      },
    userAvailability: {
        type: Array,
        required: true,
    },
    finalMeetingTime: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Meeting', MeetingSchema)