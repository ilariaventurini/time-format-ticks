import { computeTimeIntervalName } from './computeTimeInterval'
import { Tick, Options, Formatter } from './types'
import { formatTick } from './formatTick'
import { defaultOptions } from './constants'
import { merge } from 'lodash'

export function getFormatter(ticks: Tick[], options?: Options): Formatter {
  if (ticks.length === 0) {
    throw new Error(`Ticks length is 0.`)
  }
  // merge the default option values with the ones inserted by user
  const defaultedOptions = merge(defaultOptions, options)
  const timeInterval = computeTimeIntervalName(ticks)
  const formatter = (t: number, i: number) => formatTick(t, i, timeInterval, defaultedOptions)
  return formatter
}