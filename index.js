const logsAPI = require("@opentelemetry/api-logs");
const {
  LoggerProvider,
  SimpleLogRecordProcessor,
  ConsoleLogRecordExporter,
} = require("@opentelemetry/sdk-logs");
const { metrics, ValueType } = require("@opentelemetry/api");
const {
  OpenTelemetryTransportV3,
} = require("@opentelemetry/winston-transport");
const winston = require("winston");
// To start a logger, you first need to initialize the Logger provider.
const loggerProvider = new LoggerProvider();
// Add a processor to export log record
loggerProvider.addLogRecordProcessor(
  new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
);
logsAPI.logs.setGlobalLoggerProvider(loggerProvider);

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new OpenTelemetryTransportV3(),
  ],
});
async function greetings(context) {
  const startTime = new Date().getTime();
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from greetings!"),
  };
  logger.info(context);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  histogram.record(executionTime);
  return response;
}

const meter = metrics.getMeter("example-meter");
exports.handler = async (event, context) => {
  const histogram = meter.createHistogram("example-histogram", {
    description: "Example histogram",
    unit: "miliseconds",
    valueType: ValueType.INT,
  });
  // TODO implement
  logger.info(event)
  switch (event) {
    case "greetings":
      await greetings(context);
      break;

    default:
      const startTime = new Date().getTime();
      const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from home!"),
      };
      logger.info("Hello from home! correctly sended");
      const endTime = new Date().getTime();
      const executionTime = endTime - startTime;
      histogram.record(executionTime);
      return response;
      break;
  }
};
