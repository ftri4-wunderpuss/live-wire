const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const artistController = require('../controllers/artistController');
const eventController = require('../controllers/eventController');



//route for user to create an account
router.post('/user', 
  userController.createUser, 
  userController.getUserInfo,
  sessionController.startSession, 
  cookieController.setSIDCookie, 
  (req, res) => {
    if (res.locals.sid) {
      res
        .status(200)
        .json(res.locals.userObject); // send user info
    } else {
      res
        .status(401)
        .send({ error: 'incorrect username or password' });
    }
  }
);


//TODO: finish error handling
router.patch('/user', 
  sessionController.isLoggedIn, 
  userController.updateUser, 
  userController.getUserInfo, 
  (req, res) => {
    if (!res.locals.isLoggedIn) {
      res
      .status(401)
      .send({ error:'invalid session' });
    }
    
    if (res.locals.userObject) {
      res
        .status(200)
        .json(res.locals.userObject); // send user info
    } 
  }
);


//TODO: check for error?
router.delete('/user', sessionController.isLoggedIn, sessionController.removeSession, userController.deleteUser, (req, res) => {
  res
    .status(200)
    .json({});
});


// router.get('/logout', sessionController.endSession, (req, res) => {
// })

router.get('/artists/:term', artistController.getArtistInfo, )





router.get('/api/events', eventController.getEvents, (req, res) => {
  res
    .status(200);
    // .json({events: [
    //   {eventId:
    //   eventUrl:
    //   artists: [artistId, name]
    //   eventImageUrl:
    //   venue:
    //   date:
    //   ticketPrice
    // }
    // ]})
});


module.exports = router;