/**
 * Mock api for development of front-end. Serves semi-static data.
 */
const { Router } = require('express');
const fetch = require('node-fetch');


// MOCK CONFIG
const ALLOW_LOGIN = true;
const VALID_SESSION = true;


// USER SYSTEM
const loginRouter = Router();
const userRouter = Router();

let userCache = {};
let settingCache = {};
let followedArtistsCache = [];
let starredEventsCache = [];

// login-in has some pre-filled data
loginRouter.post('/',
  (req, res) => {
    if (!ALLOW_LOGIN) return removeSession(res, 401).json({
      error: 'Incorrect password.'
    });

    res.cookie('sid', '12345', { httpOnly: true, sameSite: 'lax' });
    userCache = {
      name: "Miguel Hernandez",
      email: "miguelh72@outlook.com"
    };
    settingCache = {
      city: "Miami",
      receiveEmailNotifications: true,
    };
    followedArtistsCache = [
      { artistId: "3450511f-aea9-40cd-9618-d26ca7495842", artistName: 'Drake White' },
    ];
    starredEventsCache = ["vvG1bZpmT72SPV"];

    return res.json({
      user: userCache,
      settings: settingCache,
      followedArtists: followedArtistsCache,
      starredEvents: starredEventsCache,
    });
  }
);

userRouter.post('/',
  (req, res) => {
    if (!ALLOW_LOGIN) return removeSession(res, 400).json({
      error: 'Invalid city name.'
    });

    userCache = {
      name: req.body.name,
      email: req.body.email
    };
    settingCache = {
      city: req.body.city,
      receiveEmailNotifications: req.body.receiveEmailNotifications,
    };
    followedArtistsCache = [];
    starredEventsCache = [];

    // create login session cookie
    res.cookie('sid', '12345', { httpOnly: true, sameSite: 'lax' });
    // return back data that was just used to sign-up
    return res.json({
      user: userCache,
      settings: settingCache,
      followedArtists: followedArtistsCache,
      starredEvents: starredEventsCache,
    });
  }
);

userRouter.patch('/',
  (req, res) => {
    if (!VALID_SESSION) return removeSession(res).json({
      error: 'Unauthorized access.'
    });

    if (req.body.name) userCache.name = req.body.name;
    if (req.body.email) userCache.email = req.body.email;
    if (req.body.password) userCache.password = req.body.password;
    if (req.body.city) userCache.city = req.body.city;
    if (req.body.receiveEmailNotifications) userCache.receiveEmailNotifications = req.body.receiveEmailNotifications;

    return res.json({
      user: userCache,
      settings: settingCache,
    });
  }
);

userRouter.delete('/',
  (req, res) => {
    if (!VALID_SESSION) return removeSession(res).json({
      error: 'Unauthorized access.'
    });

    userCache = {};
    settingCache = {};
    followedArtistsCache = [];
    starredEventsCache = [];

    return removeSession(res).sendStatus(200);
  }
);

// EVENTS SYSTEM
const eventsRouter = Router();

eventsRouter.get("/",
  (req, res) => {
    if (!VALID_SESSION) return removeSession(res).json({
      error: 'Unauthorized access.'
    });

    res.json([
      {
        eventId: "vvG1fZpRZbsSL5",
        eventUrl: "https://www.ticketmaster.com/drake-white-indianapolis-indiana-11-12-2021/event/05005AF018C737CB",
        artists: [{ artistId: "3450511f-aea9-40cd-9618-d26ca7495842", artistName: "Drake White" }],
        // 640 x 360 p
        eventImageUrl: "https://s1.ticketm.net/dam/a/837/1ef20cf3-1732-4d64-a97f-c0cddd059837_970401_RETINA_PORTRAIT_16_9.jpg",
        venue: "8 Seconds Saloon, Indianapolis",
        date: "2021-11-13T01:45:00Z",
        ticketPrice: 20,
      },
      {
        eventId: "vv1AaZA-fGkdJH499",
        eventUrl: "https://www.ticketmaster.com/drake-bell-montclair-california-10-07-2021/event/09005854E6F155D7",
        artists: [{ artistId: "094f10e7-27d5-400d-a145-331013e67229", artistName: "Drake Bell" }],
        // 640 x 360 p
        eventImageUrl: "https://s1.ticketm.net/dam/a/e02/5525c2b6-5de2-4eed-ae08-fa7ed0035e02_1235631_RETINA_PORTRAIT_16_9.jpg",
        venue: "The Canyon Montclair, Montclair",
        date: "2021-10-08T03:00:00Z",
        ticketPrice: 40,
      },
      {
        eventId: "vvG1bZpmT72SPV",
        eventUrl: "https://www.ticketmaster.com/drake-white-saint-louis-missouri-10-08-2021/event/06005AEFC43F3974",
        artists: [{ artistId: "3450511f-aea9-40cd-9618-d26ca7495842", artistName: "Drake White" }],
        // 640 x 360 p
        eventImageUrl: "https://s1.ticketm.net/dam/a/837/1ef20cf3-1732-4d64-a97f-c0cddd059837_970401_RETINA_PORTRAIT_16_9.jpg",
        venue: "Delmar Hall, Saint Louis",
        date: "2021-10-09T01:00:00Z",
        ticketPrice: 25,
      },
    ]);
  }
);

