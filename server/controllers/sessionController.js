const sessionController = {};
const db = require('../models/userModel'); //make sure this name matches the database name

/**
 * Middleware: Verify user session based on cookies. If successful, res.locals.user_id will be set and isLoggedIn will be set to true
 */
sessionController.isLoggedIn = async (req, res, next) => {
  const findSession = `SELECT * FROM sessions WHERE  = ${req.cookies.sid}`
  const session = await db.query(findSession);
  if (!session) {
    res.locals.isLoggedIn = false;
    return next(); 
  } else {
    res.locals.isLoggedIn = true;
    return next();
  }
}


/**
 * Middleware: Create a new session by inserting a new entry into the sessions table in the database. Session ID is stored in `res.locals.sid`
 */
sessionController.startSession = async (req, res, next) => {
  //if no user_id was stored, return next()
  if (!res.locals.user) return next();
  
  const { user_id } = res.locals.user._id; //TODO: console log res.locals.user to determine how to access user _id
  const createSession = `INSERT INTO sessions(user_id)
  VALUES(${user_id})
  RETURNING _id`
  const sid = await db.query(createSession);

  res.locals.sid = sid;
  return next();
}


sessionController.endSession = async (req, res, next) => {
  //TODO: add logout functionality here
}

module.exports = sessionController;