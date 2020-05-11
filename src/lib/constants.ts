import { Options } from './types'
import enUSLocaleObject from 'date-fns/locale/en-US/index'

type name = string
type ms = number
type TimeInterval = Array<[name, ms]>

export const TIME_INTERVALS: TimeInterval = [
  ['15seconds', 15 * 1000],
  ['minute', 60 * 1000],
  ['30minutes', 30 * 60 * 1000],
  ['hourly', 60 * 60 * 1000],
  ['daily', 24 * 60 * 60 * 1000],
  ['monthly', 30 * 24 * 60 * 60 * 1000],
  ['quarterly', 3 * 30 * 24 * 60 * 60 * 1000],
  ['yearly', 12 * 30 * 24 * 60 * 60 * 1000],
]

export const defaultOptions: Required<Options> = {
  showDayName: false,
  localeObject: enUSLocaleObject,
  formats: {
    '15seconds': { primary: 'MMM d, pp', secondary: 'pp' },
    minute: { primary: 'MMM d, p', secondary: 'p' },
    '30minutes': { primary: 'MMM d, p', secondary: 'p' },
    hourly: { primary: 'MMM d, hh a', secondary: 'hh a' },
    daily: { primary: 'MMM d', secondary: 'd' },
    weekly: { primary: 'eee, MMM d', secondary: 'eee' },
    monthly: { primary: 'MMM yyyy', secondary: 'MMM' },
    quarterly: { primary: `QQQ ''yy`, secondary: 'QQQ' },
    yearly: { primary: 'yyyy', secondary: 'yyyy' },
  },
}
