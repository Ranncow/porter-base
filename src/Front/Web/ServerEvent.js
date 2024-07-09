/**
 * The connector to SSE channel.
 */
export default class Porter_Base_Front_Web_ServerEvent {
    /**
     * @param {Porter_Base_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Porter_Base_Shared_Dto_App_ServerEvent_Message} dtoMessage
     */
    constructor(
        {
            Porter_Base_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Porter_Base_Shared_Dto_App_ServerEvent_Message$: dtoMessage,
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
                try {
                    const json = JSON.parse(event.data);
                    const msg = dtoMessage.createDto(json);
                    const type = msg.type;
                    if (_handlers[type]) {
                        _handlers[type](msg.payload);
                    } else {
                        logger.error(`Cannot find a handler for SSE '${type}'.`);
                    }
                } catch (e) {
                    logger.exception(e);
                }
            }

            /**
             * @param {Event} event
             */
            function onOpen(event) {
                logger.info(`The SSE connection for back-to-front events is opened.`);
            }

            // MAIN
            _source = new EventSource(URL);
            logger.info(`Open new SSE connection for back-to-front events.`);
            _source.addEventListener('open', onOpen);
            _source.addEventListener('error', onError);
            _source.addEventListener('message', onMessage);
        };

        this.setHandlers = function (handlers) {
            const types = Object.keys(handlers);
            for (const type of types) {
                _handlers[type] = handlers[type];
            }
        };

    }
}