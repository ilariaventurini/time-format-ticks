import frLocaleObject from 'date-fns/locale/fr/index'
import { computeTimeIntervalName } from '../src/lib/computeTimeInterval'
import { FormattedTick, Tick, TimeInterval, Options } from '../src/lib/types'
import { formatTick } from '../src/lib/formatTick'
import { defaultOptions } from '../src/lib/constants'

type Dataset = Array<[Date, FormattedTick]>

const format = (ticks: Tick[], timeInterval: TimeInterval, options: Required<Options>): FormattedTick[] => {
  return ticks.map((tick, i) => formatTick(tick, i, timeInterval, options))
}

function getTimestampsAndFormattedTicks(dataset: Dataset): { timestamps: Tick[], formattedTicks: FormattedTick[] } {
  const timestamps = dataset.map(d => d[0].getTime())
  const formattedTicks = dataset.map(d => d[1])
  return { timestamps, formattedTicks }
}

it('should format ticks with time interval 15seconds', () => {
  const dataset: Dataset = [
    [new Date(2020, 11, 10, 23, 59, 15), 'Dec 10, 11:59:15 PM'],
    [new Date(2020, 11, 10, 23, 59, 30), '11:59:30 PM'],
    [new Date(2020, 11, 10, 23, 59, 45), '11:59:45 PM'],
    [new Date(2020, 11, 11, 0, 0, 0), 'Dec 11, 12:00:00 AM'],
    [new Date(2020, 11, 11, 0, 0, 15), '12:00:15 AM'],
    [new Date(2020, 11, 11, 0, 0, 30), '12:00:30 AM'],
    [new Date(2020, 11, 11, 0, 0, 45), '12:00:45 AM'],
  ]

  const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset)
  const timeInterval = computeTimeIntervalName(timestamps)
  expect(timeInterval).toEqual('15seconds')
  expect(format(timestamps, timeInterval, defaultOptions)).toEqual(formattedTicks)
})

it('should format ticks with time interval minute', () => {
  const dataset: Dataset = [
    [new Date(2020, 4, 21, 23, 47, 0), 'May 21, 11:47 PM'],
    [new Date(2020, 4, 21, 23, 58, 0), '11:58 PM'],
    [new Date(2020, 4, 21, 23, 59, 0), '11:59 PM'],
    [new Date(2020, 4, 22, 0, 0, 0), 'May 22, 12:00 AM'],
    [new Date(2020, 4, 22, 0, 1, 0), '12:01 AM'],
    [new Date(2020, 4, 22, 0, 2, 0), '12:02 AM'],
    [new Date(2020, 4, 22, 0, 3, 0), '12:03 AM'],
    [new Date(2020, 4, 22, 11, 58, 0), '11:58 AM'],
    [new Date(2020, 4, 22, 11, 59, 0), '11:59 AM'],
    [new Date(2020, 4, 22, 12, 0, 0), '12:00 PM'],
    [new Date(2020, 4, 22, 12, 1, 0, 0), '12:01 PM'],
    [new Date(2020, 4, 22, 12, 2, 0), '12:02 PM'],
  ]
  const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset)
  const timeInterval = computeTimeIntervalName(timestamps)
  expect(timeInterval).toEqual('minute')
  expect(format(timestamps, timeInterval, defaultOptions)).toEqual(formattedTicks)
})

it('should format ticks with time interval 30minutes', () => {
  const dataset: Dataset = [
    [new Date(2020, 11, 10, 22, 30), 'Dec 10, 10:30 PM'],
    [new Date(2020, 11, 10, 23, 0), '11:00 PM'],
    [new Date(2020, 11, 10, 23, 30), '11:30 PM'],
    [new Date(2020, 11, 11, 0, 0), 'Dec 11, 12:00 AM'],
    [new Date(2020, 11, 11, 0, 30), '12:30 AM'],
    [new Date(2020, 11, 11, 1, 0), '1:00 AM'],
    [new Date(2020, 11, 11, 1, 30), '1:30 AM'],
  ]
  const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset)
  const timeInterval = computeTimeIntervalName(timestamps)
  expect(timeInterval).toEqual('30minutes')
  expect(format(timestamps, timeInterval, defaultOptions)).toEqual(formattedTicks)
})

