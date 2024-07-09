/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Porter_Base_Back_Defaults {

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {Porter_Base_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Web_Back_Defaults} MOD_WEB
     * @param {Porter_Base_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Web_Back_Defaults$: MOD_WEB,
            Porter_Base_Shared_Defaults$: SHARED,
        }
    ) {
        this.MOD_WEB = MOD_WEB;
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
