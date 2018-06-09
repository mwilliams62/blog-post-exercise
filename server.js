const express = require('express');
//const morgan = require('morgan');
const bodyParser = require('body-parser');

const blogPost = require('./models');

const jsonParser = bodyParser.json();
const app = express();

const getPostRouter = require('./blog-posts');
const deletePutRouter = require('./blog-posts/:id');

//log the http layer
app.use(morgan('common'));
app.use('/blog-posts', getPostRouter);
app.use('/blog-posts/:id', deletePutRouter);


BlogPosts.create('1st Post', 'This is the first post', 'M-dub', Date.now());
BlogPosts.create('Another post','This is just something else to work with', 'MadDog', '12/13/2018');
BlogPosts.create('Yep, more posts', 'man I\'m tired', 'Zees', '02/12/12');

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });

