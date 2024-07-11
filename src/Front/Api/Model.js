/**
 * The interface for the frontend models that operate with some backend entity (CRUDL scheme).
 *
 * This is documentation only code (not executable).
 *
 * @interface
 */
export default class Porter_Base_Front_Api_Model {
    /**
     * Create a new entity DTO and clone 'data' into the new object.
     * @param {*} [data]
     * @return {*}
     */
    composeEntity(data) {}

    /**
     * Create a new list item DTO and clone 'data' into the new object.
     * @param {*} [data]
     * @return {*}
     */
    composeItem(data) {}
}
