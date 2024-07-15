/**
 * The backend model to handle a sessions on the back.
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
/** @type {Porter_Base_Back_Mod_Auth_Session} */
const mod = await container.get('Porter_Base_Back_Mod_Auth_Session$');

describe('Porter_Base_Back_Mod_Auth_Session', function () {
    it('can be instantiated', async () => {
        assert(typeof mod === 'object');
    });

    describe('can', function () {

        it('establish a session', async () => {
            await connFw.init(cfgDb);
            const trx = await connFw.startTransaction();
            try {
                const frontId = 1;
                const httpReq = {
                    url: '/web-api-service/Porter_Cust_Shared_Web_Api_Room_Visit_Create',
                };
                const httpRes = {};
                const {dbSession} = await mod.establish({trx, httpReq, httpRes, frontId});
                assert(dbSession.cookie_id);
            } finally {
                await trx.rollback();
                await connFw.disconnect();
            }
        });

    });

});

