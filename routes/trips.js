const express = require("express");
const router = express.Router();
const tripsCtrl = require("../controllers/trips");

/* GET home page. */
router.get("/new", isLoggedIn, tripsCtrl.getNewTrip);

router.post("/", isLoggedIn, tripsCtrl.create);
router.get("/", isLoggedIn, tripsCtrl.allTrips);
router.get("/new", isLoggedIn, tripsCtrl.newTrip);
router.post("/new", isLoggedIn, tripsCtrl.create);
router.get("/:id", isLoggedIn, tripsCtrl.showTrip);
router.get('/:tripId/items/:itemId', tripsCtrl.addItemToTrip)
router.get('/:tripId/items/:itemId/remove', tripsCtrl.removeItemFromTrip)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/google");
  }
}

module.exports = router;
