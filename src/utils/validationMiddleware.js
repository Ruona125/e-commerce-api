const express = require("express");

const validation = (schema) => {
  return async (req, res, next) => {
    const body = req.body;
    try {
      await schema.validate(body);
      next();
    } catch (err) {
    //   console.log(err);
      return res.status(400).json("error validating form");
    }
  };
};

module.exports = {
    validation
}
