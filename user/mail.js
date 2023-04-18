const nodemailer = require('nodemailer');
const amqp = require('amqplib');

const sendEmail = async (options) => {
    // 1) create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
        },
    });
    
    // 2) define the email options
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    };

    // 3) actually send the email
    await transporter.sendMail(mailOptions);
};

const sendToOrderQueue = async (queueName, payload) => {
    try {
        const connection = await amqp.connect(process.env.CLOUDAMQP_URL);
        // log connection
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName);
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
        console.log(`Message sent to ${queueName} queue 🎎🎎🎎`);
    } catch (error) {
        console.log(error);
    }
};

const receiveFromOrderQueue = async (queueName) => {
    try {
        const connection = await amqp.connect(process.env.CLOUDAMQP_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: false });
        channel.consume(
            queueName,
            (message) => {
                console.log(`Message received from ${queueName} queue 🎈🎈🎈🎈`);
                console.log(JSON.parse(message.content.toString()));
                sendEmail(JSON.parse(message.content.toString()));
            },
            { noAck: true }
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendToOrderQueue, receiveFromOrderQueue };
