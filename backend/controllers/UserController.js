"use strict";

var utils = require("../utils/writer.js");
var UserService = require("../service/UserService");

module.exports.listUsers = function listUsers(req, res) {
  UserService.list()
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.createUser = function createUser(req, res) {
  var payload = req.swagger.params["user"].value;
  UserService.create(payload.user)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUser = function deleteUser(req, res) {
  var userId = req.swagger.params["userId"].value;
  UserService.delete(userId)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUser = function getUser(req, res) {
  var userId = req.swagger.params["userId"].value;
  UserService.get(userId)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUser = function updateUser(req, res) {
  var userId = req.swagger.params["userId"].value;
  var payload = req.swagger.params["user"].value;
  UserService.update(userId, payload.user)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
