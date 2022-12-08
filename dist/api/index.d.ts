/// <reference types="node" />
import http from "http";
declare type HTTP_METHOD_TYPE = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH";
declare type API_REQUEST_RESULT_TYPE = {
    code: number | null;
    status: string | null;
    headers: http.IncomingHttpHeaders | null;
    content: any;
};
declare type LOGIN_PLATFORM_TYPE = "github" | "google" | "twitter" | "reddit";
export default class AoCAPI {
    constructor();
    static sendRequest(options: {
        method: HTTP_METHOD_TYPE;
        endpoint: string;
        body?: any;
        argmap?: {
            [key: string]: string;
        };
    }): Promise<API_REQUEST_RESULT_TYPE>;
    static login(options: {
        platform: LOGIN_PLATFORM_TYPE;
    }): Promise<null | undefined>;
}
export {};
