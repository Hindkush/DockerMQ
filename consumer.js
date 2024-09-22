// consumer.js

const amqp = require("amqplib/callback_api");

const receiveMessage = () => {
  try {
    amqp.connect(`amqp://user:password@localhost`, (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        const queue = `testQueue`;

        channel.assertQueue(queue, { durable: false });
        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queue
        );
        channel.consume(
          queue,
          (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
          },
          { noAck: true }
        );
      });
    });
  } catch (error) {
    console.error(`error in receiveMessgae::${error}`);
  }
};

// Start receiving messages
receiveMessage();
