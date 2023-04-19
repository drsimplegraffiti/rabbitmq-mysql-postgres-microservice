const sendToOrderQueue = require("../amp/amp");
const productService = require("../service/product.service");

const createANewOrder = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    // check if the product id is valid
    const product = await productService.findProductById(product_id);
    if (!product[0]) {
      return res.status(404).json({ message: "Product not found" });
    }

    // check if the available quantity is greater than the quantity to be ordered
    if (product[0].available_quantity < quantity) {
      return res.status(400).json({ message: "Insufficient quantity" });
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
    await sendToOrderQueue("order_queue", payload); // we use Buffer.from() to convert the order object to a buffer object so that it can be sent to the queue as a message body
    
    // if the order is successfully sent to the queue, remove the ordered quantity from the available quantity
    const new_available_quantity = product[0].available_quantity - quantity;
    await productService.updateProductQuantity(product_id, new_available_quantity);

    
    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createANewOrder,
};
