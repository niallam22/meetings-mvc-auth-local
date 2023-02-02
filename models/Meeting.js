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

const MeetingSchema = new mongoose.Schema({
    userId: {
        type: String,
        requried: true,
    },
    meetingTitle: {
        type: String,
        required: true,
    },
    attendeeInfo:{
        type: AttendeeSchema,
        required: false,
      },
    notes: {
        type: String,
        required: false,
      },
    userAvailability: {
        type: Array,
        required: true,
    },
    attendeeAvailability: {
        type: String,
        required: false,
    },
    finalMeetingTime: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Meeting', MeetingSchema)