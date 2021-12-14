const db = require("../config/db");

// CRUD comments

exports.deleteOneComment = (req, res) => {
  const comment_id = req.params.id
  const sql = `DELETE FROM comments WHERE comments.id = ${comment_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOneComment = (req, res) => {
  const commentId = req.params.id
  const sql = `SELECT * FROM comments WHERE comments.id = ${commentId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getAllComments = (req, res) => {
    const postId = req.params.id
    const sql = `SELECT * FROM comments WHERE post_id = ${postId}`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    });
  };
  
  exports.createComment = (req, res, next) => {
    const { message, user_id } =
      req.body;
    const post_id = req.params.id
    const sql = `INSERT INTO comments (user_id, post_id, message) VALUES ( ${user_id}, ${post_id}, "${message}")`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        console.log(err)
        throw err;
      }
      res.status(200).json(result);
    });
  };