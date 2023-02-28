const Meeting = require('../models/Meeting') //CREATE MEETING MODEL AND MEETINGS.EJS edit controller once schema is created
const Attendee = require('../models/Attendee') 
const { deleteOne } = require('../models/Meeting')
const moment = require('moment-timezone');
moment.tz.setDefault('UTC')

module.exports = {
    getMeetings: async (req,res)=>{
        console.log('this is req.user.id ',req.user.id)
        try{
            const meetingItems = await Meeting.find({userId:req.user.id})
            // console.log('this is meeting items: ', meetingItems)
            const itemsLeft = await Meeting.countDocuments({userId:req.user.id})//need to add a meeting date to userSchema and compare that to the current date
            res.render('meetings.ejs', {meetings: meetingItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    // gets a specific meeting for the facilitator
    getMeeting: async (req,res)=>{
        // console.log('this is req.user',req.user)
        try{
            const meetingItem = await Meeting.findById(req.params.id)
            let attendeeInfo = await Attendee.find({meetingId:req.params.id})
            // console.log('this is attendeeInfo: ', attendeeInfo, `this is req.params.id ${req.params.id}`)
            res.render('meeting.ejs', {meeting: meetingItem, attendees: attendeeInfo, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    accessMeeting: async (req,res)=>{
        console.log('this is req.body._id ',req.body._id)
        console.log('this is req.body.access ',req.body.access)
        try{
            const meetingItems = await Meeting.findById(req.body.access)
            console.log(meetingItems)
            res.render('access.ejs', {meetings: meetingItems, user: req.user, moment : moment})
        }catch(err){
            console.log(err)
        }
    },
    createMeeting: async (req, res)=>{
        console.log('this is req.body',req.body)
        try{
            Meeting.create({userId: req.user.id, meetingTitle: req.body.title, notes: req.body.notes, userAvailability: req.body.facilitatorTime, finalMeetingTime: req.body.finalMeetingTime})
            console.log(req.body)
            console.log('Meeting has been created!')
            res.redirect('/meetings')
        }catch(err){
            console.log(err)
        }
    },
    updateAttendeeAvailability: async (req, res)=>{
        console.log('this is req.body',req.body)
        try{
            Attendee.create({attendeeAvailability: req.body.attendeeSelectedTime, attendeeName: req.body.attendeeName, meetingId: req.params.id})
            console.log(req.body)
            console.log('Attendee availabiltiy updated!')
            res.redirect('/meetings')
        }catch(err){
            console.log(err)
        }
    },
    finaliseMeeting: async (req, res)=>{
        console.log('this is req.body',req.body.finalisedAvailability)
        try{
            Meeting.findOneAndUpdate({_id:req.params.id},{finalMeetingTime: req.body.finalisedAvailability}, {new: true}, (error, updatedData)=> {
                if(error){
                    console.log(error)
                }else{
                    console.log(updatedData)
                }
            })
            console.log('Meeting finalised!')
            res.redirect('/meetings')
        }catch(err){
            console.log(err)
        }
    }      
    //,
    // markComplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // deleteTodo: async (req, res)=>{
    //     console.log(req.body.todoIdFromJSFile)
    //     try{
    //         await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
    //         console.log('Deleted Todo')
    //         res.json('Deleted It')
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
}  