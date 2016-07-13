let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Msg = require('../db/schema.js').Msg

// read many
apiRouter.get('/messages',function(request,response) {
  //first argument gives the criteria (WHICH msgs do i want)
  console.log('getting messages')
  Msg.find({},function(err,records) {
    response.send(records)
  })
})  

// write one
apiRouter.post('/messages',function(request,response) {
  let newRecord = new Msg(request.body)
  newRecord.save(function(err) {
    if (err) {
      console.log(err)
      response.send(err)
    }
    else {
      response.json(newRecord)
    }
  })
})

let Post = require('../db/schema.js').Post


apiRouter
  //fetch many
  .get('/posts', function(req, res, next){
    Post.find(req.query, function(err, results){
      if(err) return res.json(err) 
      res.json(results)
    })
  })
  //create one
  .post('/posts', function(req, res, next){
    let newPost = new Post(req.body)
    newPost.save(function(err){
      if(err) return res.json(err) 
 
      res.json(newPost)
    })
  })

apiRouter
  //fetch one
  .get('/posts/:_id', function(req, res, next){
    Post.findById(req.params._id, function(err, record){
      if(err || !record) return res.json(err)  
      res.json(record)
    })
  })
  //edit one
  .put('/posts/:_id', function(req, res, next) {
    Post.findById(req.params._id, function(err,record) {
      let recordWithUpdates = helpers.updateFields(record,req.body)
      recordWithUpdates.save(function(err){
        if(err || !record) return res.json(err) 
        res.json(record)
      })
    })
  })
  //delete one
  .delete('/posts/:_id', (req, res, next) => {
    Post.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })  
  })

  apiRouter
    .get('/users', function(req, res, next){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res, next){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res, next){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err) 
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res, next){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })
>>>>>>> d2d20422e6f5219151e93a31e38b6e9c8fb4780d

module.exports = apiRouter