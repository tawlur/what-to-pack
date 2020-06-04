const express = require('express');
const router = express.Router();
const itemsCtrl = require('../controllers/items'); 

/* GET home page. */
router.get('/', isLoggedIn, itemsCtrl.index);

router.post('/', isLoggedIn, itemsCtrl.create);

//router.get('/:itemId', isLoggedIn, itemsCtrl.getOneItem);
router.delete('/:itemIdToDelete', isLoggedIn, itemsCtrl.deleteOneItem);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() ) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}



module.exports = router;

