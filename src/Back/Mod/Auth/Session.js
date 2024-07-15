/**
 * The backend model to handle a sessions on the back.
 */
export default class Porter_Base_Back_Mod_Auth_Session {
    /**
     * @param {Porter_Base_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Back_Util_Cookie} utilCookie
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Porter_Base_Back_Store_RDb_Schema_Auth_Session} rdbSession
     * @param {Porter_Base_Back_Act_Auth_Session_Create} actCreate
     */
    constructor(
        {
            Porter_Base_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$: logger,
            TeqFw_Web_Back_Util_Cookie: utilCookie,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Porter_Base_Back_Store_RDb_Schema_Auth_Session$: rdbSession,
            Porter_Base_Back_Act_Auth_Session_Create$: actCreate,
        }
    ) {
        // INSTANCE VARS
        const A_SESS = rdbSession.getAttributes();

        /**
         * Internal cache to map session data by session ID.
         * @type {Object<string, *>}
         */
        const _cache = {};

        // INSTANCE FUNCS
        const {
            /** @type {function({name, path}):string} */
            clear: cookieClear,
            /** @type {function({name, value, path, expires, domain, secure, httpOnly, sameSite}):string} */
            create: cookieCreate,
            /** @type {function({request, cookie}):string|null} */
            get: cookieGet,
            /** @type {function({response, cookie}):void} */
            set: cookieSet,
        } = utilCookie;

        function plantSession(sessionId, httpReq, httpRes) {
            const path = '/';
            const cookie = cookieCreate({
                expires: DEF.COOKIE_SESSION_LIFETIME,
                name: DEF.COOKIE_SESSION_NAME,
                path,
                secure: false,
                value: sessionId,
            });
            cookieSet({response: httpRes, cookie});
        }


        // INSTANCE METHODS
        /**
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} httpReq
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} httpRes
         * @param {number} [frontId]
         * @param {string} [frontUuid]
         * @return {Promise<{dbSession: Porter_Base_Back_Store_RDb_Schema_Auth_Session.Dto}>}
         */
        this.establish = async function ({trx, httpReq, httpRes, frontId, frontUuid}) {
            // create a session record in RDB
            const {dbSession} = await actCreate.act({trx, frontId, frontUuid});
            if (dbSession?.id) {
                // plant the session cookie into the HTTP response
                plantSession(dbSession.cookie_id, httpReq, httpRes);
                // save the session data into the in-memory cache
                _cache[dbSession.cookie_id] = dbSession;
                logger.info(`The new session is established for front #${dbSession.front_ref}.`);
            }
            return {dbSession};
        };

        /**
         * Get session data.
         * @param {string} cookieId
         * @return {Promise<Porter_Base_Back_Store_RDb_Schema_Auth_Session.Dto>}
         */
        this.getSessionData = async function ({cookieId}) {
            if (cookieId && _cache[cookieId]) return _cache[cookieId];
            else {
                const trx = await conn.startTransaction();
                try {
                    const key = {[A_SESS.COOKIE_ID]: cookieId};
                    const found = await crud.readOne(trx, rdbSession, key);
                    await trx.commit();
                    if (found) _cache[cookieId] = found;
                    return found;
                } catch (error) {
                    logger.error(error);
                    await trx.rollback();
                }
            }
        };
    }
}
