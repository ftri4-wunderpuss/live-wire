const sessionController = {};
const db = require('../models/userModel'); //make sure this name matches the database name

sessionController.isLoggedIn = async (req, res, next) => {
  //query sessions database
  const findSession = `SELECT * FROM sessions WHERE user_id = ${req.cookies.ssid}`
  const session = await db.query(findSession);
  if (!session) {
    //no session found 
    res.redirect('/login') //redirect to login or signup?
  } else {
    //session found
    return next();
  }
}

sessionController.startSession = async (req, res, next) => {
  const { _id } = res.locals.user._id;
  const createSession = `INSERT INTO sessions(user_id, expires_at)
  VALUES(${_id})`
  const session = await db.query(createSession);
  return next();
}