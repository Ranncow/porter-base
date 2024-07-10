/**
 *  Metadata for RDB entity: the registered visit.
 *  @namespace Porter_Base_Back_Store_RDb_Schema_Room_Visit
 */
// MODULE'S VARS
const NS = 'Porter_Base_Back_Store_RDb_Schema_Room_Visit';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/room/visit';

/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Room_Visit
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    EMAIL: 'email',
    ID: 'id',
    NAME: 'name',
    PROFILE_REF: 'profile_ref',
    ROOM_REF: 'room_ref',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Room_Visit
 */
class Dto {
    static namespace = NS;
    /**
     * Date-time when record was created.
     * @type {Date}
     */
    date_created;
    /**
     * The email of the visitor to get a messages related to his activity.
     * @type {string}
     */
    email;
    /**
     * @type {number}
     */
    id;
    /**
     * The name of the visitor.
     * @type {string}
     */
    name;
    /**
     * The related user profile.
     * @type {string}
     */
    profile_ref;
    /**
     * The related room.
     * @type {number}
     */
    room_ref;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Porter_Base_Back_Store_RDb_Schema_Room_Visit {
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
         * @param {Porter_Base_Back_Store_RDb_Schema_Room_Visit.Dto} [data]
         * @return {Porter_Base_Back_Store_RDb_Schema_Room_Visit.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_created = cast.date(data?.date_created);
            res.email = cast.string(data?.email);
            res.id = cast.int(data?.id);
            res.name = cast.string(data?.name);
            res.profile_ref = cast.int(data?.profile_ref);
            res.room_ref = cast.int(data?.room_ref);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Porter_Base_Back_Store_RDb_Schema_Room_Visit.ATTR}
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

