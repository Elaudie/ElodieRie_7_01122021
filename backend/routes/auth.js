const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/auth");

// Auth
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/desactivateAccount/:id", userCtrl.desactivateAccount);

module.exports = router;