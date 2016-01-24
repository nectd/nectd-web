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

        this.userData = {};
        this.userGroups = {};
        this.requests = {};
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

        this.userData = {};
        this.userGroups = {};
        Nectd.logout();

        loginStatus = "logout";
        fetchLoginStatus(this);

        this.emit("logout");
        this.emit("loginStatus", "logout");
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

    fetchUserData(what) {
        if (loginStatus !== "connected")
            return Promise.reject();

        if (this.requests[what])
            return this.requests[what];

        var request = this.requests[what] = this.get(`account/${what}`)
            .then((data) => {
                delete this.requests[what];
                this.userData[what] = data;
                this.emit(`${what}Load`, data);
                return data;
            });

        return request;
    }

    fetchGroup(id) {
        if (loginStatus !== "connected")
            return Promise.reject();

        var what = `group-${id}`;
        if (this.requests[what])
            return this.requests[what];

        var request = this.requests[what] = this.get(`graph/groups/${id}/contacts`)
            .then((data) => {
                delete this.requests[what];
                this.userGroups[id] = data;
                this.emit(`groupLoad`, data, id);
                return data;
            }, console.error.bind(console));

        return request;
    }

    getGroupById(id) {
        return this.userData.groups.find((group) => group.nodeId === id);
    }

    upsertGroup(group) {
        var idx = this.userData.groups.findIndex((grp) => group.nodeId === grp.nodeId);
        var groups = this.userData.groups;

        if (idx < 0) groups.push(group);
        else groups.splice(idx, 1, group);

        this.emit("groupsLoad", groups);
    }
}

const instance = new NectdAPI();

export default instance;

if (env !== "prod")
    window.NectdAPI = instance;
