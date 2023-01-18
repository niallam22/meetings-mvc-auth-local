const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

//get request on the root route of todos calls ensureAuth middleware method
//if req is authenticate it calls the next method, todosController and renders page
router.get('/', ensureAuth, todosController.getTodos)

//ensureAuth not used here because user has no interface to make a post request (unless they use postmans or dev console...)
router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router