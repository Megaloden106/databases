var db = require('../db').connection;
// var db = require('../../orm-resources/orm.js');

const selectAll = `SELECT usernames.username, messages.message, roomnames.roomname  
                   FROM messages, roomnames, usernames
                   WHERE messages.roomId = roomnames.id
                   AND messages.userId = usernames.id`;

const selectAllUsers = 'SELECT username FROM usernames';
                               
const poster = {
  username: (user, userCB) => {
    db.query(`SELECT id FROM usernames WHERE username = '${user}';`, (err, results) => {
      err && console.log(err); 
      if (results.length > 0) {
        userCB(results[0].id);
      } else {
        db.query(`INSERT INTO usernames (username) VALUES ('${user}');`, (err, results) => {
          err ? console.log(err) : userCB(results.insertId);
        });
      }
    });
  },
  message: (text, userId, roomId, postCB) => {
    db.query(`INSERT INTO messages (userId, message, roomId) VALUES(${userId}, "${text}", ${roomId});`, (err) => {
      err && console.log(err);
      postCB();
    });
  },
  roomname: (room, roomCB) => {
    db.query(`SELECT id FROM roomnames WHERE roomname = '${room}';`, (err, results) => {
      err && console.log(err); 
      if (results.length > 0) {
        roomCB(results[0].id);
      } else {
        db.query(`INSERT INTO roomnames (roomname) VALUES ('${room}');`, (err, results) => {
          err ? console.log(err) : roomCB(results.insertId);
        });
      }
    });
  }
};

module.exports = {
  messages: {
    get: (cb) => {
      db.query(selectAll, (err, results) => {
        err ? console.log(err) : cb(results);
      });
    }, 
    // a function which produces all the messages
    post: function ({username, text, roomname}, cb) {
      poster.username(username, (userId) => {
        poster.roomname(roomname, (roomId) => {
          poster.message(text, userId, roomId, cb);
        });
      });
    } 
    // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (cb) {
      db.query(selectAllUsers, (err, results) => {
        err ? console.log(err) : cb(results);
      });
    },
    post: function ({ username }, cb) {
      poster.username(username, () => { 
        cb();
      });
    }
  }
};

