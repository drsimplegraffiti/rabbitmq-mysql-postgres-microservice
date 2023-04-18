const amqp = require("amqplib");

const sendToOrderQueue = async (queueName, payload) => {
  try {
    const connection = await amqp.connect(
      "amqps://qqbdtzxg:jPb9PuR40J84bEVN8PrhKkYqAe1lq12G@woodpecker.rmq.cloudamqp.com/qqbdtzxg"
    );
    // log connection
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
     await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
    console.log(`Message sent to ${queueName} queue 🎎🎎🎎`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendToOrderQueue;
