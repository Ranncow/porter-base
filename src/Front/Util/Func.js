/**
 * Utility functions.
 */
export default class Porter_Base_Front_Util_Func {
    /**
     * Generate UUID v4 (the crypto is not available w/o SSL/TLS).
     * @returns {string}
     */
    randomUUID() {
        // FUNCS
        /**
         * Made by ChatGPT.
         * @return {`${string}-${string}-${string}-${string}-${string}`|string}
         */
        function generateUUID() {
            let d = new Date().getTime();
            let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16;
                if (d > 0) {
                    r = (d + r) % 16 | 0;
                    d = Math.floor(d / 16);
                } else {
                    r = (d2 + r) % 16 | 0;
                    d2 = Math.floor(d2 / 16);
                }
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }

        // MAIN
        if (self?.crypto?.randomUUID) return self.crypto.randomUUID();
        else return generateUUID();
    }
}