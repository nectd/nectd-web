var status = "loading";

if (typeof window === "undefined" || !window.NectdScript) {
    console.log("Something's not right...");
    status = "failed";
}

NectdScript.addEventListener("load", () => { status = "ready"; });
NectdScript.addEventListener("error", () => { status = "failed"; });

export default {
    get status() {
        return status;
    }
};
