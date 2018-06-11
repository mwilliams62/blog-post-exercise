const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title','id', 'content', 'author', 'publishDate'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
            console.error(message);
            return res.status(400).send(message);
    }
    console.log(`Updating blog post: \`{$req.params.title}\``);
    const updatedPost = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        publishDate: req.body.publishDate || Date.now()
    });
    res.status(204).end();
});


router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted post id: \`${req.params.ID}\``);
    res.status(204).end();
  });

module.exports = router;