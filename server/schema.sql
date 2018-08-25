-- CREATE DATABASE chat;

-- USE chat;

CREATE DATABASE test;

USE test;

CREATE TABLE usernames (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE roomnames (
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(20) UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  message VARCHAR(100),
  roomId INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES usernames(id),
  FOREIGN KEY (roomId) REFERENCES roomnames(id)
);

/* Create other tables and define schemas for them here! */


/* Tests */

INSERT INTO usernames (username) VALUES ('eddie');
INSERT INTO roomnames (roomname) VALUES ('room');
INSERT INTO messages (userId, message, roomId) VALUES (1,'hello',1);
INSERT INTO usernames (username) VALUES ('gma');
INSERT INTO roomnames (roomname) VALUES ('lobby');
INSERT INTO messages (userId, message, roomId) VALUES (2,'world',2);

/*  Execute this file from the command line by typing:
 *    mysql -u student < server/schema.sql
 *  to create the database and the tables.*/

