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

apiRouter.delete('/messages/:_id',function(request,response){
  //request.params contains the variables that were in the route pattern, expressed in the form 
  // [route placeholder]: [value sent]
  let theId = request.params._id
  // console.log(request.body)
  Msg.remove({_id:theId},function(err) {
    if (err) {
      response.json({
        error: err
      })
    }
    else {
      response.status(200).json({
        msg: 'record successfully deleted!'
      })
    }
  })
})

//read all users
apiRouter.get('/users',function(request,response){
  User.find({},function(err,records) {
    if (err) {
      response.send(err)
    }
    else {
      response.json(records)
    }
  })
})

module.exports = apiRouter