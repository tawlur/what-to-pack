const Item = require("../models/item");
const Trip = require("../models/trip");
module.exports = {
  new: newItem,
  create,
  index,
  deleteOneItem,
};

function create(req, res) {
  req.body.user = req.user;
  Item.create(req.body, function (err, newItem) {
    console.log(err);
    console.log(newItem);
    res.redirect("/items");
  });
}

function newItem(req, res) {
  Item.find({}, function (err, items) {
    res.render("items/new", {
      title: "Add Item",
      items,
    });
  });
}

function index(req, res) {
  Trip.find({}, function (err, trips) {
    Item.find({user: req.user}, function (err, items) {
      res.render("items/index", {
        title: "What To Pack",
        items,
        user: req.user,
        trips,
      });
    });
  });
}

function deleteOneItem(req, res) {
  Item.findByIdAndRemove(req.params.itemIdToDelete, function (
    err,
    deleteItemConfirmation
  ) {
    res.redirect("/items");
  });
}
