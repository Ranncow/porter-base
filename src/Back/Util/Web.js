/**
 * The set of utilities related to the web requests.
 */
// IMPORTS
import * as http from 'node:http';
import * as https from 'node:https';

// CLASSES
export default class Porter_Base_Back_Util_Web {
    /**
     * @param {Porter_Base_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            Porter_Base_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$: logger,
        }
    ) {
        // INSTANCE METHODS
        /**
         * Perform a POST request
         *
         * @param {string} url - The URL to which the request is sent
         * @param {object} data - The data to be sent in the request body
         * @param {object} [headers={}] - Optional headers to be included in the request
         * @returns {Promise<object>} - The response data
         */
        this.postRequest = async function (url, data, headers = {}) {
            return new Promise((resolve, reject) => {
                const urlObj = new URL(url);
                const isHttps = urlObj.protocol === 'https:';

                const options = {
                    hostname: urlObj.hostname,
                    port: urlObj.port || (isHttps) ? 443 : 80,
                    path: urlObj.pathname + urlObj.search,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers,
                        'Content-Length': Buffer.byteLength(JSON.stringify(data))
                    }
                };


                const request = (isHttps) ? https.request : http.request;

                /** @type {module:http.ClientRequest} */
                const req = request(options, (res) => {
                    let responseBody = '';

                    res.on('data', (chunk) => {
                        responseBody += chunk;
                    });

                    res.on('end', () => {
                        try {
                            const parsedData = JSON.parse(responseBody);
                            resolve(parsedData);
                        } catch (error) {
                            reject(error);
                        }
                    });
                });

                req.on('error', (error) => {
                    reject(error);
                });

                req.write(JSON.stringify(data));
                req.end();
            });
        };

    }
}