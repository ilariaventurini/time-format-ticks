import { Tick, TimeInterval } from './types'
import { TIME_INTERVALS } from './constants'

// Given an array of ticks, returns the interval name between
// 15seconds, minute, 30minutes, hourly, daily, weekly, monthly, quarterly, yearly
export function computeTimeIntervalName(ticks: Tick[]): TimeInterval {
  // special case: if the dataset has only one datum, we show the tick in the most detailed way possible
  if (ticks.length === 1) {
    return TIME_INTERVALS[0][0] // '15seconds'
  }
  const differences = consecutiveDifferences(ticks)
  const minDifference = Math.min(...differences)
  return closestTimeIntervalName(minDifference)
}

// Find the differences between consecutive numbers in an array
function consecutiveDifferences(elements: Tick[]): number[] {
  return elements.slice(1).map((elem, i) => elem - elements[i])
}

// Given a number, return the closest TIME_INTERVAL name
function closestTimeIntervalName(minDifferenceMs: number): TimeInterval {
  const index = TIME_INTERVALS.reduce((acc, [timeIntName, timeIntMs], i) => {
    const previousSpan = Math.abs(acc - minDifferenceMs)
    const currentSpan = Math.abs(timeIntMs - minDifferenceMs)
    return previousSpan < currentSpan ? acc : i
  }, 0)
  return TIME_INTERVALS[index][0]
}