const usersStorage = require("../storages/usersStorage");
const db = require("../db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  console.log('usernames: ', usernames);
  res.render("users", {
    title: "Usernames list",
    users: usernames,
  });
  // res.send("Usernames: " + usernames.map(user => user.username).join(', '));
}

async function createUsernameGet(req, res) {
  res.render("createUser", {
    title: "Create user",
  });
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/users");
}

async function searchDatabase(req, res) {
  const { searchInput } = req.body;
  const searchResult = await db.search(searchInput);
  res.send('Search Result:' + searchResult.map(user => user.username).join(', '));
}

async function clearDatabase(req, res) {
  await db.clearDatabase();
  res.redirect('/users');
}

async function usersDeletePost(req, res) {
  const userId = req.params.id;
  await db.deleteUser(userId);
  res.redirect('/users');
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  clearDatabase,
  searchDatabase,
  usersDeletePost
};

// // FORM VALIDATION

// const { body, validationResult, matchedData } = require("express-validator");

// const alphaErr = "must only contain letters.";
// const lengthErr = "must be between 1 and 10 characters.";
// const emailErr = "must be a valid email format";
// const ageErr = "must be a whole number between 1 and 120"
// const bioErr = "must be less than 200 characters"

// const validateUser = [
//   body("firstName").trim()
//     .isAlpha().withMessage(`First name ${alphaErr}`)
//     .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
//   body("lastName").trim()
//     .isAlpha().withMessage(`Last name ${alphaErr}`)
//     .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
//   body("email").trim()
//     .isEmail().withMessage(`Email ${emailErr}`),
//   body("age").optional({ values: 'falsy' }).trim()
//     .isInt({ min: 1, max: 120 }).withMessage(`Age ${ageErr}`),
//   body("bio").optional({ values: 'falsy' }).trim()
//     .isLength({ max: 200 }).withMessage(`Bio ${bioErr}`),
// ];