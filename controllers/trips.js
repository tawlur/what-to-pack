const Trip = require("../models/trip");
const Item = require("../models/item");

module.exports = {
  trip,
  getNewTrip,
  createTrip,
  allTrips,
  newTrip,
  create
};

function newTrip(req, res) {
  res.render('trip/new', {user: req.user})
}

function create(req, res) {
  req.body.location = req.user._id;
  req.body.ownerName = req.user.name;
  const newTrip = new Trip(req.body);
  newTrip.save(function(err) {
      if (err) return res.redirect('/trips/new');
      console.log(newTrip);
      res.redirect('/trips');
  })
  
}

function trip(req, res, next) {
  //req.query = ?query=
  console.log(req.query);
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  // www.url.com/?name=  (questions signals theres a query then name of query then value comes after the =)
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  // Default to sorting by name
  // ?sort= (shows up in url)
  let sortKey = req.query.sort || "name";
  Trip.find(modelQuery)
    .sort(sortKey)
    .exec(function (err, items) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render("items/index", {
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

function allTrips(req, res) {
  Trip.find({}, function(err, trips) {
    res.render('trips/index', {trips: trips})
  })
}