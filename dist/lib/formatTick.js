import { get } from 'lodash';
import { format } from 'date-fns';
import * as locales from 'date-fns/locale';
var codes = Object.values(locales).map(function (locale) { return locale['code']; });
// Return the formatted current tick
export function formatTick(tick, tickIndex, interval, options) {
    var showDayName = options.showDayName, localeCode = options.localeCode, formats = options.formats;
    // this is necessary because weekly is not a really time interval, is only a way to show day
    var intervalConsideringAlsoShowDayNameOption = interval === 'daily' && showDayName ? 'weekly' : interval;
    var tickFormats = get(formats, intervalConsideringAlsoShowDayNameOption);
    var formatString = isTickPrimary(tick, tickIndex, interval, showDayName) ? tickFormats.primary : tickFormats.secondary;
    var locale = getLocale(localeCode);
    return format(new Date(tick), formatString, { locale: locale });
}
// Return true if the tick is a primary tick, false otherwise
export function isTickPrimary(tick, tickIndex, interval, showDayName) {
    var isFirstTick = tickIndex === 0;
    var hasANewWeekStarted = Number(format((new Date(tick)), 'c')) === 2;
    var isFirstQuarter = Number(format((new Date(tick)), 'q')) === 1;
    switch (interval) {
        case '15seconds': return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick));
        case 'minute': return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick));
        case '30minutes': return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick));
        case 'hourly': return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick));
        case 'daily':
            if (!showDayName) { // daily
                return (isFirstTick || isMonthChanged(tick) || isYearChanged(tick));
            }
            else { // weekly
                return (isFirstTick || hasANewWeekStarted || isYearChanged(tick));
            }
        case 'monthly': return (isFirstTick || isYearChanged(tick));
        case 'quarterly': return (isFirstTick || isFirstQuarter);
        case 'yearly': return false;
        default: throw new Error(interval + " is not a valid time interval.");
    }
}
// The accepted formats of localeCode are ll and ll-CC (where l stands for language, C stands for Country)
function getLocale(localeCode) {
    // locales is an object whose keys format is ll or llCC
    // each locale is an object whose code value format is ll or ll-CC
    var localeCodeWithoutDash = localeCode.replace(/-/g, '');
    var foundLocale = get(locales, localeCodeWithoutDash);
    if (!foundLocale) {
        throw new Error("Locale with code '" + localeCode + "' not found. Avaible codes are: " + codes + ".");
    }
    return foundLocale;
}
// Return true if the day of the month (D = 1-31) is changed, false otherwise
function isDayOfMonthChanged(timestamp) {
    var _a = timestampToFormatTime(timestamp), s = _a.s, m = _a.m, H = _a.H;
    return H === 0 && m === 0 && s === 0;
}
// Return true if the month (M = 1-12) is changed, false otherwise
function isMonthChanged(timestamp) {
    var _a = timestampToFormatTime(timestamp), d = _a.d, s = _a.s, m = _a.m, H = _a.H;
    return d === 1 && H === 0 && m === 0 && s === 0;
}
// Return true if the year (YYYY) is changed, false otherwise
function isYearChanged(timestamp) {
    var _a = timestampToFormatTime(timestamp), M = _a.M, d = _a.d, s = _a.s, m = _a.m, H = _a.H;
    return M === 1 && d === 1 && H === 0 && m === 0 && s === 0;
}
// Given a timestamp, return an object of useful time formats
// Use Unicode date field symbol (https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
export function timestampToFormatTime(timestamp) {
    var date = new Date(timestamp);
    return {
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
    };
}
//# sourceMappingURL=formatTick.js.map