// // Importer Express
// const express = require('express');
// // Créer un router
// const router = express.Router();
// const userCtrl = require('../controllers/user');


// /* Router pour USER */
// // Route pour l'inscription
// router.post('/signup', userCtrl.signup);


// // Route pour la connexion


// // Exporter le router
// module.exports = router;

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer")


// Post CRUD
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/image/:id", auth, userCtrl.getProfilPicture);
router.put("/:id", auth, upload.single("profil_image"), userCtrl.updateOneUser);


module.exports = router;