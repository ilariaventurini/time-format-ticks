import { Options, Tick, FormattedTick, TimeInterval } from './types';
export declare function formatTick(tick: Tick, tickIndex: number, interval: TimeInterval, options: Required<Options>): FormattedTick;
export declare function isTickPrimary(tick: Tick, tickIndex: number, interval: TimeInterval, showDayName: boolean): boolean;
export declare function timestampToFormatTime(timestamp: Tick): {
    M: number;
    d: number;
    H: number;
    m: number;
    s: number;
};