it('should format ticks with time interval hourly', () => {
  // hourly with default formats
  const datasetDefaultFormats: Dataset = [
    [new Date(2020, 11, 10, 22, 0), 'Dec 10, 10 PM'],
    [new Date(2020, 11, 10, 23, 0), '11 PM'],
    [new Date(2020, 11, 11, 0, 0), 'Dec 11, 12 AM'],
    [new Date(2020, 11, 11, 1, 0), '01 AM'],
    [new Date(2020, 11, 11, 2, 0), '02 AM'],
    [new Date(2020, 11, 11, 3, 0), '03 AM'],
    [new Date(2020, 11, 11, 4, 0), '04 AM'],
    [new Date(2020, 11, 11, 11, 0), '11 AM'],
    [new Date(2020, 11, 11, 12, 0), '12 PM'],
    [new Date(2020, 11, 11, 13, 0), '01 PM'],
    [new Date(2020, 11, 11, 14, 0), '02 PM'],
    [new Date(2020, 11, 11, 15, 0), '03 PM'],
  ]
  const { timestamps: timestampsDefaultFormats, formattedTicks: formattedTicksDefaultFormats } =
    getTimestampsAndFormattedTicks(datasetDefaultFormats)
  const timeIntervalDefaultFormats = computeTimeIntervalName(timestampsDefaultFormats)
  expect(timeIntervalDefaultFormats).toEqual('hourly')
  expect(format(timestampsDefaultFormats, timeIntervalDefaultFormats, defaultOptions)).toEqual(formattedTicksDefaultFormats)

  // hourly with custom formats
  const datasetCustomFormats: Dataset = [
    [new Date(2020, 11, 10, 22, 0), 'Dec 10, 22:00'],
    [new Date(2020, 11, 10, 23, 0), '23:00'],
    [new Date(2020, 11, 11, 0, 0), 'Dec 11, 00:00'],
    [new Date(2020, 11, 11, 1, 0), '01:00'],
    [new Date(2020, 11, 11, 2, 0), '02:00'],
    [new Date(2020, 11, 11, 3, 0), '03:00'],
    [new Date(2020, 11, 11, 4, 0), '04:00'],
    [new Date(2020, 11, 11, 11, 0), '11:00'],
    [new Date(2020, 11, 11, 12, 0), '12:00'],
    [new Date(2020, 11, 11, 13, 0), '13:00'],
    [new Date(2020, 11, 11, 14, 0), '14:00'],
    [new Date(2020, 11, 11, 15, 0), '15:00'],
  ]
  const { timestamps: timestampsCustomFormats, formattedTicks: formattedTicksCustomFormats } =
    getTimestampsAndFormattedTicks(datasetCustomFormats)
  const timeIntervalCustomFormats = computeTimeIntervalName(timestampsCustomFormats)
  expect(timeIntervalCustomFormats).toEqual('hourly')
  const timeScaleCustomOptions = {
    ...defaultOptions,
    formats: {
      'hourly': { primary: 'MMM d, HH:mm', secondary: 'HH:mm' },
    }
  }
  expect(format(timestampsCustomFormats, timeIntervalCustomFormats, timeScaleCustomOptions)).toEqual(formattedTicksCustomFormats)
})

it('should format ticks with time interval daily', () => {
  const dataset: Dataset = [
    [new Date(2019, 11, 30), 'Dec 30'],
    [new Date(2019, 11, 31), '31'],
    [new Date(2020, 0, 1), 'Jan 1'],
    [new Date(2020, 0, 2), '2'],
    [new Date(2020, 0, 3), '3'],
    [new Date(2020, 0, 4), '4'],
    [new Date(2020, 0, 5), '5'],
    [new Date(2020, 0, 30), '30'],
    [new Date(2020, 0, 31), '31'],
    [new Date(2020, 1, 1), 'Feb 1'],
    [new Date(2020, 1, 2), '2'],
    [new Date(2020, 1, 3), '3'],
  ]
  const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset)
  const timeInterval = computeTimeIntervalName(timestamps)
  expect(timeInterval).toEqual('daily')
  expect(format(timestamps, timeInterval, defaultOptions)).toEqual(formattedTicks)
})

it('should format ticks with time interval weekly', () => {
  const dataset: Dataset = [
    [new Date(2020, 0, 27), 'Mon, Jan 27'],
    [new Date(2020, 0, 28), 'Tue'],
    [new Date(2020, 0, 29), 'Wed'],
    [new Date(2020, 0, 30), 'Thu'],
    [new Date(2020, 0, 31), 'Fri'],
    [new Date(2020, 1, 1), 'Sat'],
    [new Date(2020, 1, 2), 'Sun'],
    [new Date(2020, 1, 3), 'Mon, Feb 3'],
    [new Date(2020, 1, 4), 'Tue'],
    [new Date(2020, 1, 5), 'Wed'],
    [new Date(2020, 1, 6), 'Thu'],
    [new Date(2020, 1, 7), 'Fri'],
  ]
  const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset)
  const timeInterval = computeTimeIntervalName(timestamps)
  expect(timeInterval).toEqual('daily')
  const timeScaleCustomOptions = { ...defaultOptions, showDayName: true }
  expect(format(timestamps, timeInterval, timeScaleCustomOptions)).toEqual(formattedTicks)
})

