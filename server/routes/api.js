const express = require('express');
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
var db;
const app = express.Router();

// Connect to the mongo db database
MongoClient.connect('mongodb://jon:TestTest1@ds255740.mlab.com:55740/jon-test', (err, client) => {
  if (err) return console.log(err)
  db = client.db('jon-test')
})

// handle the post when creating an item
app.get('/item', (req, res) => {
    db.collection('todo').find().toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });    
})

// handle the post when creating an item
app.post('/item', (req, res) => {
  db.collection('todo').save(req.body, (err, result) => {
    if (err) return console.log(err)

    // redirect back to the home page
    res.redirect('/todos')
  })
})


/** 
 * handle edit
 * Usually this is done with a PATCH request
 * with a url similar to the POST (PATCH /item/:id)
 * but due to the limitation of HTML forms, I am handeling it
 * with a POST request to a different URL
 */
app.post('/edit/:id', (req, res) => {
    db.collection('todo').update({_id: ObjectId(req.param('id'))}, {
        $set: {
            todo: req.body.todo
        }
    })

    // redirect back to the home page
    res.redirect('/todos')
})

/**
 * Similar to the edit, this delete request should be using
 * DELETE, but here I handle it with a new URL
 * pointing to POST /delete/:id
 */
app.post('/delete/:id', (req, res) => {
    db.collection('todo').remove({_id: ObjectId(req.param('id'))})
    res.redirect('/todos')
})

module.exports = app;