const isAuth = require("../../middleware/isAuth");
const { createANewOrder, findOrderById, findOrderByUserId } = require("../controllers/order.controller");
const {
  findProductByUserId,
  findProductById,
  createANewProduct,
} = require("../controllers/product.controllers");
const { userSignUp, userSignIn } = require("../controllers/user.controllers");

const router = require("express").Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);

router.post("/products",isAuth, createANewProduct);
router.get("/products/:id", findProductById);
router.get("/products", findProductByUserId);

router.post("/orders", isAuth, createANewOrder);


module.exports = router;
