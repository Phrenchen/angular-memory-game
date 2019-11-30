const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let BugTicket = new Schema({
   title: {
      type: String
   },
   description: {
      type: String
   },
   author: {
      type: String
   },
   dateCreated: {
      type: Date
   },
   dateLastChange: {
      type: Date
   }
}, {
   collection: 'bugticket'
})

module.exports = mongoose.model('BugTicket', BugTicket);