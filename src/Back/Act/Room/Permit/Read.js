/**
 * Read the check-in permit data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Porter_Base_Back_Act_Room_Permit_Read {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Porter_Base_Back_Store_RDb_Schema_Room_Permit} rdbPermit
     * @param {Porter_Base_Back_Store_RDb_Schema_Room} rdbRoom
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Porter_Base_Back_Store_RDb_Schema_Room_Permit$: rdbPermit,
            Porter_Base_Back_Store_RDb_Schema_Room$: rdbRoom,
        }
    ) {
        // VARS 
        const A_PERMIT = rdbPermit.getAttributes();

        // MAIN
        /**
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Porter_Base_Back_Store_RDb_Schema_Room_Permit.Dto} dbPermit
         * @property {Porter_Base_Back_Store_RDb_Schema_Room.Dto} dbRoom
         * @memberof Porter_Base_Back_Act_Room_Permit_Read
         */

        /**
         * The action itself.
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @param {number} [id]
         * @param {string} [uuid]
         * @param {number} [pin]
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx, id, uuid, pin}) {
            /** @type {Porter_Base_Back_Store_RDb_Schema_Room_Permit.Dto} */
            let dbPermit;
            /** @type {Porter_Base_Back_Store_RDb_Schema_Room.Dto} */
            let dbRoom;
            const key = (id) ? id
                : (uuid) ? {[A_PERMIT.UUID]: uuid}
                    : {[A_PERMIT.PIN]: pin};
            /** @type {Porter_Base_Back_Store_RDb_Schema_Room_Permit.Dto} */
            dbPermit = await crud.readOne(trx, rdbPermit, key);
            if (dbPermit)
                dbRoom = await crud.readOne(trx, rdbRoom, dbPermit.room_ref);
            return {dbPermit, dbRoom};
        };
    }

}