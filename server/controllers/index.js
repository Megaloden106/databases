var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(data => {
        res.send({results: data});
      });
      // models.messages.get()
      //   .then(data => res.send({results: data}));
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, () => {
        res.send();
      });
      // models.messages.post(req.body)
      //   .then(() => res.send());
    }, // a function which handles posting a message to the database
    options: function(req, res) {
      res.send();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((data) => {
        res.send(data);
      });
    },
    post: function (req, res) {
      models.users.post(req.body, () => {
        res.send();
      });
    }
  }
};

