const express = require('express');
const router = express.Router();
const tripsCtrl = require('../controllers/trips');


/* GET home page. */
// router.get('/', isLoggedIn, tripsCtrl.index);
router.get('/new', isLoggedIn, tripsCtrl.getNewTrip);

router.post('/', isLoggedIn, tripsCtrl.createTrip);
router.get('/', isLoggedIn, tripsCtrl.allTrips);
router.get('/new', isLoggedIn, tripsCtrl.newTrip);
router.post('/add', isLoggedIn, tripsCtrl.create);
router.post('/show', isLoggedIn, tripsCtrl.create);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() ) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}


module.exports = router;

