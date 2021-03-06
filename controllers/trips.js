const Trip = require("../models/trip");
const Item = require("../models/item");

module.exports = {
  trip,
  getNewTrip,
  allTrips,
  newTrip,
  create,
  showTrip,
  addItemToTrip,
  removeItemFromTrip,
};

function removeItemFromTrip(req, res) {
  Trip.update(
    { _id: req.params.tripId },
    { $pull: { items: req.params.itemId } },
    function (err, trip) {
      res.redirect(`/trips/${req.params.tripId}`);
    }
  );
}

function showTrip(req, res) {
  Trip.findById(req.params.id)
    .populate("items")
    .exec(function (err, trip) {
      Item.find({ user: req.user, _id: { $nin: trip.items } }, function (
        err,
        inventory
      ) {
        res.render("trips/show", {
          trip: trip,
          user: req.user,
          title: "What To Pack",
          inventory,
        });
      });
    });
}

function addItemToTrip(req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    trip.items.push(req.params.itemId);
    trip.save(function (err) {
      res.redirect(`/trips/${req.params.tripId}`);
    });
  });
}

function newTrip(req, res) {
  res.render("trip/new", { user: req.user });
}

function create(req, res) {
  const newTrip = new Trip(req.body);
  newTrip.user = req.user._id;
  newTrip.save(function (err) {
    if (err) return res.redirect("/trips/new");
    console.log(newTrip);
    res.redirect("/trips");
  });
}

function trip(req, res, next) {
  //req.query = ?query=
  console.log(req.query);
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
    res.render("trips/new", {
      title: "Add Trip",
      items,
    });
  });
}

function allTrips(req, res) {
  Trip.find({}, function (err, trips) {
    res.render("trips/index", { trips: trips });
  });
}
