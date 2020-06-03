const Trip = require("../models/trip");
const Item = require("../models/item");

module.exports = {
  trip,
  getNewTrip,
  createTrip

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

function getNewTrip(req, res) {
  Item.find({}, function (err, items) {
    res.render('trips/new', {
      title: 'Add Trip',
      items
    });
  })
} 

function createTrip(req, res) {
  req.body.user = req.user;
  Trip.create(req.body, function (err, newTrip) {
    console.log(err);
    console.log(newTrip);
    res.redirect('/trips');
  });
}