/**
 * The action to create a session record in the RDB.
 */
import assert from 'assert';
import {config as cfgTest, container} from '@teqfw/test';
import {describe, it} from 'mocha';

// SETUP ENV

/** @type {TeqFw_Core_Back_Config} */
const config = await container.get('TeqFw_Core_Back_Config$');
config.init(cfgTest.pathToRoot, 'test');
const cfgDb = config.getLocal('@teqfw/db');

/**
 * Framework wide RDB connection from DI. This connection is used by event listeners.
 * @type {TeqFw_Db_Back_RDb_Connect}
 */
const connFw = await container.get('TeqFw_Db_Back_RDb_IConnect$');
/** @type {TeqFw_Core_Back_Mod_App_Uuid} */
const modBackUuid = await container.get('TeqFw_Core_Back_Mod_App_Uuid$');
await modBackUuid.init();

// GET OBJECT FROM CONTAINER AND RUN TESTS
/** @type {Porter_Base_Back_Act_Auth_Session_Create} */
const action = await container.get('Porter_Base_Back_Act_Auth_Session_Create$');

describe('Porter_Base_Back_Act_Auth_Session_Create', function () {
    it('can be instantiated', async () => {
        assert(typeof action === 'object');
    });

    describe('can be executed', function () {

        it('as a simple action', async () => {
            await connFw.init(cfgDb);
            const trx = await connFw.startTransaction();
            try {
                const frontId = undefined;
                const frontUuid = 'dd83c3e9-26b6-4513-b04f-36d2737c4ca4';
                const {dbSession} = await action.act({trx, frontId, frontUuid});
                assert(dbSession.cookie_id);
            } finally {
                await trx.rollback();
                await connFw.disconnect();
            }
        });

        it('for existing session', async () => {
            await connFw.init(cfgDb);
            const trx = await connFw.startTransaction();
            try {
                const frontId = 1;
                const {dbSession: first} = await action.act({trx, frontId});
                assert(first.cookie_id);
                const {dbSession: second} = await action.act({trx, frontId});
                assert(second.cookie_id);
                assert(second.cookie_id !== first.cookie_id);
            } finally {
                await trx.rollback();
                await connFw.disconnect();
            }
        });

    });

});

