const express = require('express');
const router = express.Router();

router.post('/signup', userController.createUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  //once user is verified - res.redirect to feed?
})

router.post('/login', userController.verifyUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  //if user is not verified - res.redirect to signup page?
  //if user is verified - res.redirect to feed?
})

module.exports = router;