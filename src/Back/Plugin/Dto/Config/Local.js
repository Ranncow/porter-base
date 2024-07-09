/**
 * The local configuration DTO for the plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'Porter_Base_Back_Plugin_Dto_Config_Local';

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Back_Plugin_Dto_Config_Local
 */
class Dto {
    static namespace = NS;
    /**
     * The base URL for the customer app.
     * @type {Porter_Base_Back_Plugin_Dto_Config_Local_Url.Dto}
     */
    url;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Porter_Base_Back_Plugin_Dto_Config_Local {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Porter_Base_Back_Plugin_Dto_Config_Local_Url} dtoUrl
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Porter_Base_Back_Plugin_Dto_Config_Local_Url$: dtoUrl,
        }
    ) {
        /**
         * @param {Porter_Base_Back_Plugin_Dto_Config_Local.Dto} data
         * @return {Porter_Base_Back_Plugin_Dto_Config_Local.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.url = dtoUrl.createDto(data?.url);
            return res;
        };
    }
}