/**
 * In-memory storage to collect connected SSE streams.
 */
export default class Porter_Base_Back_Store_Mem_ServerEvent_Stream {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
        }
    ) {
        // VARS
        /**
         * @type {Porter_Base_Back_Trans_App_ServerEvent_Stream.Model[]}
         * @private
         */
        const _store = [];

        // INSTANCE METHODS
        /**
         * @param {Porter_Base_Back_Trans_App_ServerEvent_Stream.Model} model
         */
        this.add = function (model) {
            model.getResponse().addListener('close', () => {
                this.delete(model);
            });
            _store.push(model);
            model.write({name: 'init'});
            setInterval(() => model.write({name: 'tik'}), 1500);
            logger.info(`One SSE stream is added to the storage.`);
        };

        /**
         * Get all streams.
         * @return {Porter_Base_Back_Trans_App_ServerEvent_Stream.Model[]}
         */
        this.all = function () {
            return _store;
        };

        /**
         * Delete the stream model from the storage.
         * @param {Porter_Base_Back_Trans_App_ServerEvent_Stream.Model} model
         */
        this.delete = function (model) {
            const pos = _store.indexOf(model);
            if (pos !== -1) _store.splice(pos, 1);
        };

    }
}
