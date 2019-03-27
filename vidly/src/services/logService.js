// import * as Sentry from "@sentry/browser";

function init() {
  //To implemet sentry.io
  /*
  Sentry.init({
    dsn: "https://78b1f7cb23d64c76946f07e71b7431d3@sentry.io/1424068"
  });
  */
}

function log(error) {
  /*
  Sentry.captureException(error);
  */
  console.log(error);
}

export default {
  init,
  log
};
