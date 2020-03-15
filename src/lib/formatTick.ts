import { Options, Tick, FormattedTick, TimeInterval, TickFormats, LocaleCode } from './types'
import { get } from 'lodash'
import { format } from 'date-fns'
import * as locales from 'date-fns/locale'

const codes = Object.values(locales).map(locale => locale['code']) as LocaleCode[]

// Return the formatted current tick
export function formatTick(tick: Tick, tickIndex: number, interval: TimeInterval, options: Required<Options>): FormattedTick {
  const { showDayName, localeCode, formats } = options
  // this is necessary because weekly is not a really time interval, is only a way to show day
  const intervalConsideringAlsoShowDayNameOption = interval === 'daily' && showDayName ? 'weekly' : interval
  const tickFormats: Required<TickFormats> = get(formats, intervalConsideringAlsoShowDayNameOption)
  const formatString = isTickPrimary(tick, tickIndex, interval, showDayName) ? tickFormats.primary : tickFormats.secondary
  const locale = getLocale(localeCode)
  return format(new Date(tick), formatString, { locale })
}

// Return true if the tick is a primary tick, false otherwise
export function isTickPrimary(tick: Tick, tickIndex: number, interval: TimeInterval, showDayName: boolean): boolean {
  const isFirstTick = tickIndex === 0
  const hasANewWeekStarted = Number(format((new Date(tick)), 'c')) === 2
  const isFirstQuarter = Number(format((new Date(tick)), 'q')) === 1

  switch (interval) {
    case '15seconds': return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick))
    case 'minute': return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick))
    case '30minutes': return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick))
    case 'hourly': return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick))
    case 'daily':
      if (!showDayName) { // daily
        return (isFirstTick || isMonthChanged(tick) || isYearChanged(tick))
      } else { // weekly
        return (isFirstTick || hasANewWeekStarted || isYearChanged(tick))
      }
    case 'monthly': return (isFirstTick || isYearChanged(tick))
    case 'quarterly': return (isFirstTick || isFirstQuarter)
    case 'yearly': return false
    default: throw new Error(`${interval} is not a valid time interval.`)
  }
}

// The accepted formats of localeCode are ll and ll-CC (where l stands for language, C stands for Country)
function getLocale(localeCode: LocaleCode): Locale {
  // locales is an object whose keys format is ll or llCC
  // each locale is an object whose code value format is ll or ll-CC
  const localeCodeWithoutDash = localeCode.replace(/-/g, '')
  const foundLocale: Locale = get(locales, localeCodeWithoutDash)
  if (!foundLocale) {
    throw new Error(`Locale with code '${localeCode}' not found. Avaible codes are: ${codes}.`)
  }
  return foundLocale
}

// Return true if the day of the month (D = 1-31) is changed, false otherwise
function isDayOfMonthChanged(timestamp: Tick): boolean {
  const { s, m, H } = timestampToFormatTime(timestamp)
  return H === 0 && m === 0 && s === 0
}

// Return true if the month (M = 1-12) is changed, false otherwise
function isMonthChanged(timestamp: Tick): boolean {
  const { d, s, m, H } = timestampToFormatTime(timestamp)
  return d === 1 && H === 0 && m === 0 && s === 0
}

// Return true if the year (YYYY) is changed, false otherwise
function isYearChanged(timestamp: Tick): boolean {
  const { M, d, s, m, H } = timestampToFormatTime(timestamp)
  return M === 1 && d === 1 && H === 0 && m === 0 && s === 0
}

// Given a timestamp, return an object of useful time formats
// Use Unicode date field symbol (https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
export function timestampToFormatTime(timestamp: Tick) {
  const date = new Date(timestamp)
  return {
    M: date.getMonth() + 1, // month: 1-12
    d: date.getDate(), // day of the month: 1-31
    H: date.getHours(), // 24-hour clock: 0-23
    m: date.getMinutes(), // minute: 0-59
    s: date.getSeconds(), // seconds: 0-59
  }
}