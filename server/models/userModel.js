
//Possible examples of database query functions
// const getUserInfo = (email) => {
//   `SELECT * FROM users WHERE email = ${email}`
// }

// const createUser = (...values) => {
//   `INSERT INTO users(
//     name, email, passhash, city, email_notification, last_login_ip)
//     VALUES (${values})
//     RETURNING *`
// }

//TODO: write SQL queries in functions

const getFollowedArtists = (userId) => {
  //get followed artists from database and store in an array
}

const getStarredEvents = (userId) => {
  //get starred events from database and store in an array by eventId
}

const deleteUser = (userId) => {
  //DELETE FROM users WHERE _id = userId
}