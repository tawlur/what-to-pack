const Item = require('../models/item');

module.exports = {
  new: newItem,
  create,
  index,
  deleteOneItem,
  
}

function create (req, res) {
  req.body.user = req.user;
  Item.create(req.body, function (err, newItem) {
    console.log(err);
    console.log(newItem);
    res.redirect('/items');
  });
}

function newItem(req, res) {
  Item.find({}, function (err, items) {
    res.render('items/new', {
      title: 'Add Item',
      items
    });
  })
}

function index(req, res) {
  Item.find({}, function(err, items) {
  res.render('items/index', { title: 'What To Pack', items, user: req.user});
});
}

// Define deleteOneAuthor (our delete/destroy route)
function deleteOneItem(req, res) {
  Item.findByIdAndRemove(req.params.itemIdToDelete, function(err, deleteItemConfirmation) {
          res.redirect('/items');
      })
  }

