const amqp = require("amqplib");
const rabbitMQHostname = "rabbitmq-container"; // Use the container name as the hostname

async function publishersFunction(crawlerMessage) {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(`amqp://${rabbitMQHostname}:5672`);
    const channel = await connection.createChannel();

    // Create a new exchange
    const exchangeName = "data_exchange";
    await channel.assertExchange(exchangeName, "direct", { durable: true });

    // Create a new items and publish them to the exchange
    const routingKey = "crawler_data";
    const message = {
      responseData: crawlerMessage,
      timeStamp: Date.now().toString(),
    };
    const messageBuffer = Buffer.from(JSON.stringify(message));
    await channel.publish(exchangeName, routingKey, messageBuffer);

    // Create a new queue and bind it to the exchange
    const queueName = "crawler_queue";
    const queueOptions = { durable: true };
    await channel.assertQueue(queueName, queueOptions);
    await channel.bindQueue(queueName, exchangeName, routingKey);

    // Close the channel and connection
    await channel.close();
    await connection.close();
  } catch (err) {
    console.error("Error while publishing a new message:", err);
  }
}

module.exports = publishersFunction;
