const express = require('express')
const router = express.Router();
const userController = require('./controllers/userController')


router.post('/signup',  
  userController.getBcrypt, 
  userController.createUser,
  //sessionController.createSession*/
  (req, res) => {
    return res.status(200).json(res.locals.dbUser)
  // return res.status(200).send('hi')
})

// router.post('/login', (req, res) => {

// })

module.exports = router;