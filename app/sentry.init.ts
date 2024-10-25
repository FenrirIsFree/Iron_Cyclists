import * as Sentry from "@sentry/nextjs";

export function initSentry() {
  Sentry.init({
    dsn: "https://d53b9e50069bf3b65bd47bea5ae5205a@o4508099670507520.ingest.us.sentry.io/4508099673260032",
    tracesSampleRate: 1,
    debug: false,
  });
}
