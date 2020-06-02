var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
    res.render('items/index', {title: 'What to pack', user: req.user});
})



module.exports = router;

