/**
 * Read the front data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Porter_Base_Back_Act_Auth_Front_Read {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Porter_Base_Back_Store_RDb_Schema_Auth_Front} rdbFront
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Porter_Base_Back_Store_RDb_Schema_Auth_Front$: rdbFront,
        }
    ) {
        // VARS 
        const A_FRONT = rdbFront.getAttributes();

        // MAIN
        /**
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Porter_Base_Back_Store_RDb_Schema_Auth_Front.Dto} dbFront
         * @memberof Porter_Base_Back_Act_Auth_Front_Read
         */

        /**
         * The action itself.
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @param {number} [id]
         * @param {string} [uuid]
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx, id, uuid}) {
            /** @type {Porter_Base_Back_Store_RDb_Schema_Auth_Front.Dto} */
            let dbFront;
            const key = (id) ? id : {[A_FRONT.UUID]: uuid};
            /** @type {Porter_Base_Back_Store_RDb_Schema_Auth_Front.Dto} */
            dbFront = await crud.readOne(trx, rdbFront, key);
            return {dbFront};
        };
    }

}