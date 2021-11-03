"use strict";

function validator(req, res, next) {
  if (req.query.name) {
    next();
  } else {
    throw new Error("Error 500: No Query Name !");
  }
}

module.exports = validator;
