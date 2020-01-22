'use strict';

var data = [
  {
    "firstname": "John",
    "address": {
      "country": "DE",
      "city": "Freiburg im Breisgau",
      "street": "Lindenstraße 89",
      "postalcode": "42030"
    },
    "id": 1,
    "birthDate": "1980-01-23",
    "email": "john.smith@example.com",
    "lastname": "Smith"
  }, {
    "firstname": "Jhonny",
    "address": {
      "country": "PE",
      "city": "Lima",
      "street": "Av. A. Bertello 781",
      "postalcode": "15123"
    },
    "id": 2,
    "birthDate": "1986-07-23",
    "email": "jhmorales0786@gmail.com",
    "lastname": "Morales"
  }
];

var USERNOTFOUND = "User not found";

var utils = require('../utils/writer.js');

/**
 * Get all users
 *
 * returns List
 **/
exports.list = function () {
  return new Promise(function (resolve) {
    resolve(data);
  });
}


/**
 * Create one user
 * user User 
 * returns user
 **/
exports.create = function (user) {
  return new Promise(function (resolve) {
    user.id = data.push(user);
    resolve(utils.respondWithCode(201, user));
  });
}


/**
 * Remove one user
 * userId Integer 
 * no response value expected for this operation
 **/
exports.delete = function (userId) {
  return new Promise(function (resolve, reject) {
    var index = data.findIndex(function (user) { return user.id === userId; });
    
    if (index > -1) {
      data.splice(index, 1);
      resolve(utils.respondWithCode(204));
    }
    else reject(utils.respondWithCode(500, { message: USERNOTFOUND }));
  });
}


/**
 * Get one user
 *
 * userId Integer 
 * returns user
 **/
exports.get = function (userId) {
  return new Promise(function (resolve, reject) {
    var user = data.find(function (user) { return user.id === userId; });
    
    if (user) resolve(user);
    else reject(utils.respondWithCode(500, { message: USERNOTFOUND }));
  });
}


/**
 * Update one user
 * userId Integer 
 * user User 
 * returns user
 **/
exports.update = function (userId, user) {
  return new Promise(function (resolve, reject) {
    var index = data.findIndex(function (user) { return user.id === userId; });
    
    if (index > -1) {
      data[index] = user;
      resolve(user);
    }
    else reject(utils.respondWithCode(500, { message: USERNOTFOUND }));
  });
}
