export declare type Formatter = ((t: number, i: number) => string);
export declare type Tick = number;
export declare type FormattedTick = string;
export declare type LocaleCode = string;
export interface Options {
    showDayName?: boolean;
    formats?: Formats;
    localeCode?: LocaleCode;
}
export interface Formats {
    '15seconds'?: TickFormats;
    'minute'?: TickFormats;
    '30minutes'?: TickFormats;
    'hourly'?: TickFormats;
    'daily'?: TickFormats;
    'weekly'?: TickFormats;
    'monthly'?: TickFormats;
    'quarterly'?: TickFormats;
    'yearly'?: TickFormats;
}
export interface TickFormats {
    primary?: string;
    secondary?: string;
}
export declare type TimeInterval = string;
