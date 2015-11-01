import promise from "es6-promise";

export const env = /^(?:localhost|dev)\b/.test(location.hostname) ? "dev" : "prod";
