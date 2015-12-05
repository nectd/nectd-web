import promise from "es6-promise";
import assign from "object-assign";

if (!Object.assign) Object.assign = assign;

export const env = /^(?:localhost|dev)\b/.test(location.hostname) ? "dev" : "prod";
