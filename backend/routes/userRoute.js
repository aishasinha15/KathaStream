import express from "express";
import {
  Register,
  Login,
  Logout,
  addToMyList,
  removeFromMyList,
  getMyList,
  addToSearchHistory,
  getSearchHistory,
} from "../controllers/user.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.post("/:userId/add-to-mylist", addToMyList);
router.post("/:userId/remove-from-mylist", removeFromMyList);
router.get("/:userId/mylist", getMyList);
router.post("/:userId/add-to-search-history", addToSearchHistory);
router.get("/:userId/search-history", getSearchHistory);

export default router;
