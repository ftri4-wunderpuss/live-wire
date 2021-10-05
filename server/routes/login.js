const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');

router.post('/', 
  userController.verifyUser, 
  userController.getUserInfo,
  sessionController.startSession, 
  cookieController.setSIDCookie,
  (req, res) => {
    if (res.locals.sid) {
      res
        .status(200)
        .json(res.locals.userObject);// send user info
    } else {
      res
        .status(401)
        .send({ error: 'incorrect username or password' });
    }
  }
);

module.exports = router;