const db = require('../models/userModel');

const artistController = {};

artistController.getArtistInfo = async (req, res, next) => {
  const findArtist = `SELECT * FROM artists WHERE name = ${req.params.term}`;
  const artistInfo = await db.query(findArtist)
  if (artistInfo.rows.length > 0)
  res.locals.artists = artistInfo.rows
} else {
  await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${req.params.term}&api_key=8470ce34bdb383befa8ee48fad12c798&format=json`)
  .then((data) => data.json())
  .then((data) => res.locals = data)
  .catch(err => console.log(err))
}
return next()


module.exports = artistController;
