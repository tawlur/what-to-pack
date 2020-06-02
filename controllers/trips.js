const Trip = require("../models/trip");

module.exports = {
  trip,

};

function trip(req, res, next) {
  console.log(req.query);
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  // Default to sorting by name
  let sortKey = req.query.sort || "name";
  Trip.find(modelQuery)
    .sort(sortKey)
    .exec(function (err, items) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render("items/trip", {
        items,
        name: req.query.name,
        sortKey,
        user: req.user,
      });
    });
}