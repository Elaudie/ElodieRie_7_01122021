const db = require("../config/db");

exports.getOneUser = (req, res, next) => {
  const { id: userId } = req.params;
  const sqlGetUser = `SELECT * FROM users WHERE user_id = ${userId}`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    delete result[0].user_password;
    res.status(200).json(result);
  });
};

exports.updateOneUser = (req, res, next) => {
  if (req.file) {
    const {id: user_id} = req.params
    let {destination, filename} = req.file
    destination = destination + filename

    const sqlInsertImage = `INSERT INTO images (user_id, image_url) VALUES (NULL, ${user_id}, "${destination}");`;
    db.query(sqlInsertImage, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
    });
  }

  const { id: userId } = req.params;
  db.query(sqlUpdateUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

exports.getProfilPicture = (req, res, next) => {
  const { id: user_id } = req.params;
  const sqlGetUser = `SELECT image_url FROM images WHERE user_id = ${user_id} ORDER BY images.image_id desc;`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};