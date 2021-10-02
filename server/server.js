const path = require('path');
const express = require('express');
const app = express();

const apiRouter = require('./routes/api');
const PORT = 3000;

// app.use('/api', apiRouter)

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/', express.static(path.join(__dirname, '../build')));
  
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve('build', './index.html'));
  });
}

//catch-all route handler
app.use((req, res) => res.status(404).send('Oh no!! Page not found'));


//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))