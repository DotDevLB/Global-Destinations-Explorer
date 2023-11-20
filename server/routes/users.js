const router = require("express").Router();
const bcrypt = require("bcrypt");
const connect = require('../DBconnection');



router.post("/register", (req, res) => {
  const { username, email, password, dateOfBirth, gender } = req.body;
  if (!username || !email || !password || !dateOfBirth || !gender) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }
  connect.connection.query(
      'INSERT INTO users (username, email, password, dateOfBirth, gender, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [username, email, password, dateOfBirth, gender,],
      (err, result, fields) => {
        if (err) {
          console.log('\x1b[41m\x1b[37m%s\x1b[0m', '[error] User not created'); // Red background
          console.error(err); 
          return res.status(500).json({ errorCode: 500 }); 
        }
        console.log('\x1b[42m\x1b[30m%s\x1b[0m', '[success] User created'); // Green background
        res.json({ errorCode: 200 }); 
      }
  );
});

router.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  connect.connection.query(
    "SELECT * FROM users where username = ? and password = ?",
    [username, password],
    function (err, result, fields) {
      if (err) {
        console.error('\x1b[41m\x1b[37m%s\x1b[0m', 'Error during login'); 
        throw err;
      }

      if (result.length === 1) {
        console.log(`\x1b[42m\x1b[32m[SUCCESS]\x1b[0m Login Succesfully`);
        res.json({
          errorCode: 200,
          user: {
            id: result[0].id,
            username: result[0].username,
            email: result[0].email,
            password: result[0].password,
            dateOfBirth: result[0].dateOfBirth,
            gender: result[0].gender,
            createdAt: result[0].createdAt,
            updatedAt: result[0].updatedAt
          }
        });
      } else {
        console.log('\x1b[41m\x1b[37m%s\x1b[0m', 'Login failed');
        res.json({ errorCode: 404 });
      }

      //console.log(result);
    }
  );
});

router.put("/updateUser/:userId", (req, res) => {
  const userId = req.params.userId;
  const { username, email, password, gender } = req.body;

  if (!username || !email || !password  || !gender) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  connect.connection.query(
    `UPDATE users SET email=?, password=?, gender=? WHERE id=?`,
    [ email, password, gender, userId],
    function (err, result, fields) {
      if (err) {
        console.error('\x1b[41m\x1b[37m%s\x1b[0m', 'Error during update'); 
        throw err;
      }

      if (result.affectedRows === 1) {
        res.json({errorCode:200})
        console.log(`\x1b[42m\x1b[32m[SUCCESS]\x1b[0m Updated Succesfully`);
      } else {
        console.log('\x1b[41m\x1b[37m%s\x1b[0m', 'Update failed');
        res.json({ errorCode: 404 });
      }

      //console.log(result);
    }
  );
});

module.exports=router