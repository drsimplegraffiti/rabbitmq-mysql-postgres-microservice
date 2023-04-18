const sendToOrderQueue = require("../amp/amp");
const productService = require("../service/product.service");

const createANewOrder = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    // check if the product id is valid
    const product = await productService.findProductById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // get the price of the product, multiply it by the quantity and get the total amount
    const total_amount = product[0].price * quantity;
    const convert_price_to_number = Number(product[0].price);
  

    // create a new order object
    const payload = {
      product_id,
      quantity,
      total_amount,
      customer_id: req.user.id,
      amount: convert_price_to_number,
      customer_id: req.user.id,
    };

    // Send order to order queue
   await  sendToOrderQueue("order_queue", payload); // we use Buffer.from() to convert the order object to a buffer object so that it can be sent to the queue as a message body
    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createANewOrder,
};