eventsRouter.post('/:event_id',
  (req, res) => {
    if (!VALID_SESSION) return removeSession(res).json({
      error: 'Unauthorized access.'
    });

    const eventId = req.params.event_id;
    if (!starredEventsCache.find(e => e === eventId)) starredEventsCache.push(eventId);

    res.json({
      starredEvents: starredEventsCache,
    });
  }
);

eventsRouter.delete('/:event_id',
  (req, res) => {
    if (!VALID_SESSION) return removeSession(res).json({
      error: 'Unauthorized access.'
    });

    const eventId = req.params.event_id;
    const index = starredEventsCache.findIndex(e => e === eventId);
    if (index !== -1) starredEventsCache.splice(index, 1);

    res.json({
      starredEvents: starredEventsCache,
    });
  }
);

// ARTISTS SYSTEM
const artistsRouter = Router();

artistsRouter.get('/:term',
  (req, res) => {
    if (!VALID_SESSION) return removeSession(res).json({
      error: 'Unauthorized access.'
    });

    res.json([
      {
        artistId: "3450511f-aea9-40cd-9618-d26ca7495842",
        artistName: "Drake White",
        artistBio: "William Drake White (born October 3, 1983) is an American country music singer.",
        artistImageUrl: "https://s1.ticketm.net/dam/a/837/1ef20cf3-1732-4d64-a97f-c0cddd059837_970401_RETINA_PORTRAIT_16_9.jpg",
        isOnTour: true,
      },
      {
        artistId: "094f10e7-27d5-400d-a145-331013e67229",
        artistName: "Jared Drake Bell",
        artistBio: "Jared Drake Bell (born June 27, 1986), also known as Drake Campana, is an American actor, singer, songwriter, and musician. Born in Newport Beach, California, he began his career as an actor in the early 1990s at the age of five with his first televised appearance on Home Improvement, and also appeared in several commercials as a child. Bell is best known for his starring roles on Nickelodeon's The Amanda Show and Drake & Josh. He also starred in a trilogy of The Fairly OddParents movies on Nickelodeon. Bell was the voice of Peter Parker / Spider-Man in the animated series Ultimate Spider-Man on Disney XD.",
        artistImageUrl: "https://s1.ticketm.net/dam/a/e02/5525c2b6-5de2-4eed-ae08-fa7ed0035e02_1235631_RETINA_PORTRAIT_16_9.jpg",
        isOnTour: true,
      }
    ]);
  }
);

artistsRouter.post('/:artist_id',
  async (req, res) => {
    if (!VALID_SESSION) return removeSession(res).json({
      error: 'Unauthorized access.'
    });

    const artistId = req.params.artist_id;

    if (!followedArtistsCache.find(e => e.artistId === artistId)) {
      // fetch artist name from musicbrainz
      const artistData = await fetch('https://musicbrainz.org/ws/2/artist/' + artistId, {
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => response.json());

      followedArtistsCache.push({
        artistId,
        artistName: artistData.name,
      });
    }

    return res.json({
      followedArtists: followedArtistsCache,
    });
  }
);

artistsRouter.delete('/:artist_id',
  (req, res) => {
    if (!VALID_SESSION) return removeSession(res).json({
      error: 'Unauthorized access.'
    });

    const artistId = req.params.artist_id;
    const index = followedArtistsCache.findIndex(e => e.artistId === artistId);
    if (index !== -1) followedArtistsCache.splice(index, 1);

    res.json({
      followedArtists: followedArtistsCache,
    });
  }
);

// SUB ROUTING
const router = Router();

router.use('/login', loginRouter);
router.use('/api/user', userRouter);
router.use('/api/events', eventsRouter);
router.use('/api/artists', artistsRouter);

// UTILITY FUNCTIONS
function removeSession(res, status = 401) {
  res.cookie(
    'sid',
    'invalidate',
    { httpOnly: true, sameSite: 'lax', expires: new Date(Date.now() - 1000) }
  );
  return res.status(status);
}

module.exports = router;
