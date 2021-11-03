"use strict";

function logger(req, res, next) {
  console.log("REQUEST: ", "Method: ", req.method, "Rout: ", req.path);

  next();
}

module.exports = logger;
