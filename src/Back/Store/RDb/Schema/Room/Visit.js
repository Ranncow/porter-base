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
    DATE_IN: 'date_in',
    DATE_OUT: 'date_out',
    EMAIL: 'email',
    FRONT_REF: 'front_ref',
    ID: 'id',
    NAME: 'name',
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
     * Date-time when the visitor should check into the room.
     * @type {Date}
     */
    date_in;
    /**
     * Date-time when the visitor should check out the room.
     * @type {Date}
     */
    date_out;
    /**
     * The email of the visitor to get a messages related to his activity.
     * @type {string}
     */
    email;
    /**
     * The related user front.
     * @type {number}
     */
    front_ref;
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
            res.date_in = cast.date(data?.date_in);
            res.date_out = cast.date(data?.date_out);
            res.email = cast.string(data?.email);
            res.front_ref = cast.int(data?.front_ref);
            res.id = cast.int(data?.id);
            res.name = cast.string(data?.name);
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

