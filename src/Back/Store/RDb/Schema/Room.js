/**
 *  Metadata for RDB entity: the registry for hotel rooms.
 *  @namespace Porter_Base_Back_Store_RDb_Schema_Room
 */
// MODULE'S VARS
const NS = 'Porter_Base_Back_Store_RDb_Schema_Room';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/room';

/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Room
 * @type {Object}
 */
const ATTR = {
    ID: 'id',
    NUMBER: 'number',
    STATE: 'state',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Back_Store_RDb_Schema_Room
 */
class Dto {
    static namespace = NS;
    /**
     * @type {number}
     */
    id;
    /**
     * The room number.
     * @type {number}
     */
    number;
    /**
     * The current state of the room.
     * @type {string}
     * @see Porter_Base_Shared_Enum_Room_State
     */
    state;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Porter_Base_Back_Store_RDb_Schema_Room {
    /**
     * @param {Porter_Base_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {typeof Porter_Base_Shared_Enum_Room_State} STATE
     */
    constructor(
        {
            Porter_Base_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
            Porter_Base_Shared_Enum_Room_State$: STATE,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Porter_Base_Back_Store_RDb_Schema_Room.Dto} [data]
         * @return {Porter_Base_Back_Store_RDb_Schema_Room.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.id = cast.int(data?.id);
            res.number = cast.int(data?.number);
            res.state = cast.enum(data?.state, STATE);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Porter_Base_Back_Store_RDb_Schema_Room.ATTR}
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

