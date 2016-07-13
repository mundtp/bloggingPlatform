let Router = require('express').Router;
const apiRouter = Router()

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

// delete one
apiRouter.delete('/messages'),function(request,response) {
  console.log(request.params)
  console.log('got it')
  response.send('good')
}

module.exports = apiRouter