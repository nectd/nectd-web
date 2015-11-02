import EventEmitter from "events";
import env from "./config";

var status = "starting",
    loginStatus = "starting",
    version = "1.0",
    Nectd;

function wrapNectd(api) {
    Nectd = window.Nectd;
    fetchLoginStatus(api);

    if (env === "prod")
        delete window.Nectd;
}
function fetchLoginStatus(api) {
    Nectd.getLoginStatus((response) => {
        loginStatus = response.status;
        api.emit("loginStatus", loginStatus);
    });
}

class NectdAPI extends EventEmitter {
    constructor() {
        super();

        if (typeof window === "undefined" || !window.NectdScript) {
            console.log("Something's not right...");
            status = "failed";
        } else if (typeof window.Nectd !== "undefined") {
            status = "ready";
            wrapNectd(this);
        } else {
            status = "loading";
            NectdScript.addEventListener("load", () => {
                status = "ready";
                wrapNectd(this);
                this.emit("status", status);
                this.emit("ready");
            });
            NectdScript.addEventListener("error", () => {
                status = "failed";
                this.emit("status", status);
                this.emit("fail");
            });
        }
    }

    get status() {
        return status;
    }

    get loginStatus() {
        return loginStatus;
    }

    login() {
        if (status !== "ready") return false;

        this.emit("loginStart");
        Nectd.login((token) => {
            this.emit("loginEnd", token);
            fetchLoginStatus(this);
        });
    }
    logout() {
        if (status !== "ready") return false;

        this.userInfo = null;
        Nectd.logout();
        fetchLoginStatus(this);
        this.emit("logout");
    }

    api(name, method, payload) {
        if (payload && typeof payload === "object")
            payload = JSON.stringify(payload);

        return new Promise((resolve, reject) => {
            Nectd.api(`/api/v${version}/${name}`, method, payload, resolve, reject);
        });
    }

    get(name, payload) {
        return this.api(name, "GET", payload);
    }
    post(name, payload) {
        return this.api(name, "POST", payload);
    }
    delete(name) {
        return this.api(name, "DELETE");
    }

    fetchUserInfo() {
        if (loginStatus !== "connected")
            return Promise.reject();

        if (this.userInfo)
            return Promise.resolve(this.userInfo);

        return this.get("account/profiles")
            .then((info) => this.userInfo = info);
    }
}

const instance = new NectdAPI();

export default instance;

if (env !== "prod")
    window.NectdAPI = instance;
