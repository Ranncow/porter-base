/**
 * The transient model to operate with SSE stream.
 */
// MODULE'S VARS
const NS = 'Porter_Base_Back_Trans_App_ServerEvent_Stream';

// MODULE'S CLASSES
/**
 * The transient model to write messages to the SSE stream.
 * @memberOf Porter_Base_Back_Trans_App_ServerEvent_Stream
 */
class Model {
    static namespace = NS;
    /**
     * The HTTP server response corresponded to the SSE stream.
     * @type {module:http.ServerResponse|module:http2.Http2ServerResponse}
     */
    #httpRes;
    /**
     * The counter for the messages been sent to the front.
     * @type {number}
     */
    #messageId = 0;

    /**
     * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} httpRes
     */
    constructor(httpRes) {
        this.#httpRes = httpRes;
    }

    /**
     * @return {module:http.ServerResponse|module:http2.Http2ServerResponse}
     */
    getResponse() {
        return this.#httpRes;
    }

    /**
     * Serialize given `payload` as JSON text and send it to the front.
     * @param payload
     * @return {boolean}
     */
    write(payload) {
        const stream = this.#httpRes;
        if (stream.writable) {
            const json = JSON.stringify(payload);
            stream.write(`id: ${this.#messageId++}\n`);
            stream.write(`data: ${json}\n\n`);
            return true;
        } else {
            return false;
        }
    };
}

/**
 * The factory to create transient objects.
 */
export default class Porter_Base_Back_Trans_App_ServerEvent_Stream {
    constructor() {
        // INSTANCE METHODS
        /**
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} httpRes
         * @return {Porter_Base_Back_Trans_App_ServerEvent_Stream.Model}
         */
        this.create = function ({httpRes}) {
            return new Model(httpRes);
        };
    }
}
