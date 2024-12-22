import winston from "winston";

const logger = winston.createLogger();
exports.handler = async (event) => {
    // TODO implement
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from home!'),
    };
    logger.info("Hello from home! correctly sended");
    return response;
  };
  