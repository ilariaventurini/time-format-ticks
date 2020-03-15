import { TIME_INTERVALS } from './constants';
// Given an array of ticks, returns the interval name between
// 15seconds, minute, 30minutes, hourly, daily, weekly, monthly, quarterly, yearly
export function computeTimeIntervalName(ticks) {
    // special case: if the dataset has only one datum, we show the tick in the most detailed way possible
    if (ticks.length === 1) {
        return TIME_INTERVALS[0][0]; // '15seconds'
    }
    var differences = consecutiveDifferences(ticks);
    var minDifference = Math.min.apply(Math, differences);
    return closestTimeIntervalName(minDifference);
}
// Find the differences between consecutive numbers in an array
function consecutiveDifferences(elements) {
    return elements.slice(1).map(function (elem, i) { return elem - elements[i]; });
}
// Given a number, return the closest TIME_INTERVAL name
function closestTimeIntervalName(minDifferenceMs) {
    var index = TIME_INTERVALS.reduce(function (acc, _a, i) {
        var timeIntName = _a[0], timeIntMs = _a[1];
        var previousSpan = Math.abs(acc - minDifferenceMs);
        var currentSpan = Math.abs(timeIntMs - minDifferenceMs);
        return previousSpan < currentSpan ? acc : i;
    }, 0);
    return TIME_INTERVALS[index][0];
}
//# sourceMappingURL=computeTimeInterval.js.map