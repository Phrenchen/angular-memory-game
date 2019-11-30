const express = require('express');
const app = express();
const bugTicketRoute = express.Router();

// BugTicket model
let BugTicket = require('../models/BugTicket');

// Add BugTicket
bugTicketRoute.route('/create').post((req, res, next) => {
  BugTicket.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All BugTickets
bugTicketRoute.route('/').get((req, res) => {
  BugTicket.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single BugTicket
bugTicketRoute.route('/read/:id').get((req, res) => {
  BugTicket.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update BugTicket
bugTicketRoute.route('/update/:id').put((req, res, next) => {
  BugTicket.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete BugTicket
bugTicketRoute.route('/delete/:id').delete((req, res, next) => {
  BugTicket.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = bugTicketRoute;