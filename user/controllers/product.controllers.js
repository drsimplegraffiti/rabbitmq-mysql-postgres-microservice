const productService = require("../service/product.service");
const userService = require("../service/user.service");

const createANewProduct = async (req, res) => {
  try {
    const { id } = req.user;

    // check if user is an admin
    const user = await userService.findUserById(id);
    if (user[0].role === "user") {
      return res.status(401).json({ message: "Admin role only 🔒🔒🔒" });
    }
    const { product_name, available_quantity, price } = req.body;

    // check if product already exists in the database by name
    const product = await productService.findProductByName(product_name);
    if (product[0]) {
      return res.status(400).json({ message: "Product already exists" });
    }

    await productService.createANewProduct(
      product_name,
      available_quantity,
      price,
      id
    );
    return res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.findProductById(id);
    if (!product.length) {
      return res.status(400).json({ message: "Product does not exist" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findProductByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    const product = await productService.findProductByUserId(id);
    if (!product.length) {
      return res.status(400).json({ message: "Product does not exist" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const buyAProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.findProductById(id);
    if (!product.length) {
      return res.status(400).json({ message: "Product does not exist" });
    }
    const { product_name, price } = product[0];
    const { id: user_id } = req.user;
    const order = await orderService.createAnOrder(
      product_name,
      price,
      user_id
    );
    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createANewProduct,
  findProductById,
  findProductByUserId,
};
