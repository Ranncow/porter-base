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
     * @type {function(Porter_Base_Shared_Dto_App_ServerEvent_Message.Dto=): Porter_Base_Shared_Dto_App_ServerEvent_Message.Dto}
     */
    #messageFactory;
    /**
     * The counter for the messages been sent to the front.
     * @type {number}
     */
    #messageId = 0;

    /**
     * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} httpRes
     * @param {function(Porter_Base_Shared_Dto_App_ServerEvent_Message.Dto=): Porter_Base_Shared_Dto_App_ServerEvent_Message.Dto} messageFactory
     */
    constructor(httpRes, messageFactory) {
        this.#httpRes = httpRes;
        this.#messageFactory = messageFactory;
    }

    /**
     * @return {module:http.ServerResponse|module:http2.Http2ServerResponse}
     */
    getResponse() {
        return this.#httpRes;
    }

    /**
     * Serialize given `payload` as JSON text and send it to the front.
     * @param {Object} payload
     * @param {string} type
     * @return {boolean}
     */
    write(payload, type) {
        const stream = this.#httpRes;
        if (stream.writable) {
            const msg = this.#messageFactory();
            msg.type = type;
            msg.payload = payload;
            const text = JSON.stringify(msg);
            stream.write(`id: ${this.#messageId++}\n`);
            stream.write(`data: ${text}\n\n`);
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
    /**
     * @param {Porter_Base_Shared_Dto_App_ServerEvent_Message} dtoMessage
     */
    constructor(
        {
            Porter_Base_Shared_Dto_App_ServerEvent_Message$: dtoMessage,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} httpRes
         * @return {Porter_Base_Back_Trans_App_ServerEvent_Stream.Model}
         */
        this.create = function ({httpRes}) {
            return new Model(httpRes, dtoMessage.createDto);
        };
    }
}
