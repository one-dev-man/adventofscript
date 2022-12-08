import path from "path";

// 

export const APILocale = {
    ENDPOINTS: {
        parse(endpoint: string, argmap: {[key: string]: any}) {
            let result = endpoint;

            Object.keys(argmap).forEach(k => {
                result = result.replace(new RegExp(`\{\{${k}\}\}`), argmap[k]);
            });

            return result;
        },

        MAIN: "https://adventofcode.com/",

        get AUTH() { return path.join(APILocale.ENDPOINTS.MAIN, "/auth/{{platform}}"); }
    }
}