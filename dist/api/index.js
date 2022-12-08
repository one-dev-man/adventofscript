"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _AoCAPI_Client_cookies, _AoCAPI_Client_Cookies_session;
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const locale_1 = require("./locale");
class AoCAPI {
    constructor() {
    }
    // 
    static sendRequest(options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            // 
            let result;
            // 
            let endpoint_url = new URL(locale_1.APILocale.ENDPOINTS.parse(options.endpoint, options.argmap || {}));
            let request = https_1.default.request(endpoint_url, {
                method: options.method,
                headers: {
                    "User-Agent": "AdventOfScript-API/1.0"
                }
            });
            request.on("response", resp => {
                result = {
                    code: resp.statusCode || null,
                    status: resp.statusMessage || null,
                    headers: resp.headers,
                    content: null
                };
                if (options.method != "HEAD") {
                    let data = Buffer.from([]);
                    resp.on("close", () => {
                        result.content = data;
                        resolve(result);
                    });
                    resp.on("data", d => {
                        data = Buffer.concat([data, d]);
                    });
                }
                else
                    resolve(result);
            });
            request.end();
        });
    }
    //
    static async login(options) {
        let aoc_login_response = await this.sendRequest({
            method: "HEAD",
            endpoint: locale_1.APILocale.ENDPOINTS.AUTH,
            argmap: { platform: options.platform }
        });
        if (!aoc_login_response.headers || aoc_login_response.code != 302)
            return null;
        console.log(aoc_login_response.headers["location"]);
        // 
        let platform_login_response = await this.sendRequest({
            method: "GET",
            endpoint: aoc_login_response.headers["location"] || ""
        });
        if (!platform_login_response.headers || platform_login_response.code != 302)
            return null;
        console.log(platform_login_response.headers["location"]);
        // 
        let callback_platform_login_response = await this.sendRequest({
            method: "HEAD",
            endpoint: platform_login_response.headers["location"] || ""
        });
        if (!callback_platform_login_response.headers)
            return null;
        if (callback_platform_login_response.code == 200) {
            // open(platform_login_response.headers["location"])
            console.log(callback_platform_login_response);
        }
        // 
    }
}
exports.default = AoCAPI;
class AoCAPI_Client {
    // 
    constructor(cookies) {
        _AoCAPI_Client_cookies.set(this, void 0);
        __classPrivateFieldSet(this, _AoCAPI_Client_cookies, cookies, "f");
    }
    // 
    get cookies() { return __classPrivateFieldGet(this, _AoCAPI_Client_cookies, "f"); }
}
_AoCAPI_Client_cookies = new WeakMap();
class AoCAPI_Client_Cookies {
    // 
    constructor(sessoin) {
        _AoCAPI_Client_Cookies_session.set(this, void 0);
        __classPrivateFieldSet(this, _AoCAPI_Client_Cookies_session, sessoin, "f");
    }
    // 
    get session() { return __classPrivateFieldGet(this, _AoCAPI_Client_Cookies_session, "f"); }
}
_AoCAPI_Client_Cookies_session = new WeakMap();
