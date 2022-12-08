import http, { METHODS } from "http";
import https from "https";

import open from "open";

import { APILocale } from "./locale";

// 

type HTTP_METHOD_TYPE = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH";

type API_REQUEST_RESULT_TYPE = {
    code: number | null,
    status: string | null
    headers: http.IncomingHttpHeaders | null
    content: any
};

type LOGIN_PLATFORM_TYPE = "github" | "google" | "twitter" | "reddit";

export default class AoCAPI {

    constructor() {
        
    }

    // 

    static sendRequest(options: { method: HTTP_METHOD_TYPE, endpoint: string, body?: any, argmap?: {[key: string]: string} }): Promise<API_REQUEST_RESULT_TYPE> {
        return new Promise((resolve, reject) => {
            options = options || {};

            // 
    
            let result: API_REQUEST_RESULT_TYPE;
    
            // 
    
            let endpoint_url = new URL(APILocale.ENDPOINTS.parse(options.endpoint, options.argmap || {}));
    
            let request = https.request(endpoint_url, {
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
                }

                if(options.method != "HEAD") {
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

    static async login(options: { platform: LOGIN_PLATFORM_TYPE }) {
        let aoc_login_response = await this.sendRequest({
            method: "HEAD",
            endpoint: APILocale.ENDPOINTS.AUTH,
            argmap: { platform: options.platform }
        });

        if(!aoc_login_response.headers || aoc_login_response.code != 302)
            return null;

        console.log(aoc_login_response.headers["location"]);

        // 

        let platform_login_response = await this.sendRequest({
            method: "GET",
            endpoint: aoc_login_response.headers["location"] || ""
        });

        if(!platform_login_response.headers || platform_login_response.code != 302)
            return null;

        console.log(platform_login_response.headers["location"]);

        // 

        let callback_platform_login_response = await this.sendRequest({
            method: "HEAD",
            endpoint: platform_login_response.headers["location"] || ""
        });

        if(!callback_platform_login_response.headers)
            return null;

        if(callback_platform_login_response.code == 200) {
            // open(platform_login_response.headers["location"])
            console.log(callback_platform_login_response);
        }

        // 
    }

}

class AoCAPI_Client {

    #cookies: AoCAPI_Client_Cookies;

    // 

    constructor(cookies: AoCAPI_Client_Cookies) {
        this.#cookies = cookies;
    }

    // 

    get cookies() { return this.#cookies; }

}

class AoCAPI_Client_Cookies {

    #session: string;

    // 

    constructor(sessoin: string) {
        this.#session = sessoin;
    }

    // 

    get session() { return this.#session; }

}