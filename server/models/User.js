class User {
  constructor(
    id,
    username,
    email,
    password,
    dateOfBirth,
    gender,
    createdAt,
    updatedAt
  ) {
    this.id = id || null;
    this.username = username || "";
    this.email = email || "";
    this.password = password || "";
    this.dateOfBirth = dateOfBirth || null;
    this.gender = gender || "";
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Getter and setter for ID
  get id() {
    return this._id;
  }
  set id(newId) {
    this._id = newId;
  }

  // Getter and setter for username
  get username() {
    return this._username;
  }
  set username(newUsername) {
    this._username = newUsername;
  }

  // Getter and setter for email
  get email() {
    return this._email;
  }
  set email(newEmail) {
    this._email = newEmail;
  }

  // Getter and setter for password
  get password() {
    return this._password;
  }
  set password(newPassword) {
    this._password = newPassword;
  }

  // Getter and setter for dateOfBirth
  get dateOfBirth() {
    return this._dateOfBirth;
  }
  set dateOfBirth(newDateOfBirth) {
    this._dateOfBirth = newDateOfBirth;
  }

  // Getter and setter for gender
  get gender() {
    return this._gender;
  }
  set gender(newGender) {
    this._gender = newGender;
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
