const db = require("../config/db");

// CRUD post

exports.createPost = (req, res, next) => {
  let { body, file } = req;
  if (!file) delete req.body.post_image;
  body = {
    ...body,
  };

  const sqlInsert = "INSERT INTO posts SET ?";
  db.query(sqlInsert, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    // post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query
    const post_id = result.insertId;
    if (file) {
      const sqlInsertImage = `INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
      db.query(sqlInsertImage, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getAllPosts = (req, res, next) => {
  const sql =
    "SELECT * FROM posts, users WHERE user_id = user_id";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOnePost = (req, res, next) => {
  const { id: postId } = req.params;
  const sqlGetOnePost = `SELECT * FROM posts WHERE id = ${postId};`;
  db.query(sqlGetOnePost, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOneImage = (req, res, next) => {
  const { id: postId } = req.params;
  const sqlGetImage = `SELECT * FROM images = ${postId};`;
  db.query(sqlGetImage, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result[0]) {
      result[0].image_url =
        req.protocol +
        "://" +
        req.get("host") +
        "/images/" +
        result[0].image_url;
    }
    res.status(200).json(result);
  });
};

exports.updatePost = (req, res, next) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.deleteOnePost = (req, res, next) => {
  const { id: post_id } = req.params
  const sql = `DELETE FROM posts WHERE id = ${post_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};