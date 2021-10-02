const path = require('path');
const express = require('express');
const app = express();

const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');

const PORT = 3000;

// app.use('/api', apiRouter)
app.use('/user', userRouter)


if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/', express.static(path.join(__dirname, '../build')));
  
}

//catch-all route handler
// app.use((req, res) => res.status(404).send('Oh no!! Page not found'));


//global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const defaultClientError = {
    status: 500,
    message: { error: 'An unexpected error occurred.' },
  };
  const errorObj = Object.assign(defaultClientError, err);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
