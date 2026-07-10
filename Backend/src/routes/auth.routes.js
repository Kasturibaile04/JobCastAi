const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/login", authController.LoginUserController);

/**
 * @route GET /api/auth/logout
 * @description Logout user
 * @access Public
 */
authRouter.get("/logout", authController.LogoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get current logged in user
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController);

module.exports = authRouter;