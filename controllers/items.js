const Item = require('../models/item');

module.exports = {
  new: newItem,
  create,
  index,
  
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
function deleteItem(req, res) {
  Author.findByIdAndRemove(req.params.authorIdToDelete, function(err, deleteAuthorConfirmation) {
      Book.deleteMany({author: req.params.authorIdToDelete}, function(err) {
          res.redirect('/authors');
      })
  })
}
