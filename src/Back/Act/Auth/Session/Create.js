/**
 * The action to cCreate a session record in the RDB.
 */
// MODULE'S IMPORTS
import {randomBytes} from 'node:crypto';

// MODULE'S VARS
const SIZE_API_KEY = 16;
const SIZE_COOKIE_ID = 16;

// MODULE'S CLASSES
/**
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Porter_Base_Back_Act_Auth_Session_Create {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Porter_Base_Back_Store_RDb_Schema_Auth_Front} rdbFront
     * @param {Porter_Base_Back_Store_RDb_Schema_Auth_Session} rdbSession
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Porter_Base_Back_Store_RDb_Schema_Auth_Front$: rdbFront,
            Porter_Base_Back_Store_RDb_Schema_Auth_Session$: rdbSession,
        }
    ) {
        // VARS 
        const A_FRONT = rdbFront.getAttributes();
        const A_SESS = rdbSession.getAttributes();

        // MAIN
        /**
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Porter_Base_Back_Store_RDb_Schema_Auth_Session.Dto} dbSession
         * @property {Porter_Base_Back_Store_RDb_Schema_Auth_Front.Dto} dbFront
         * @memberof Porter_Base_Back_Act_Auth_Session_Create
         */

        /**
         * The action itself.
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @param {number} [frontId]
         * @param {string} [frontUuid]
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx, frontId, frontUuid}) {
            /** @type {Porter_Base_Back_Store_RDb_Schema_Auth_Front.Dto} */
            let dbFront;
            /** @type {Porter_Base_Back_Store_RDb_Schema_Auth_Session.Dto} */
            let dbSession;
            const key = (frontId) ? frontId : {[A_FRONT.UUID]: frontUuid};
            /** @type {Porter_Base_Back_Store_RDb_Schema_Auth_Front.Dto} */
            dbFront = await crud.readOne(trx, rdbFront, key);
            if (dbFront?.id) {
                // remove existing session for the front
                /** @type {Porter_Base_Back_Store_RDb_Schema_Auth_Session.Dto} */
                const found = await crud.readOne(trx, rdbSession, {[A_SESS.FRONT_REF]: dbFront.id});
                if (found)
                    await crud.deleteOne(trx, rdbSession, found.id);
                // create new session
                dbSession = rdbSession.createDto();
                dbSession.api_key = randomBytes(SIZE_COOKIE_ID).toString('hex');
                dbSession.cookie_id = randomBytes(SIZE_API_KEY).toString('hex');
                dbSession.front_ref = dbFront.id;
                const {[A_SESS.ID]: sessId} = await crud.create(trx, rdbSession, dbSession);
                dbSession = await crud.readOne(trx, rdbSession, sessId);
            }
            return {dbFront, dbSession};
        };
    }

}