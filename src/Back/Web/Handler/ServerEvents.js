/**
 * Web server handler to establish new SSE connection with front.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const {
    HTTP2_HEADER_CACHE_CONTROL,
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP2_METHOD_GET,
    HTTP_STATUS_OK,
} = H2;

// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class Porter_Base_Back_Web_Handler_ServerEvents {
    /**
     * @param {Porter_Base_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Porter_Base_Back_Store_Mem_ServerEvent_Stream} storeStream
     * @param {Porter_Base_Back_Trans_App_ServerEvent_Stream} transStream
     */
    constructor(
        {
            Porter_Base_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Porter_Base_Back_Store_Mem_ServerEvent_Stream$: storeStream,
            Porter_Base_Back_Trans_App_ServerEvent_Stream$: transStream,
        }
    ) {

        // FUNCS

        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest}req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf Porter_Base_Back_Web_Handler_ServerEvents
         */
        async function process(req, res) {
            // FUNCS
            /**
             * Write headers to SSE stream to start streaming.
             * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} httpRes
             */
            function startStreaming(httpRes) {
                httpRes.writeHead(HTTP_STATUS_OK, {
                    [HTTP2_HEADER_CONTENT_TYPE]: 'text/event-stream',
                    [HTTP2_HEADER_CACHE_CONTROL]: 'no-cache',
                });
                httpRes.addListener('error', (e) => {
                    logger.error(e.toString());
                });
            }

            // MAIN
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                // send HTTP headers to start streaming and set onError listener
                startStreaming(res);
                // register new stream in the memory storage
                const mod = transStream.create({httpRes: res});
                storeStream.add(mod);
            }
        }

        Object.defineProperty(process, 'namespace', {value: this.constructor.name});

        // INSTANCE METHODS

        // noinspection JSUnusedGlobalSymbols
        this.getProcessor = () => process;

        this.init = async function () {
            const space = DEF.SHARED.SPACE_SSE;
            logger.info(`Initialize handler for SSE streams (space: '${space}').`);
        };

        // noinspection JSUnusedGlobalSymbols
        this.canProcess = function ({method, address} = {}) {
            return (
                (method === HTTP2_METHOD_GET)
                && (address?.space === DEF.SHARED.SPACE_SSE)
            );
        };

    }
}
