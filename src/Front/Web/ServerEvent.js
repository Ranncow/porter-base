/**
 * The connector to SSE channel.
 */
export default class Porter_Base_Front_Web_ServerEvent {
    /**
     * @param {Porter_Base_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            Porter_Base_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
        }
    ) {

        // VARS
        const URL = composeUrl();
        /** @type {EventSource} */
        let _source;
        let _handlers = {}; // {TYPE:fnHandler}

        // FUNCS
        function composeUrl() {
            const space = DEF.SHARED.SPACE_SSE;
            return `./${space}`;
        }

        // INSTANCE METHODS

        this.open = async function () {
            // FUNCS

            /**
             * @param {Event} event
             */
            function onError(event) {
                logger.error(`The SSE stream error occurred: ${event}`);
            }

            /**
             * @param {MessageEvent} event
             */
            function onMessage(event) {
                // debugger
            }

            /**
             * @param {Event} event
             */
            function onOpen(event) {
                // debugger
            }

            // MAIN
            _source = new EventSource(URL);
            logger.info(`Open new SSE connection for back-to-front events.`);
            _source.addEventListener('open', onOpen);
            _source.addEventListener('error', onError);
            _source.addEventListener('message', onMessage);
        };

    }
}