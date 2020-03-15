import { computeTimeIntervalName } from './computeTimeInterval';
import { formatTick } from './formatTick';
import { defaultOptions } from './constants';
import { merge } from 'lodash';
export function getFormatter(ticks, options) {
    if (ticks.length === 0) {
        throw new Error("Ticks length is 0.");
    }
    // merge the default option values with the ones inserted by user
    var defaultedOptions = merge(defaultOptions, options);
    var timeInterval = computeTimeIntervalName(ticks);
    var formatter = function (t, i) { return formatTick(t, i, timeInterval, defaultedOptions); };
    return formatter;
}
//# sourceMappingURL=getFormatter.js.map