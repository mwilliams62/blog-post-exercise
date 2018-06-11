const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//route incoming requests to the express router instances
const getPostRouter = require('./getPostRouter');
const deletePutRouter = require('./deletePutRouter');

//log the http layer
//app.use(morgan('common'));
app.use('/getPostRouter', getPostRouter);
app.use('/deletePutRouter', deletePutRouter);


BlogPosts.create('1st Post', 'This is the first post', 'M-dub', Date.now());
BlogPosts.create('Another post','This is just something else to work with', 'MadDog', '12/13/2018');
BlogPosts.create('Yep, more posts', 'man I\'m tired', 'Zees', '02/12/12');

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });

