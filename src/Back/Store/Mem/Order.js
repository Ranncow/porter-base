/**
 * The simple in-memory storage for customer orders.
 */
export default class Porter_Base_Back_Store_Mem_Order {
    /**
     * @param {Porter_Base_Back_Defaults} DEF
     */
    constructor(
        {
            Porter_Base_Back_Defaults$: DEF,
        }
    ) {
        // VARS
        /**
         * @type {Object<string, Porter_Base_Shared_Dto_Order.Dto>}
         * @private
         */
        const _store = {};

        // FUNCS

        // INSTANCE METHODS

        /**
         * Add new order to the storage.
         *
         * @param {Porter_Base_Shared_Dto_Order.Dto} order
         */
        this.add = function ({order}) {
            if (order.uuid) {
                _store[order.uuid] = order;
            }
        };

        /**
         * @return {Porter_Base_Shared_Dto_Order.Dto[]}
         */
        this.list = function () {
            return Object.values(_store);
        };

    }
}
