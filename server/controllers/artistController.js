const db = require('../models/userModel');

const artistController = {};

artistController.getArtistInfo = async (req, res, next) => {
  const findArtist = `SELECT * FROM artists WHERE name = ${req.params.term}`;
  const artistInfo = await db.query(findArtist)
  if (artistInfo.rows.length > 0) {
  res.locals.artists = artistInfo.rows
} else {
  const data = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=67tWlO0wFALQ7IcG4jF7eArtbz9ALaPW&keyword=${req.parms.term}`)
  .then((response) => response.json());
  
  res.locals.artists = data
  console.log(res.locals.artists)
  // .catch(err => console.log(err))
}


return next()
}

module.exports = artistController;
