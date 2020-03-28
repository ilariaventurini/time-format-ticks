import { computeTimeIntervalName } from '../src/lib/computeTimeInterval'

it('should compute time interval for 15seconds', () => {
  const ticks = [
    new Date(2020, 11, 10, 23, 59, 15),
    new Date(2020, 11, 10, 23, 59, 30),
    new Date(2020, 11, 10, 23, 59, 45),
    new Date(2020, 11, 11, 0, 0, 0),
    new Date(2020, 11, 11, 0, 0, 15),
    new Date(2020, 11, 11, 0, 0, 30),
    new Date(2020, 11, 11, 0, 0, 45),
  ].map(t => t.getTime())

  const timeInterval = computeTimeIntervalName(ticks)
  expect(timeInterval).toEqual('15seconds')
})

it('should compute time interval for minute', () => {
  const ticks = [
    new Date(2020, 4, 21, 23, 47, 0),
    new Date(2020, 4, 21, 23, 58, 0),
    new Date(2020, 4, 21, 23, 59, 0),
    new Date(2020, 4, 22, 0, 0, 0),
    new Date(2020, 4, 22, 0, 1, 0),
    new Date(2020, 4, 22, 0, 2, 0),
    new Date(2020, 4, 22, 0, 3, 0),
    new Date(2020, 4, 22, 11, 58, 0),
    new Date(2020, 4, 22, 11, 59, 0),
    new Date(2020, 4, 22, 12, 0, 0),
    new Date(2020, 4, 22, 12, 1, 0, 0),
    new Date(2020, 4, 22, 12, 2, 0),
  ].map(t => t.getTime())

  const timeInterval = computeTimeIntervalName(ticks)
  expect(timeInterval).toEqual('minute')
})

it('should compute time interval for 30minutes', () => {
  const ticks = [
    new Date(2020, 11, 10, 22, 30),
    new Date(2020, 11, 10, 23, 0),
    new Date(2020, 11, 10, 23, 30),
    new Date(2020, 11, 11, 0, 0),
    new Date(2020, 11, 11, 0, 30),
    new Date(2020, 11, 11, 1, 0),
    new Date(2020, 11, 11, 1, 30),
  ].map(t => t.getTime())

  const timeInterval = computeTimeIntervalName(ticks)
  expect(timeInterval).toEqual('30minutes')
})

it('should compute time interval for hourly', () => {
  const ticks = [
    new Date(2020, 11, 10, 22, 0),
    new Date(2020, 11, 10, 23, 0),
    new Date(2020, 11, 11, 0, 0),
    new Date(2020, 11, 11, 1, 0),
    new Date(2020, 11, 11, 2, 0),
    new Date(2020, 11, 11, 3, 0),
    new Date(2020, 11, 11, 4, 0),
    new Date(2020, 11, 11, 11, 0),
    new Date(2020, 11, 11, 12, 0),
    new Date(2020, 11, 11, 13, 0),
    new Date(2020, 11, 11, 14, 0),
    new Date(2020, 11, 11, 15, 0),
  ].map(t => t.getTime())

  const timeInterval = computeTimeIntervalName(ticks)
  expect(timeInterval).toEqual('hourly')
})

it('should compute time interval for daily', () => {
  const ticks = [
    new Date(2019, 11, 30),
    new Date(2019, 11, 31),
    new Date(2020, 0, 1),
    new Date(2020, 0, 2),
    new Date(2020, 0, 3),
    new Date(2020, 0, 4),
    new Date(2020, 0, 5),
    new Date(2020, 0, 30),
    new Date(2020, 0, 31),
    new Date(2020, 1, 1),
    new Date(2020, 1, 2),
    new Date(2020, 1, 3),
  ].map(t => t.getTime())

  const timeInterval = computeTimeIntervalName(ticks)
  expect(timeInterval).toEqual('daily')
})

it('should compute time interval for monthly', () => {
  const ticks = [
    new Date(2018, 9),
    new Date(2018, 10),
    new Date(2018, 11),
    new Date(2019, 0),
    new Date(2019, 1),
    new Date(2019, 2),
    new Date(2019, 3),
    new Date(2019, 10),
    new Date(2019, 11),
    new Date(2020, 0),
    new Date(2020, 1),
    new Date(2020, 2),
  ].map(t => t.getTime())

  const timeInterval = computeTimeIntervalName(ticks)
  expect(timeInterval).toEqual('monthly')
})

it('should compute time interval for quarterly', () => {
  const ticks = [
    new Date(2017, 0),
    new Date(2017, 3),
    new Date(2017, 6),
    new Date(2017, 9),
    new Date(2018, 1),
    new Date(2018, 4),
    new Date(2018, 7),
    new Date(2019, 0),
    new Date(2019, 5),
    new Date(2019, 7),
    new Date(2019, 10),
    new Date(2020, 0),
  ].map(t => t.getTime())

  const timeInterval = computeTimeIntervalName(ticks)
  expect(timeInterval).toEqual('quarterly')
})

it('should compute time interval for yearly', () => {
  const ticks = [
    new Date(1977, 0),
    new Date(1978, 0),
    new Date(1979, 0),
    new Date(1980, 0),
    new Date(1981, 0),
    new Date(1982, 0),
    new Date(1983, 0),
    new Date(2015, 0),
    new Date(2016, 0),
    new Date(2017, 0),
    new Date(2018, 0),
    new Date(2019, 0),
  ].map(t => t.getTime())

  const timeInterval = computeTimeIntervalName(ticks)
  expect(timeInterval).toEqual('yearly')
})

it('single tick: should compute time interval for 15seconds', () => {
  const ticks = [new Date(1977, 0)].map(t => t.getTime())

  const timeInterval = computeTimeIntervalName(ticks)
  expect(timeInterval).toEqual('15seconds')
})
