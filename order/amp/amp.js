const amqp = require("amqplib");
const orderService = require("../service/order.service");

const receiveFromOrderQueue = async (queueName) => {
  try {
    const connection = await amqp.connect(
      "amqps://qqbdtzxg:jPb9PuR40J84bEVN8PrhKkYqAe1lq12G@woodpecker.rmq.cloudamqp.com/qqbdtzxg"
    );
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    // Consume messages from the queue
    channel.consume(queueName, async (data) => {
      try {
        if (data !== null) {
          // Process the message
          const { amount, quantity, total_amount, product_id, customer_id } = JSON.parse(
            data.content
          );


          // create a new order
          await orderService.createANewOrder(
            amount,
            quantity,
            total_amount,
            product_id,
            customer_id
          );

          // Acknowledge that the message has been processed
          channel.ack(data);

          console.log("===========🎈🎈=========================================")
          console.log("Message received from RabbitMQ server- from the order queue");
          console.log("===========🎈🎈=========================================")
        }
      } catch (error) {
        console.log(error);
      }
    });

    console.log("Waiting for payloads from RabbitMQ server");
  } catch (error) {
    console.error("Error receiving payloads from RabbitMQ server:", error);
  }
};

module.exports = receiveFromOrderQueue;
