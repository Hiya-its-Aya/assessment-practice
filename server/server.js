const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
// const urlencoded = require('urlencode');
// const apiRouter = require('./apiRouter');
const mongoose = require('mongoose');
const apiRouter = require('./apiRouter')

const PORT =  process.env.PORT || 3000;


app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

const MONGO_URI = 'mongodb+srv://test:test@cluster0.jyhqhk4.mongodb.net/?retryWrites=true&w=majority';

mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})
.then(() => console.log('db connection open'))
.catch((err) => console.log('error db connection: ', err))


app.use('/', express.static(path.join(__dirname, '../public')))
app.use('/signup', express.static(path.join(__dirname, '../public/signup.html')))
app.use('/login', express.static(path.join(__dirname, '../public/login.html')))

app.use('/api', apiRouter)

//catchall
app.use((req, res) => res.sendStatus(404).send(''));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));


