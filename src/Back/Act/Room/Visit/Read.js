/**
 * Read the check-in permit data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Porter_Base_Back_Act_Room_Visit_Read {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Porter_Base_Back_Store_RDb_Schema_Room_Visit} rdbVisit
     * @param {Porter_Base_Back_Store_RDb_Schema_Room} rdbRoom
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Porter_Base_Back_Store_RDb_Schema_Room_Visit$: rdbVisit,
            Porter_Base_Back_Store_RDb_Schema_Room$: rdbRoom,
        }
    ) {
        // VARS

        // MAIN
        /**
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Porter_Base_Back_Store_RDb_Schema_Room_Visit.Dto} dbVisit
         * @property {Porter_Base_Back_Store_RDb_Schema_Room.Dto} dbRoom
         * @memberof Porter_Base_Back_Act_Room_Visit_Read
         */

        /**
         * The action itself.
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @param {number} [id]
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx, id}) {
            /** @type {Porter_Base_Back_Store_RDb_Schema_Room_Visit.Dto} */
            let dbVisit;
            /** @type {Porter_Base_Back_Store_RDb_Schema_Room.Dto} */
            let dbRoom;
            /** @type {Porter_Base_Back_Store_RDb_Schema_Room_Visit.Dto} */
            dbVisit = await crud.readOne(trx, rdbVisit, id);
            if (dbVisit)
                dbRoom = await crud.readOne(trx, rdbRoom, dbVisit.room_ref);
            return {dbVisit, dbRoom};
        };
    }

}