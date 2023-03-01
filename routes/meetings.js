const express = require('express')
const router = express.Router()
const meetingsController = require('../controllers/meetings') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, meetingsController.getMeetings)

router.get('/:id', ensureAuth, meetingsController.getMeeting)

router.post('/accessMeeting', meetingsController.accessMeeting)

router.post('/createMeeting', meetingsController.createMeeting)

router.post('/updateAvail/:id', meetingsController.updateAttendeeAvailability)

router.post('/finaliseMeeting/:id', meetingsController.finaliseMeeting)

router.delete('/deleteMeeting/:id', meetingsController.deleteMeeting)

module.exports = router