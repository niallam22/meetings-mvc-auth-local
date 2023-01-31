const express = require('express')
const router = express.Router()
const meetingsController = require('../controllers/meetings') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, meetingsController.getMeetings)

router.get('/accessMeeting', meetingsController.accessMeeting)

router.post('/createMeeting', meetingsController.createMeeting)

module.exports = router