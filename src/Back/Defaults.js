/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Porter_Base_Back_Defaults {

    /** @type {Porter_Base_Shared_Defaults} */
    SHARED;

    /**
     * @param {Porter_Base_Shared_Defaults} SHARED
     */
    constructor(
        {
            Porter_Base_Shared_Defaults$: SHARED,
        }
    ) {
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
