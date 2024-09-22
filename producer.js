//producer js
const amqp = require("amqplib/callback_api");

const sendMessage = (msg) => {
  try {
    amqp.connect("amqp://user:password@localhost", (error0, connection) => {
      if (error0) {
        throw error0;
      }
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        const queue = "testQueue";
        const message = msg || "Hello World!";

        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(" [x] Sent %s", message);
      });

      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500);
    });
  } catch (error) {
    console.error(`error in sendMessgae::${error}`);
  }
};

// Send message to queue
sendMessage("Message from producer 33333");
