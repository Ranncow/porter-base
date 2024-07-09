/**
 * The structure of the SSE message.
 */
// MODULE'S VARS
const NS = 'Porter_Base_Shared_Dto_App_ServerEvent_Message';

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Shared_Dto_App_ServerEvent_Message
 */
class Dto {
    static namespace = NS;
    /**
     * The message payload.
     * @type {Object}
     */
    payload;
    /**
     * The uncategorized type of the message.
     * @type {string}
     */
    type;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Porter_Base_Shared_Dto_App_ServerEvent_Message {
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
         * @param {Porter_Base_Shared_Dto_App_ServerEvent_Message.Dto} [data]
         * @return {Porter_Base_Shared_Dto_App_ServerEvent_Message.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.payload = cast.object(data?.payload);
            res.type = cast.string(data?.type);
            return res;
        };

    }

}
