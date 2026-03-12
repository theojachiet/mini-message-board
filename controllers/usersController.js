const usersStorage = require("../storages/usersStorage");
const db = require("../db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  console.log('usernames: ', usernames);
  res.send("Usernames: " + usernames.map(user => user.username).join(', '));
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
  res.redirect('/users')
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  clearDatabase,
  searchDatabase
};

// exports.usersListGet = (req, res) => {
//   res.render("users", {
//     title: "User list",
//     users: usersStorage.getUsers(),
//   });
// };

// exports.usersCreateGet = (req, res) => {
//   res.render("createUser", {
//     title: "Create user",
//   });
// };

// exports.usersCreatePost = (req, res) => {
//   const { firstName, lastName, email, age, bio } = req.body;
//   usersStorage.addUser({ firstName, lastName, email, age, bio });
//   res.redirect("/users");
// };

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

// // We can pass an entire array of middleware validations to our controller.
// exports.usersCreatePost = [
//   validateUser,
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).render("createUser", {
//         title: "Create user",
//         errors: errors.array(),
//       });
//     }
//     const { firstName, lastName, email, age, bio } = matchedData(req);
//     usersStorage.addUser({ firstName, lastName, email, age, bio });
//     res.redirect("/users");
//   }
// ];

// // UPDATE
// exports.usersUpdateGet = (req, res) => {
//   const user = usersStorage.getUser(req.params.id);
//   res.render("updateUser", {
//     title: "Update user",
//     user: user,
//   });
// };

// exports.usersUpdatePost = [
//   validateUser,
//   (req, res) => {
//     const user = usersStorage.getUser(req.params.id);
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).render("updateUser", {
//         title: "Update user",
//         user: user,
//         errors: errors.array(),
//       });
//     }
//     const { firstName, lastName, email, age, bio } = matchedData(req);
//     usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
//     res.redirect("/users");
//   }
// ];

// // DELETE
// exports.usersDeletePost = (req, res) => {
//   usersStorage.deleteUser(req.params.id);
//   res.redirect("/users");
// };

// // SEARCH
// exports.usersSearch = (req, res) => {
//   const { search } = req.query;
//   const users = usersStorage.getUsers();
//   const result = users.filter(user =>
//   (user.firstName.includes(search) ||
//     user.lastName.includes(search) ||
//     user.email.includes(search) ||
//     (user.firstName + ' ' + user.lastName).includes(search)));
//   res.render("users", {
//     title: "Search Result",
//     users: result,
//   });
// };