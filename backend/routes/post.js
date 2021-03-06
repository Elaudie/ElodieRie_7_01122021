const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer")

// Post CRUD
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, upload.single("post_image"), postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deleteOnePost);
router.put("/:id", auth, postCtrl.updatePost);

// Images
router.get("/image/:id", auth, postCtrl.getOneImage);

module.exports = router;