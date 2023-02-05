const express = require('express')
const router = express.Router()
const meetingsController = require('../controllers/meetings') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, meetingsController.getMeetings)

router.get('/:id', ensureAuth, meetingsController.getMeeting)

router.post('/accessMeeting', meetingsController.accessMeeting)

router.post('/createMeeting', meetingsController.createMeeting)

router.post('/updateAvail', meetingsController.updateAttendeeAvailability)

module.exports = router