import { select } from 'd3-selection'
import { createExample } from './createExample'

const root = select('#app')

const options = undefined

createExample(root, '15seconds', [
  new Date(2020, 11, 10, 23, 59, 15),
  new Date(2020, 11, 10, 23, 59, 30),
  new Date(2020, 11, 10, 23, 59, 45),
  new Date(2020, 11, 11, 0, 0, 0),
  new Date(2020, 11, 11, 0, 0, 15),
  new Date(2020, 11, 11, 0, 0, 30),
  new Date(2020, 11, 11, 0, 0, 45),
])

createExample(root, 'minute', [
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
])

createExample(root, '30minutes', [
  new Date(2020, 11, 10, 22, 30),
  new Date(2020, 11, 10, 23, 0),
  new Date(2020, 11, 10, 23, 30),
  new Date(2020, 11, 11, 0, 0),
  new Date(2020, 11, 11, 0, 30),
  new Date(2020, 11, 11, 1, 0),
  new Date(2020, 11, 11, 1, 30),
])

createExample(root, 'hourly-with-default-formats', [
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
])

createExample(root, 'hourly-with-custom-formats', [
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
], {
  formats: {
    'hourly': { primary: 'MMM d, HH:mm', secondary: 'HH:mm' },
  }
})

createExample(root, 'daily', [
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
])

createExample(root, 'weekly', [
  new Date(2020, 0, 27),
  new Date(2020, 0, 28),
  new Date(2020, 0, 29),
  new Date(2020, 0, 30),
  new Date(2020, 0, 31),
  new Date(2020, 1, 1),
  new Date(2020, 1, 2),
  new Date(2020, 1, 3),
  new Date(2020, 1, 4),
  new Date(2020, 1, 5),
  new Date(2020, 1, 6),
  new Date(2020, 1, 7),
], { showDayName: true })

createExample(root, 'monthly-with-default-formats', [
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
])

createExample(root, 'monthly-with-custom-formats', [
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
], { localeCode: 'fr' })

createExample(root, 'quarterly', [
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
])

createExample(root, 'yearly', [
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
])
