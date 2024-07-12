/**
 *  Metadata for RDB entity: the registry for sessions (authenticated fronts).
 *  @namespace Porter_Base_Back_Store_RDb_Schema_Auth_Session
 */
// MODULE'S VARS
const NS = 'Porter_Base_Back_Store_RDb_Schema_Auth_Session';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/auth/session';

/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Auth_Session
 * @type {Object}
 */
const ATTR = {
    API_KEY: 'api_key',
    COOKIE_ID: 'cookie_id',
    DATE_CREATED: 'date_created',
    FRONT_REF: 'front_ref',
    ID: 'id',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Auth_Session
 */
class Dto {
    static namespace = NS;
    /**
     * The session identifier stored in the local storage on the front.
     * @type {string}
     */
    api_key;
    /**
     * The session identifier stored in the cookie on the front.
     * @type {string}
     */
    cookie_id;
    /**
     * Date-time when record was created.
     * @type {Date}
     */
    date_created;
    /**
     * The related user front.
     * @type {number}
     */
    front_ref;
    /**
     * @type {number}
     */
    id;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Porter_Base_Back_Store_RDb_Schema_Auth_Session {
    /**
     * @param {Porter_Base_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            Porter_Base_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Porter_Base_Back_Store_RDb_Schema_Auth_Session.Dto} [data]
         * @return {Porter_Base_Back_Store_RDb_Schema_Auth_Session.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.api_key = cast.string(data?.api_key);
            res.cookie_id = cast.string(data?.cookie_id);
            res.date_created = cast.date(data?.date_created);
            res.front_ref = cast.int(data?.front_ref);
            res.id = cast.int(data?.id);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Porter_Base_Back_Store_RDb_Schema_Auth_Session.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }
}

