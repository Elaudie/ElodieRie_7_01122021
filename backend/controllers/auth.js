const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../config/db");

exports.signup = async (req, res) => {
  try {
    const { user_password: password } = req.body;

    // ====== Password encryption =========
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = {
      ...req.body,
      user_password: encryptedPassword,
    };
    const sql = "INSERT INTO users (user_firstname, user_lastname, user_email, user_password, active) VALUES(?, ?, ?, ?, ?)";
    db.query(sql, [user.firstname, user.lastname, user.email, user.user_password, user.active], (err, result) => {
      if (!result) {
        res.status(200).json({ message: "Email déjà enregistré" });
      } else {
        res.status(201).json({ message: "Utilisateur enregistré !" });
      }
    });
  } catch (err) {
    res.status(200).json({ message: "Erreur enregistrement", err });
  }
};

exports.login = (req, res) => {
  //===== Check if user exists in DB ======
  const { user_email, user_password } = req.body;
  const sql = `SELECT user_firstname, user_lastname, user_password, user_id FROM users WHERE user_email = ?`;
  db.query(sql, [user_email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }

    // ===== Verify password with hash in DB ======
    if (results[0]) {
      try {
        const { user_password: hashedPassword, user_id } = results[0];
        const match = await bcrypt.compare(user_password, hashedPassword);
        if (match) {
          // If match, generate JWT token
          const maxAge = 1 * (24 * 60 * 60 * 1000);
          const token = jwt.sign({ user_id }, process.env.JWT_TOKEN, {
            expiresIn: maxAge,
          });

          // remove the password key of the response
          delete results[0].user_password;

          res.cookie("jwt", token);
          res.status(200).json({
            user: results[0],
            token: jwt.sign({ userId: user_id }, process.env.JWT_TOKEN, {
              expiresIn: "24h",
            }),
          });
        } 
      } catch (err) {
        return res.status(400).json({ err });
      }
    } else if (results[0] && results[0].active === 0) {
      res.status(200).json({
        error: true,
        message: "Votre compte a été désactivé",
      });
    } else if (!results[0]) {
      res.status(200).json({
        error: true,
        message: "Email ou mot de passe incorrect"
      })
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("LOGOUT");
};

exports.desactivateAccount = (req, res) => {
  const userId = req.params.id;
  const sql = `UPDATE users SET active=0 WHERE user_id`;
  db.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.clearCookie("jwt");
    res.status(200).json("DESACTIVATE");
  });
};