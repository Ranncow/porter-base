/**
 * The frontend storage for the frontend application identity.
 * Don't use the store directly, use it from `Porter_Base_Front_Mod_Auth_Front`.
 */
export default class Porter_Base_Front_Store_Local_Auth_Front {
    /**
     * @param {Porter_Base_Front_Defaults} DEF
     * @param {Porter_Base_Front_Dto_Auth_Front} dtoFront
     */
    constructor(
        {
            Porter_Base_Front_Defaults$: DEF,
            Porter_Base_Front_Dto_Auth_Front$: dtoFront,
        }
    ) {
        // VARS
        const KEY = `${DEF.SHARED.NAME}/auth/front`;

        // INSTANCE METHODS

        this.clear = function () {
            self.window.localStorage.removeItem(KEY);
        };

        /**
         * Get current configuration from the local storage.
         * @return {Porter_Base_Front_Dto_Auth_Front.Dto}
         */
        this.get = function () {
            const stored = self.window.localStorage.getItem(KEY);
            const obj = JSON.parse(stored);
            return dtoFront.createDto(obj);
        };

        /**
         * Get the key for the `localStorage`.
         * @return {string}
         */
        this.key = () => KEY;

        /**
         * Save current configuration into the local storage.
         * @param {Porter_Base_Front_Dto_Auth_Front.Dto} data
         */
        this.set = function (data) {
            self.window.localStorage.setItem(KEY, JSON.stringify(data));
        };

    }
}
