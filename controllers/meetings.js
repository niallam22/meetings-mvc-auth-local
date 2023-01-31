const Meeting = require('../models/Meeting') //CREATE MEETING MODEL AND MEETINGS.EJS eddit controller once schema is created

module.exports = {
    getMeetings: async (req,res)=>{
        console.log(req.user)
        try{
            const meetingItems = await Meeting.find({userId:req.user.id})
            const itemsLeft = await Meeting.countDocuments({userId:req.user.id,completed: false})
            res.render('meetings.ejs', {meetings: meetingItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    accessMeeting: async (req,res)=>{
        console.log(req.user)
        try{
            const meetingItems = await Meeting.findById(req.body._id)
            res.render('access.ejs', {meetings: meetingItems, user: req.user})
            
        }catch(err){
            console.log(err)
        }
    },
    createMeeting: async (req, res)=>{
        try{
            Meeting.create({userId: req.user.id, meetingTitle: req.body.title, attendees: req.body.attendee, notes: req.body.notes, userAvailability: req.body.facilitatorTime, attendeeAvailability: req.body.attendeeAvailability, finalMeetingTime: req.body.finalMeetingTime})
            console.log(req.body)
            console.log('Meeting has been created!')
            res.redirect('/meetings')
        }catch(err){
            console.log(err)
        }
    } //,
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