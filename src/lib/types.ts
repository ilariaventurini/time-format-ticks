export type Formatter = (t: number, i: number) => string

// TODO: add date[]
export type Tick = number
export type FormattedTick = string

export interface Options {
  showDayName?: boolean
  formats?: Formats
  localeObject?: Locale
}
export interface Formats {
  '15seconds'?: TickFormats
  minute?: TickFormats
  '30minutes'?: TickFormats
  hourly?: TickFormats
  daily?: TickFormats
  weekly?: TickFormats
  monthly?: TickFormats
  quarterly?: TickFormats
  yearly?: TickFormats
}
export interface TickFormats {
  primary?: string
  secondary?: string
}

export type TimeInterval = string
