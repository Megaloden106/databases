var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('controller received get req');
      models.messages.get((data) => {
        res.send({results:data});
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('controller received post req', req.body);
      models.messages.post(req.body, () => {
        res.send();
      });
    }, // a function which handles posting a message to the database
    options: function(req, res) {
      res.send();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      
    },
    post: function (req, res) {
      
    }
  }
};

