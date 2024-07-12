/**
 * The model to encapsulate functionality related to the fronts (browser profiles).
 */
export default class Porter_Base_Front_Mod_Auth_Front {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Porter_Base_Front_Util_Func} func
     * @param {TeqFw_Web_Api_Front_Web_Connect} api
     * @param {Porter_Base_Front_Store_Local_Auth_Front} storeFront
     * @param {Porter_Base_Front_Dto_Auth_Front} dtoFront
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Porter_Base_Front_Util_Func$: func,
            TeqFw_Web_Api_Front_Web_Connect$: api,
            Porter_Base_Front_Store_Local_Auth_Front$: storeFront,
            Porter_Base_Front_Dto_Auth_Front$: dtoFront,
        }
    ) {
        // VARS 

        // INSTANCE METHODS

        /**
         * Init front data on the frontend. Load the front identity from the localStorage or generate and store new one.
         * @return {Porter_Base_Front_Dto_Auth_Front.Dto}
         */
        this.get = function () {
            // load app identity data (if exists) from the local storage or create new one.
            const res = storeFront.get();
            if (!res.uuid) {
                res.dateCreated = new Date();
                res.uuid = func.randomUUID();
                logger.info(`New front UUID '${res.uuid}' is generated.`);
                storeFront.set(res);
            }
            return res;
        };

        /**
         * @return {string}
         */
        this.getUuid = function () {
            return this.get().uuid;
        };
    }
}
