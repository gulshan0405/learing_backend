const express = require("express");
const {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUserById,
} = require("../controllers/user.controller");

const router = express.Router();

//Routes
router.route("/").get(handleGetAllUser).post(handleCreateUserById);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);
module.exports = router;
