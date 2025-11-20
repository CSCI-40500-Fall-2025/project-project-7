
import * as Sentry from "@sentry/node";
import winston from "winston";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});


const SentryTransport = new winston.transports.Console({
  log(info, sentryCall) {
    const { level, message, ...meta } = info;

    switch (level) {
      case "error":
        Sentry.captureException(new Error(message), { extra: meta });
        break;
      default:
        Sentry.captureMessage(message, { level });
    }

    sentryCall();
  },
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "sily",
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),
    SentryTransport,
  ],
});

if (process.env.CI === "true") {
  logger.remove(SentryTransport);
}

export default logger;
