import AoCAPI from "./api/index";

(async () => {
    await AoCAPI.login({ platform: "github" });
})();