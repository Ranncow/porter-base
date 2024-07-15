/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Porter_Base_Back_Defaults {

    COOKIE_SESSION_NAME = 'PORTER_SESSION';
    COOKIE_SESSION_LIFETIME = 31536000000;  // 365 * 24 * 60 * 60 * 1000
    REQ_HTTP_SESSION_DATA;
    REQ_HTTP_SESSION_ID;

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;
    /** @type {TeqFw_Web_Api_Back_Defaults} */
    MOD_WEB_API;

    /** @type {Porter_Base_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Web_Back_Defaults} MOD_WEB
     * @param {TeqFw_Web_Api_Back_Defaults} MOD_WEB_API
     * @param {Porter_Base_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Web_Back_Defaults$: MOD_WEB,
            TeqFw_Web_Api_Back_Defaults$: MOD_WEB_API,
            Porter_Base_Shared_Defaults$: SHARED,
        }
    ) {
        this.MOD_WEB = MOD_WEB;
        this.MOD_WEB_API = MOD_WEB_API;
        this.SHARED = SHARED;
        this.REQ_HTTP_SESSION_DATA = SHARED.NAME + '/sessionData';
        this.REQ_HTTP_SESSION_ID = SHARED.NAME + '/sessionId';
        Object.freeze(this);
    }
}
