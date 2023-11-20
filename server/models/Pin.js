// const { connection } = require('../DBconnection');
// const connect=require('./DBconnection');

// const PinSchema = `
//     CREATE TABLE IF NOT EXISTS pins (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         userName VARCHAR(255) NOT NULL,
//         title VARCHAR(255) NOT NULL,
//         rating INT NOT NULL,
//         lat DOUBLE NOT NULL,
//         \`long\` DOUBLE NOT NULL,
//         descr TEXT NOT NULL,
//         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )
// `;

// pool.query(PinSchema)
//     .then(([results]) => {
//         console.log('Pin table created or already exists');
//     })
//     .catch((error) => {
//         console.error('Error creating Pin table:', error);
//     });

// module.exports = pool;

// Pin class to represent a pin
class Pin {
  constructor(
    id,
    userName,
    title,
    rating,
    latitude,
    longitude,
    descr,
    createdAt,
    updatedAt
  ) {
    this.id = id || null;
    this.userName = userName || "";
    this.title = title || "";
    this.rating = rating || 0;
    this.latitude = latitude || 0.0;
    this.longitude = longitude || 0.0;
    this.descr = descr || "";
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
  get id() {
    return this._id;
  }
  set id(newId) {
    this._id = newId;
  }

  // Getter and setter for userName
  get userName() {
    return this._userName;
  }
  set userName(newUserName) {
    this._userName = newUserName;
  }

  // Getter and setter for title
  get title() {
    return this._title;
  }
  set title(newTitle) {
    this._title = newTitle;
  }

  // Getter and setter for rating
  get rating() {
    return this._rating;
  }
  set rating(newRating) {
    this._rating = newRating;
  }

  // Getter and setter for latitude
  get latitude() {
    return this._latitude;
  }
  set latitude(newLatitude) {
    this._latitude = newLatitude;
  }

  // Getter and setter for longitude
  get longitude() {
    return this._longitude;
  }
  set longitude(newLongitude) {
    this._longitude = newLongitude;
  }

  // Getter and setter for descr
  get descr() {
    return this._descr;
  }
  set descr(newDescr) {
    this._descr = newDescr;
  }

  // Getter and setter for createdAt
  get createdAt() {
    return this._createdAt;
  }
  set createdAt(newCreatedAt) {
    this._createdAt = newCreatedAt;
  }

  // Getter and setter for updatedAt
  get updatedAt() {
    return this._updatedAt;
  }
  set updatedAt(newUpdatedAt) {
    this._updatedAt = newUpdatedAt;
  }
}

module.exports = Pin;
