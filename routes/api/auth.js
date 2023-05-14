const express = require("express");

const authRouter = express.Router();

const ctrlUser = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, upload } = require("../../middlewares");
const schemas = require("../../schemas");

// Registration
authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrlUser.register)
);
// LogIn
authRouter.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrlUser.login)
);
// avatars(используем позже)

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrlUser.updateAvatar)
);
// Get current user

authRouter.get("/current", authenticate, ctrlWrapper(ctrlUser.getCurrent));

// Update user fields
authRouter.patch(
  "/user-info",
  authenticate,
  upload.single("name"),
  ctrlWrapper(ctrlUser.updateUser)
);
// logout
authRouter.post("/logout", authenticate, ctrlWrapper(ctrlUser.logout));

module.exports = authRouter;
