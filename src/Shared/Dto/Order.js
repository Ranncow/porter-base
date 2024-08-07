/**
 * The structure for a shared data about an order.
 */
// MODULE'S VARS
const NS = 'Porter_Base_Shared_Dto_Order';

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Shared_Dto_Order
 */
class Dto {
    static namespace = NS;
    /** @type {Date} */
    dateCreated;
    /**
     * The uncategorized type of the order.
     * @type {string}
     */
    type;
    /**
     * The UUID of the order.
     * @type {string}
     */
    uuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Porter_Base_Shared_Dto_Order {
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
         * @param {Porter_Base_Shared_Dto_Order.Dto} [data]
         * @return {Porter_Base_Shared_Dto_Order.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.dateCreated = cast.date(data?.dateCreated);
            res.type = cast.string(data?.type);
            res.uuid = cast.string(data?.uuid);
            return res;
        };

    }

}
