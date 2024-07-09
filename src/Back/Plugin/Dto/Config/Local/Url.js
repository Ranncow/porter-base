/**
 * The URLs configuration DTO.
 */
// MODULE'S VARS
const NS = 'Porter_Base_Back_Plugin_Dto_Config_Local_Url';

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Back_Plugin_Dto_Config_Local_Url
 */
class Dto {
    static namespace = NS;
    /**
     * The base URL for the customer app.
     * @type {string}
     */
    cust;
    /**
     * The base URL for the desk app.
     * @type {string}
     */
    desk;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Porter_Base_Back_Plugin_Dto_Config_Local_Url {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Porter_Base_Back_Plugin_Dto_Config_Local_Url.Dto} data
         * @return {Porter_Base_Back_Plugin_Dto_Config_Local_Url.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.cust = cast.string(data?.cust);
            res.desk = cast.string(data?.desk);
            return res;
        };
    }
}