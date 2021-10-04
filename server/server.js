const path = require('path');
const express = require('express');

const apiRouter = require('./routes/api');
const loginRouter = require('./routes/login');


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const app = express();


/* MIDDLEWARE */
app.use(express.json());


/* ROUTES */

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/', express.static(path.join(__dirname, '../build')));
  // app.use('/api', apiRouter)
}

if (process.env.NODE_ENV === 'development') {
  // This router serves static JSON data to mock actual API calls for front-end development
  // app.use('/', require('./routes/mockRouter'));
  app.use('/login', loginRouter);
  app.use('/api', apiRouter);
}

app.use('/login', loginRouter);


//catch-all route handler
// app.use((req, res) => res.status(404).send('Oh no!! Page not found'));


/* GLOBAL ERROR HANDLER */

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const defaultClientError = {
    status: 500,
    message: { error: 'An unexpected error occurred.' },
  };
  const errorObj = Object.assign(defaultClientError, err);
  return res.status(errorObj.status).json(errorObj.message);
});


/* INITIALIZE RESOURCES */

// TODO init DB before listening for requests
app.listen(PORT, HOST, () => console.log(`Server running at http://${HOST}:${PORT}`));
