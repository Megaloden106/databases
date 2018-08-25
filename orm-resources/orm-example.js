/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */
console.log('-------inside testing');

var Sequelize = require('sequelize');
var db = new Sequelize('test2', 'student', 'student', {
  host: 'localhost',
  dialect: 'mysql'
});
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('User', {
  username: Sequelize.STRING
});

var Room = db.define('Room', {
  roomname: Sequelize.STRING
});

var Message = db.define('Message', {
  message: Sequelize.STRING
});

Message.hasMany(User, {as: 'user'});
Message.hasMany(Room, {as: 'room'});

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
db.sync()
  .then(function() {
    console.log('first promise');
    // Now instantiate an object and save it:
    return User.create({username: 'Jean Valjean'});
  })
  .then(function() {
    // Retrieve objects from the database:
    return User.findAll({ 
      // attributes: [User.username, Message.text, Room.roomname],
      where: {username: 'Jean Valjean'} 
    });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.username + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });
  
console.log('-------outside testing');
  
