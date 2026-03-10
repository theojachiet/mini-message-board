const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

// CREATE
usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);

// UPDATE
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);

// DELETE
usersRouter.post("/:id/delete", usersController.usersDeletePost);

// SEARCH
usersRouter.get("/search", usersController.usersSearch);

module.exports = usersRouter;