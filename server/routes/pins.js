const router = require("express").Router();
const connect = require("../DBconnection");
const Pin=require("../models/Pin")

router.post("/create", (req, res) => {
  const { userName, title, rating, latitude, longitude, descr } = req.body;

  if (!userName || !title || !rating || !latitude || !longitude || !descr) {
    return res.status(400).json({ errorCode: 400, message: "Required fields are missing" });
  }
  connect.connection.query(
    "INSERT INTO pins(userName, title, rating, latitude, longitude, descr) VALUES (?, ?, ?, ?, ?, ?)",
    [userName, title, rating, latitude, longitude, descr],
    (err, result, fields) => {
      if (err) {
        console.log("\x1b[31m", "Error inserting data:", err); // Red color for error
        res.status(500).json({ errorCode: 500, message: "Error inserting data" });
      } else {
        console.log(`\x1b[42m\x1b[32m[SUCCESS]\x1b[0m Pin created Successfully`);
        res.status(200).json({ errorCode: 200, message: "Pin created successfully" });
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  connect.connection.query(
    "DELETE FROM pins WHERE id = ?",
    [id],
    (err, result, fields) => {
      if (err) {
        console.log("\x1b[31m", "Error deleting pin:", err);
        res.status(500).json({ errorCode: 500, message: "Error deleting pin" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ errorCode: 404, message: "Pin not found" });
        } else {
          console.log(`\x1b[42m\x1b[32m[SUCCESS]\x1b[0m Pin deleted Successfully`);
          res.status(200).json({ errorCode: 200, message: "Pin deleted successfully" });
        }
      }
    }
  );
});

router.put("/update/:id", (req, res) => {
  const pinId = req.params.id;
  const { title, rating, latitude, longitude, descr } = req.body;

  connect.connection.query(
    "UPDATE pins SET title = ?, rating = ?, latitude = ?, longitude = ?, descr = ? WHERE id = ?",
    [title, rating, latitude, longitude, descr, pinId],
    (err, result, fields) => {
      if (err) {
        console.log("\x1b[31m", "Error updating pin:", err);
        res.status(500).json({ errorCode: 500, message: "Error updating pin" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ errorCode: 404, message: "Pin not found" });
        } else {
          console.log(`\x1b[42m\x1b[32m[SUCCESS]\x1b[0m Pin updated Successfully`);
          res.status(200).json({ errorCode: 200, message: "Pin updated successfully" });
        }
      }
    }
  );
});



router.get("/getAll",(req,res)=>{
    
    connect.connection.query(
        "SELECT * FROM pins",
        (err, result, fields) => {
          if (err) {
            console.log("\x1b[31m", "Error reading data:", err); // Red color for error
            res.status(500).send("Error reading data");
          } else {
            console.log(`\x1b[42m\x1b[32m[SUCCESS]\x1b[0m Pin read Successfully`);
            res.status(200).json(result); // Sending the result (pins) as JSON in response
          }
        }
      );
      
})
module.exports=router