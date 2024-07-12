/**
 * The structure for frontend data about a front (the identity of a profile in a browser).
 */
// MODULE'S VARS
const NS = 'Porter_Base_Front_Dto_Auth_Front';

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Front_Dto_Auth_Front
 */
class Dto {
    static namespace = NS;
    /** @type {Date} */
    dateCreated;
    /**
     * The UUID of the order.
     * @type {string}
     */
    uuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Porter_Base_Front_Dto_Auth_Front {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Porter_Base_Front_Dto_Auth_Front.Dto} [data]
         * @return {Porter_Base_Front_Dto_Auth_Front.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.dateCreated = cast.date(data?.dateCreated);
            res.uuid = cast.string(data?.uuid);
            return res;
        };

    }

}
