/**
 * The app-dependent service to request refreshing of the data from RDB.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Porter_Base_Back_Web_Api_App_Refresh {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Porter_Base_Shared_Web_Api_App_Refresh} endpoint
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Porter_Base_Shared_Web_Api_App_Refresh$: endpoint,
        }
    ) {

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Porter_Base_Shared_Web_Api_App_Refresh.Request} req
         * @param {Porter_Base_Shared_Web_Api_App_Refresh.Response} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const rs = endpoint.createRes();
            try {
                const dto = req.entity;
                rs.entity = dto;
                rs.success = true;
                Object.assign(res, rs);
            } catch (error) {
                logger.exception(error);
            }
        };
    }

}
