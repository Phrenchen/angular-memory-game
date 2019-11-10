/**
 * provides static methods for formatting time / date 
 * - pure functions only
 */
export class TimeHelper {

    /**
     * ISO 8601 Extended format
     *   - YYYY-MM-DDTHH:mm:ss:sssZ
     * 
     * YYYY: 4-digit year
        MM: 2-digit month (where January is 01 and December is 12)
        DD: 2-digit date (0 to 31)
        -: Date delimiters
        T: Indicates the start of time
        HH: 24-digit hour (0 to 23)
        mm: Minutes (0 to 59)
        ss: Seconds (0 to 59)
        sss: Milliseconds (0 to 999)
     * 
     * @param durationMilliSeconds 
     * @returns string time format: mm:ss:SS
     */
    public static printMatchDuration(durationMilliSeconds: number): string {
        const date = new Date(durationMilliSeconds);

        // add leading zeros
        const minuteStr = TimeHelper.addLeadingZero(date.getMinutes());
        const secondStr = TimeHelper.addLeadingZero(date.getSeconds());
        let millisecondStr = TimeHelper.addLeadingZero(date.getMilliseconds());



        let dateStr = minuteStr + ' : ' + secondStr + ' : ' + millisecondStr;
        // console.log('the date: ', date);
        // console.log('duration string: ', dateStr);
        return dateStr;
    }

    private static addLeadingZero(value: number): string {
        let result = value.toString();
        if(value < 10) {
            result = '0' + result;
        }
        return result;
    }
}
