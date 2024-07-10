/**
 *  Metadata for RDB entity: the permit for a visitor to register a visit.
 *  @namespace Porter_Base_Back_Store_RDb_Schema_Room_Permit
 */
// MODULE'S VARS
const NS = 'Porter_Base_Back_Store_RDb_Schema_Room_Permit';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/room/permit';

/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Room_Permit
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    DATE_IN: 'date_in',
    DATE_OUT: 'date_out',
    EMAIL: 'email',
    ID: 'id',
    NAME: 'name',
    PIN: 'pin',
    ROOM_REF: 'room_ref',
    UUID: 'uuid',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Room_Permit
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
     * The email of the visitor to get a link to register a visit.
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
     * The random set of a digits for manual registration.
     * @type {number}
     */
    pin;
    /**
     * The related room.
     * @type {number}
     */
    room_ref;
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
export default class Porter_Base_Back_Store_RDb_Schema_Room_Permit {
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
         * @param {Porter_Base_Back_Store_RDb_Schema_Room_Permit.Dto} [data]
         * @return {Porter_Base_Back_Store_RDb_Schema_Room_Permit.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_created = cast.date(data?.date_created);
            res.date_in = cast.date(data?.date_in);
            res.date_out = cast.date(data?.date_out);
            res.email = cast.string(data?.email);
            res.id = cast.int(data?.id);
            res.name = cast.string(data?.name);
            res.pin = cast.int(data?.pin);
            res.room_ref = cast.int(data?.room_ref);
            res.uuid = cast.string(data?.uuid);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Porter_Base_Back_Store_RDb_Schema_Room_Permit.ATTR}
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