it('should format ticks with time interval monthly', () => {
  // monthly with default formats
  const datasetdefaultFormats: Dataset = [
    [new Date(2018, 9), 'Oct 2018'],
    [new Date(2018, 10), 'Nov'],
    [new Date(2018, 11), 'Dec'],
    [new Date(2019, 0), 'Jan 2019'],
    [new Date(2019, 1), 'Feb'],
    [new Date(2019, 2), 'Mar'],
    [new Date(2019, 3), 'Apr'],
    [new Date(2019, 10), 'Nov'],
    [new Date(2019, 11), 'Dec'],
    [new Date(2020, 0), 'Jan 2020'],
    [new Date(2020, 1), 'Feb'],
    [new Date(2020, 2), 'Mar'],
  ]
  const { timestamps: timestampsdefaultFormats, formattedTicks: formattedTicksdefaultFormats } =
    getTimestampsAndFormattedTicks(datasetdefaultFormats)
  const timeIntervaldefaultFormats = computeTimeIntervalName(timestampsdefaultFormats)
  expect(timeIntervaldefaultFormats).toEqual('monthly')
  expect(format(timestampsdefaultFormats, timeIntervaldefaultFormats, defaultOptions)).toEqual(formattedTicksdefaultFormats)

  // monthly with custom formats
  const datasetCustomFormats: Dataset = [
    [new Date(2018, 9), 'oct. 2018'],
    [new Date(2018, 10), 'nov.'],
    [new Date(2018, 11), 'déc.'],
    [new Date(2019, 0), 'janv. 2019'],
    [new Date(2019, 1), 'févr.'],
    [new Date(2019, 2), 'mars'],
    [new Date(2019, 3), 'avr.'],
    [new Date(2019, 10), 'nov.'],
    [new Date(2019, 11), 'déc.'],
    [new Date(2020, 0), 'janv. 2020'],
    [new Date(2020, 1), 'févr.'],
    [new Date(2020, 2), 'mars'],
  ]
  const { timestamps: timestampsCustomFormats, formattedTicks: formattedTicksCustomFormats } =
    getTimestampsAndFormattedTicks(datasetCustomFormats)
  const timeIntervalCustomFormats = computeTimeIntervalName(timestampsCustomFormats)
  expect(timeIntervalCustomFormats).toEqual('monthly')
  const timeScaleCustomOptions = { ...defaultOptions, localeObject: frLocaleObject }
  expect(format(timestampsCustomFormats, timeIntervalCustomFormats, timeScaleCustomOptions)).toEqual(formattedTicksCustomFormats)
})

it('should format ticks with time interval quarterly', () => {
  const dataset: Dataset = [
    [new Date(2017, 0), `Q1 '17`],
    [new Date(2017, 3), `Q2`],
    [new Date(2017, 6), `Q3`],
    [new Date(2017, 9), `Q4`],
    [new Date(2018, 1), `Q1 '18`],
    [new Date(2018, 4), `Q2`],
    [new Date(2018, 7), `Q3`],
    [new Date(2019, 0), `Q1 '19`],
    [new Date(2019, 5), `Q2`],
    [new Date(2019, 7), `Q3`],
    [new Date(2019, 10), `Q4`],
    [new Date(2020, 0), `Q1 '20`],
  ]
  const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset)
  const timeInterval = computeTimeIntervalName(timestamps)
  expect(timeInterval).toEqual('quarterly')
  expect(format(timestamps, timeInterval, defaultOptions)).toEqual(formattedTicks)
})

it('should format ticks with time interval yearly', () => {
  const dataset: Dataset = [
    [new Date(1977, 0), '1977'],
    [new Date(1978, 0), '1978'],
    [new Date(1979, 0), '1979'],
    [new Date(1980, 0), '1980'],
    [new Date(1981, 0), '1981'],
    [new Date(1982, 0), '1982'],
    [new Date(1983, 0), '1983'],
    [new Date(2015, 0), '2015'],
    [new Date(2016, 0), '2016'],
    [new Date(2017, 0), '2017'],
    [new Date(2018, 0), '2018'],
    [new Date(2019, 0), '2019']
  ]
  const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset)
  const timeInterval = computeTimeIntervalName(timestamps)
  expect(timeInterval).toEqual('yearly')
  expect(format(timestamps, timeInterval, defaultOptions)).toEqual(formattedTicks)
})

it('should throw an error since that time interval is not valid', () => {
  const dataset = [
    new Date(2020, 11, 10, 23, 59, 15),
    new Date(2020, 11, 10, 23, 59, 30),
    new Date(2020, 11, 10, 23, 59, 45),
    new Date(2020, 11, 11, 0, 0, 0),
    new Date(2020, 11, 11, 0, 0, 15),
    new Date(2020, 11, 11, 0, 0, 30),
    new Date(2020, 11, 11, 0, 0, 45)
  ]
  const timestamps = dataset.map(d => d.getTime())
  expect(() => format(timestamps, 'ciao', defaultOptions)).toThrow()
})
