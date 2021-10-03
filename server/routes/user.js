const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');

//call getUserInfo middleware to grab additional information

router.post('/signup', userController.createUser, sessionController.startSession, cookieController.setSIDCookie, (req, res) => {
  //use isLoggedIn to validate and direct user to
  //once user is verified - res.redirect to feed?
  if (res.locals.sid) {
    res.status(200) //redirect to feed
  } else {
    //error message, return to signup
  }
})

router.post('/login', 
  userController.verifyUser, 
  sessionController.startSession, 
  cookieController.setSIDCookie, 
  (req, res) => {
    

    if (res.locals.sid) {
      res.status(200) //redirect to feed
      // TODO send user info
    } else {
      //flash error message: incorrect username or password
    }
  }
)

// router.get('/logout', sessionController.endSession, (req, res) => {
// })

module.exports = router;