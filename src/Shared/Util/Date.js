/**
 * This is a set of pure functions to manipulate with dates and times.
 * (the class-based version of the `TeqFw_Core_Shared_Util_Date`)
 */
export default class Porter_Base_Shared_Util_Date {

    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {

        /**
         * Add days to given date or to now.
         * @param {number} days
         * @param {Date} [date]
         * @return {Date}
         */
        this.addDays = function (days, date) {
            const res = (date instanceof Date) ? new Date(date) : new Date();
            res.setDate(res.getDate() + Math.abs(days));
            return res;
        };

        /**
         * Add minutes to given date or to now.
         * @param {number} minutes
         * @param {Date} [date]
         * @return {Date}
         */
        this.addMinutes = function (minutes, date) {
            const res = (date instanceof Date) ? new Date(date) : new Date();
            res.setMinutes(res.getMinutes() + Math.abs(minutes));
            return res;
        };


        /**
         * Add months to given date or to now.
         * @param {number} months
         * @param {Date} [date]
         * @return {Date}
         */
        this.addMonths = function (months, date) {
            const res = (date instanceof Date) ? new Date(date) : new Date();
            res.setMonth(res.getMonth() + Math.abs(months));
            return res;
        };

        /**
         * Get first date of the month (UTC). Time is 00:00:00.
         * @param {Date|string|number} [date]
         * @return {Date}
         */
        this.monthDayFirst = function (date) {
            const d = cast.date(date ?? new Date());
            const res = new Date(0);
            res.setUTCFullYear(d.getUTCFullYear());
            res.setUTCMonth(d.getUTCMonth());
            res.setUTCDate(1);
            return res;
        };

        /**
         * Get the last date of the month (UTC). Time is 00:00:00.
         * @param {Date|string|number} [date]
         * @return {Date}
         */
        this.monthDayLast = function (date) {
            const d = cast.date(date ?? new Date());
            const res = new Date(0);
            res.setUTCFullYear(d.getUTCFullYear());
            res.setUTCMonth(d.getUTCMonth() + 1);
            res.setUTCDate(0);
            return res;
        };

        /**
         * Get first date of the next month (UTC). Time is 00:00:00.
         * @param {Date|string|number} [date]
         * @return {Date}
         */
        this.nextMonthDayFirst = function (date) {
            const res = this.monthDayFirst(date);
            res.setUTCMonth(res.getUTCMonth() + 1);
            return res;
        };

        /**
         * Subtract days from given date or from now.
         * @param {number} days
         * @param {Date} [date]
         * @return {Date}
         */
        this.subtractDays = function (days, date) {
            const res = (date instanceof Date) ? new Date(date) : new Date();
            res.setDate(res.getDate() - Math.abs(days));
            return res;
        };

        /**
         * Subtract minutes from given date or from now.
         * @param {number} minutes
         * @param {Date} [date]
         * @return {Date}
         */
        this.subtractMinutes = function (minutes, date) {
            const res = (date instanceof Date) ? new Date(date) : new Date();
            res.setMinutes(res.getMinutes() - Math.abs(minutes));
            return res;
        };

    }
}
