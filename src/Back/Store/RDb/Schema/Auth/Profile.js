/**
 *  Metadata for RDB entity: the registry for user profiles (the data stored in browsers).
 *  @namespace Porter_Base_Back_Store_RDb_Schema_Auth_Profile
 */
// MODULE'S VARS
const NS = 'Porter_Base_Back_Store_RDb_Schema_Auth_Profile';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/auth/profile';

/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Auth_Profile
 * @type {Object}
 */
const ATTR = {
    ID: 'id',
    UUID: 'uuid',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Auth_Profile
 */
class Dto {
    static namespace = NS;
    /**
     * @type {number}
     */
    id;
    /**
     * Universally Unique Identifier.
     * @type {string}
     */
    uuid;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Porter_Base_Back_Store_RDb_Schema_Auth_Profile {
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
         * @param {Porter_Base_Back_Store_RDb_Schema_Auth_Profile.Dto} [data]
         * @return {Porter_Base_Back_Store_RDb_Schema_Auth_Profile.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.id = cast.int(data?.id);
            res.uuid = cast.string(data?.uuid);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Porter_Base_Back_Store_RDb_Schema_Auth_Profile.ATTR}
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

