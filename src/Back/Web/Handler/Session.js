/**
 * The web server handler to add authentication information to Web API requests.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const {
    HTTP2_METHOD_GET,
    HTTP2_METHOD_POST,
} = H2;


// MODULE'S CLASSES
// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class Porter_Base_Back_Web_Handler_Session {
    /**
     * @param {Porter_Base_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Back_Util_Cookie} cookie
     * @param {Porter_Base_Back_Mod_Auth_Session} modSession
     */
    constructor(
        {
            Porter_Base_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Back_Util_Cookie: cookie,
            Porter_Base_Back_Mod_Auth_Session$: modSession,
        }
    ) {

        // FUNCS
        const {
            /** @type {function({request, cookie}):string|null} */
            get: cookieGet,
        } = cookie;

        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf Porter_Base_Back_Web_Handler_Session
         */
        async function process(req, res) {
            // FUNCS

            // MAIN
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                // read session cookie from the HTTP request
                let cookieId = cookieGet({request: req, cookie: DEF.COOKIE_SESSION_NAME});
                if (cookieId) {
                    // put the session data & ID into the HTTP request object
                    req[DEF.REQ_HTTP_SESSION_ID] = cookieId;
                    req[DEF.REQ_HTTP_SESSION_DATA] = await modSession.getSessionData({cookieId});
                }
            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () { };

        this.canProcess = function ({method, address} = {}) {
            // we need HTTP sessions only for the Web API space
            return (
                ((method === HTTP2_METHOD_GET) || (method === HTTP2_METHOD_POST))
                && (address?.space === DEF.MOD_WEB_API.SHARED.SPACE_SERVICE)
            );
        };
    }
}
